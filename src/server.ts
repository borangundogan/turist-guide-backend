import express, { Request, Response } from 'express';
import cors from 'cors';
import { Route } from './types';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let routes: Route[] = [];

// Routes
app.get('/api/routes', (_req: Request, res: Response) => {
  console.log('GET /api/routes - Returning routes:', routes.length);
  res.json(routes);
});

app.post('/api/routes', (req: Request, res: Response) => {
  const newRoute: Route = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    visitCount: 0,
    isFavorite: false,
  };
  
  console.log('POST /api/routes - Creating new route:', newRoute.title);
  routes.push(newRoute);
  res.status(201).json(newRoute);
});

app.delete('/api/routes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('DELETE /api/routes/:id - Deleting route:', id);
  routes = routes.filter(route => route.id !== id);
  res.status(204).send();
});

app.patch('/api/routes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const routeIndex = routes.findIndex(route => route.id === id);
  
  if (routeIndex === -1) {
    console.log('PATCH /api/routes/:id - Route not found:', id);
    return res.status(404).json({ error: 'Route not found' });
  }

  routes[routeIndex] = {
    ...routes[routeIndex],
    ...req.body,
  };

  console.log('PATCH /api/routes/:id - Updated route:', routes[routeIndex].title);
  res.json(routes[routeIndex]);
});

// Start server
const server = app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
}); 
export interface RoutePoint {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  duration: string;
  order: number;
}

export interface Route {
  id?: string;
  title: string;
  type: string;
  points: RoutePoint[];
  coverPhoto?: string;
  tags: string[];
  duration?: string;
  distance?: string;
  rating?: number;
  createdAt?: string;
  isFavorite?: boolean;
  visitCount?: number;
  lastVisited?: string;
} 
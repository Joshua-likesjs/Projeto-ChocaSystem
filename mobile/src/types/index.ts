export interface SensorData {
  temperature: string;
  humidity: string;
  luminosity: string;
  presence: string;
  timestamp: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
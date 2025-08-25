export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
import { useContext } from "react";
import AuthContext from "./AuthContextInstance";

/**
 * Custom hook for accessing auth context.
 * Provides current user and loading state.
 * 
 * @returns {{ user: import('firebase/auth').User | null, loading: boolean }}
 * 
 * @example
 * const { user, loading } = useAuth();
 * if (loading) return <Spinner />;
 * if (!user) return <Navigate to="/auth" />;
 */
export function useAuth() {
  return useContext(AuthContext);
}

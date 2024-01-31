import { useState } from "react";
import { useAuth } from "./auth";
import { useEffect } from "react";

export const useUser = (
  options = { required: false, onUnauthenticated: null }
) => {
  const { user: authUser, getCurrentUser, updateCurrentUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const updateUser = (data) => {
    updateCurrentUser(data);
    return authUser;
  };
  useEffect(() => {
    const { isAuthenticated } = getCurrentUser(
      options.required,
      options.onUnauthenticated
    );
    setIsAuthenticated(isAuthenticated);
  }, []);
  return [authUser, isAuthenticated, updateUser];
};

"use client";
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import { appSettings } from "../config/settings";
import { APIClient } from "../config/axios";
import { isAxiosError } from "axios";
import { handleLogin } from "../services/auth";
import { decodeToken } from "@/utils/token";
import {
  getFromStorage,
  insertIntoStorage,
  isSsr,
  removeFromStorage,
} from "@/utils/storage";
import { useSnackbar } from "../hooks/snackBar";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const storedUser = getFromStorage(appSettings.userStorageKey);
    const storedToken = getFromStorage(appSettings.tokenStorageKey);

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      const { exp } = decodeToken(token?.access_token);
      const currentTime = Date.now();
      const remainingTime = exp * 1000 - currentTime;
      const timeToRefresh = 3 * 60 * 1000;

      if (remainingTime > timeToRefresh) {
        const timerId = setTimeout(
          refreshAccessToken,
          remainingTime - timeToRefresh
        );
        return () => clearTimeout(timerId);
      } else {
        refreshAccessToken();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await handleLogin(email, password);
    if (data === null) {
      showSnackbar("Invalid Credentials", "error");
      return;
    }
    setUser(data.user);
    setToken(data.userToken);
    insertIntoStorage(appSettings.userStorageKey, data.user);
    insertIntoStorage(appSettings.tokenStorageKey, data.userToken);
    return { user: data.user, userToken: data.userToken };
  };

  const logout = (pathname = "/login") => {
    removeFromStorage(appSettings.userStorageKey);
    removeFromStorage(appSettings.tokenStorageKey);
    setUser(null);
    setToken(null);
    router.push(pathname);
  };

  const refreshAccessToken = async () => {
    const userToken = getFromStorage(appSettings.tokenStorageKey);
    let refresh_token = null;
    if (userToken) {
      refresh_token = userToken?.refresh_token;
    }
    if (refresh_token) {
      try {
        const { data } = await APIClient.put("/auth/jwt/refresh", {
          refresh_token,
        });
        setToken((prevState = {}) => ({ ...prevState, ...data }));
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response.status === 401) {
            console.log("Invalid refresh token");
            logout("/login?callbackUrl=" + router.pathname);
          }
        }
      }
    }
  };
  const isTokenValid = () => {
    const userToken = getFromStorage(appSettings.tokenStorageKey);
    if (userToken) {
      const { exp } = decodeToken(userToken?.access_token);
      return exp > Date.now() / 1000;
    }
    return false;
  };

  const getUser = () => {
    let localUser = getFromStorage(appSettings.userStorageKey);
    setUser(localUser);
    insertIntoStorage(appSettings.userStorageKey, localUser);
    return localUser;
  };
  const getCurrentUser = (required = false, onUnauthenticated) => {
    if (isSsr) return {};
    const currentUser = getUser();
    const isAuthenticated = isTokenValid();
    if (required == true && isAuthenticated === false) {
      if (onUnauthenticated) {
        onUnauthenticated();
        return {};
      }
      logout("/login?callbackUrl=" + router.pathname);
    }
    return { currentUser, isAuthenticated };
  };

  const updateCurrentUser = (data) => {
    const user = getUser();
    const updatedUser = { ...user, ...data };
    insertIntoStorage(appSettings.userStorageKey, updatedUser);
    setUser(updatedUser);
    return updatedUser;
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, getCurrentUser, updateCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

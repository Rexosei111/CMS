"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useTokenRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [token, setToken] = useToken("cms_token", null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        setIsRefreshing(true);
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/token/refresh",
          {
            refresh_token: token.refresh_token,
          }
        );
        setToken({
          ...data,
          expiresIn: new Date(
            new Date().getTime() + process.env.NEXT_PUBLIC_TOKEN_EXPIRES_IN
          ),
        });
      } catch (error) {
        // Handle error (e.g., logout user, show error message)
        console.error("Failed to refresh access token", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const intervalId = setInterval(() => {
      // Refresh the access token 5 minutes before it expires
      const currentTime = new Date();
      const expiresIn = new Date(+token?.expiresIn);
      const timeUntilExpiration = expiresIn?.getTime() - currentTime?.getTime(); // calculate time until expiration of access token
      if (timeUntilExpiration < 5 * 60 * 1000) {
        refreshAccessToken();
      }
    }, +process.env.NEXT_PUBLIC_TOKEN_REFRESH_CHECK); // Check every minute

    return () => clearInterval(intervalId);
  }, [token]);

  return isRefreshing;
};

const useToken = (key, initialValue) => {
  // const router = useRouter();

  const [token, setState] = useState(() => {
    if (typeof window !== undefined) {
      try {
        const value = window.localStorage.getItem(key);
        // Check if the local storage already has any values,
        // otherwise initialize it with the passed initialValue
        if (value === null) {
          const currentPath = window.location.pathname;
          if (currentPath !== "/auth/login")
            window.location.pathname = "/auth/login";
        }
        return value ? JSON.parse(value) : initialValue;
      } catch (error) {
        console.log(error);
      }
    }
  });

  const setToken = (value) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(token) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [token, setToken];
};

export default useToken;

export const useTokenValidation = () => {
  const router = useRouter();
  const [token, setToken] = useToken("cms_token");

  useEffect(() => {
    const access_token = token ? token?.access_token : null;

    const currentPathname = window.location.pathname;
    if (access_token === null) {
      router.push(`/auth/login`);
    }

    // const userType = data?.me.type;
    // const basePath = getUserTypeBasePath(userType);
    // if (
    //   !currentPathname.startsWith(basePath) &&
    //   currentPathname !== "/auth/login"
    // ) {
    //   if (window.location.pathname !== "/auth/login") {
    //     router.push(`/auth/login?callbackUrl=${currentPathname}`);
    //   }
    // }
  }, [token]);
};

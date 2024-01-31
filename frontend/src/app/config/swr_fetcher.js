import { APIClient } from "./axios";

export const fetcher = async (url) => {
  const { data } = await APIClient.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

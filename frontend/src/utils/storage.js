export const isSsr = typeof window === "undefined";

export const getFromStorage = (key) => {
  if (typeof window !== undefined) {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value;
  }
  return null;
};

export const insertIntoStorage = (key, value) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromStorage = (key) => {
  if (typeof window !== undefined) {
    window.localStorage.removeItem(key);
  }
};

export const setIntoLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string): unknown => {
  const storedValue = localStorage.getItem(key);

  if (storedValue !== null) {
    return JSON.parse(storedValue);
  }
  return null;
};

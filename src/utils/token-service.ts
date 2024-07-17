export const saveAccessToken = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getAccessToken = (key: string) => {
  return localStorage.getItem(key);
};

export const removeAccesToken = (key: string) => {
  localStorage.removeItem(key);
};

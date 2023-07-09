export const enviroment = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:8080',
};

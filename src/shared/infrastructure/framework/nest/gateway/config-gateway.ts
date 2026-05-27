export const configGateway = {
  cors: { origin: '*' },
  transports: ['websocket'],
  maxHttpBufferSize: 5 * 1024 * 1024, // Límite de 5MB por mensaje
  pingInterval: 15000,
  pingTimeout: 10000,
} 
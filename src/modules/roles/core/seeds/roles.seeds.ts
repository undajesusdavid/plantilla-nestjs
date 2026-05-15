
export const ROLES = {
  ROOT: {
    name: 'root',
    description: 'Rol con todos los permisos',
    isActive: true,
    permissions: [1]
  },
  ADMIN: {
    name: 'admin',
    description: 'Rol con permisos para administrar el sistema',
    isActive: true,
    permissions: [200, 201]
  }
} as const;



export const PERMISSIONS = {
  ALL: { name: '*:*', description: 'Permite todos los permisos' },
  //Control de acceso - Roles
  CREATE_ROLE: {
    name: 'role:create',
    description: 'Permite crear nuevos roles',
  },
  READ_ROLES: {
    name: 'role:read',
    description: 'Permite leer la lista de roles',
  },
  UPDATE_ROLE: {
    name: 'role:update',
    description: 'Permite actualizar la información de un rol',
  },
  DELETE_ROLE: { name: 'role:delete', description: 'Permite eliminar un rol' },

  ASSIGN_ROLES: {
    name: 'role:assign',
    description: 'Permite asignar roles a los usuarios',
  },
  STATUS_ROLE: {
    name: 'role:status',
    description: 'Permite activar o desactivar un rol',
  },
  ALL_ROLES: {
    name: 'role:*',
    description: 'Permite hacer todas las acciones relacionadas con los roles',
  },

  //Control de acceso - Permisos
  CREATE_PERMISSION: {
    name: 'permission:create',
    description: 'Permite crear nuevos permisos',
  },
  READ_PERMISSIONS: {
    name: 'permission:read',
    description: 'Permite leer la lista de permisos',
  },
  UPDATE_PERMISSION: {
    name: 'permission:update',
    description: 'Permite actualizar la información de un permiso',
  },
  DELETE_PERMISSION: {
    name: 'permission:delete',
    description: 'Permite eliminar un permiso',
  },
  ASSIGN_PERMISSIONS: {
    name: 'permission:assign',
    description: 'Permite asignar permisos a los roles',
  },
  STATUS_PERMISSION: {
    name: 'permission:status',
    description: 'Permite activar o desactivar un permiso',
  },
  ALL_PERMISSIONS: {
    name: 'permission:*',
    description: 'Permite hacer todas las acciones relacionadas con los permisos',
  },
  // Usuarios
  CREATE_USER: {
    name: 'user:create',
    description: 'Permite crear nuevos usuarios',
  },
  READ_USERS: {
    name: 'user:read',
    description: 'Permite leer la lista de usuarios',
  },
  UPDATE_USER: {
    name: 'user:update',
    description: 'Permite actualizar la información de un usuario',
  },
  DELETE_USER: {
    name: 'user:delete',
    description: 'Permite eliminar un usuario',
  },
  STATUS_USER: {
    name: 'user:status',
    description: 'Permite activar o desactivar un usuario',
  },
  
  ALL_USERS: {
    name: 'user:*',
    description: 'Permite hacer todas las acciones relacionadas con los usuarios',
  },
} as const;



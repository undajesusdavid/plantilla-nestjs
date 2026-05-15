export const PERMISSIONS = {

  /**--------------------------------------------------------------------------- */
  /** --------------------------------- GLOBAL ---------------------------------*/
 
  ALL: { id: 1, name: '*:*', description: 'Permite todos los permisos' },

  /**--------------------------------------------------------------------------- */
  /** --------------------------------- PERMISOS ---------------------------------*/
  READ_PERMISSIONS: {
    id: 100,
    name: 'permission:read',
    description: 'Permite leer la lista de permisos',
  },

  UPDATE_PERMISSION_STATUS: {
    id: 101,
    name: 'permission:update_status',
    description: 'Permite activar o desactivar un permiso',
  },
  
  /**--------------------------------------------------------------------------- */
  /** --------------------------------- ROLES ---------------------------------*/

  CREATE_ROLE: {
    id:200,
    name: 'role:create',
    description: 'Permite crear nuevos roles',
  },
  
  READ_ROLES: {
    id:201,
    name: 'role:read',
    description: 'Permite leer la lista de roles',
  },

  UPDATE_ROLE: {
    id:202,
    name: 'role:update',
    description: 'Permite actualizar la información de un rol',
  },

  DELETE_ROLE: {  
    id:203,
    name: 'role:delete', 
    description: 'Permite eliminar un rol' 
  },

  /**--------------------------------------------------------------------------- */
  /** --------------------------------- USUARIOS ---------------------------------*/
  CREATE_USER: {
    id: 300,
    name: 'user:create',
    description: 'Permite crear nuevos usuarios',
  },

  READ_USERS: {
    id: 301,
    name: 'user:read',
    description: 'Permite leer la lista de usuarios',
  },

  UPDATE_USER: {
    id: 302,
    name: 'user:update',
    description: 'Permite actualizar la información de un usuario',
  },

  UPDATE_USER_ROLES: {
    id: 303,
    name: 'user:update_roles',
    description: 'Permite actualizar la información de un usuario',
  },

  DELETE_USER: {
    id: 304,
    name: 'user:delete',
    description: 'Permite eliminar un usuario',
  }

  /**--------------------------------------------------------------------------- */

} as const;



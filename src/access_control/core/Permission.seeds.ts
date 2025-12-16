export const PERMISSIONS = {
  ALL: { name: '*', description: 'Permite todos los permisos' },
  CREATE_USER: { name: 'create:user', description: 'Permite crear nuevos usuarios' },
  READ_USERS: { name: 'read:users', description: 'Permite leer la lista de usuarios' },
  UPDATE_USER: { name: 'update:user', description: 'Permite actualizar la información de un usuario' },
  DELETE_USER: { name: 'delete:user', description: 'Permite eliminar un usuario' },
  DEACTIVE_USER: { name: 'deactive:user', description: 'Permite desactivar el usuario' },

} as const;
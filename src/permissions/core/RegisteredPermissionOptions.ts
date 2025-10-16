export const AllowedActionOptions = ["all","create","red","update","delete"];

export const ModuleAndResources: Record<string, string[]> = {
    User: ['general','profile', 'settings', 'roles'],
    Permission: ['general', 'settings'],
};
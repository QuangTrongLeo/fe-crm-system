export const Role = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    SALES: 'SALES',
} as const;

export type Role = typeof Role[keyof typeof Role];
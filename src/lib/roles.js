export const ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    MANAGER: 'MANAGER',
    ATTENDANT: 'ATTENDANT',
    ACCOUNTANT: 'ACCOUNTANT',
    INVENTORY_OFFICER: 'INVENTORY_OFFICER',
}
export const isManagerOrAdmin = (user) => [ROLE.SUPER_ADMIN, ROLE.MANAGER].includes(user?.role)
export const isAttendant = (user) => user?.role === ROLE.ATTENDANT
import { permissions, PermissionName, ROLE } from '../utils/RolesAndPermission';

const usePermission = (role: ROLE) => {
  const hasPermission = (permissionName: PermissionName) => {
    return permissions[permissionName].includes(role);
  };
  return { hasPermission };
};

export default usePermission;

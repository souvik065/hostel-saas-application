import { permissions } from '../utils/RolesAndPermission';
import React from 'react';

interface AccessGuardProviderProps {
  requiredPermissions: (keyof typeof permissions)[];
  children: React.ReactNode;
}

const AccessGuardProvider = ({ requiredPermissions, children }: AccessGuardProviderProps) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        // Check if each child requires specific permissions
        if (React.isValidElement(child) && requiredPermissions) {
          const hasPermission = requiredPermissions.some((permission) => permissions[permission]);
          return hasPermission ? child : null;
        }
        return child;
      })}
    </>
  );
};

export default AccessGuardProvider;

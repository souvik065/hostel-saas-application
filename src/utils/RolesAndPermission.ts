enum ROLE {
  SuperAdmin,
  Admin,
  Warden,
  AssistantWarden,
  Hostelite,
  Parent,
  Guest,
}

const permissions = {
  'create_hostel.edit': [ROLE.Admin, ROLE.SuperAdmin],
  'create_hostel.create': [ROLE.Admin],
  'create_hostel.delete': [ROLE.SuperAdmin],
  'create_hostel.read': [ROLE.Admin, ROLE.SuperAdmin],
};

export type PermissionName = keyof typeof permissions;

export { permissions, ROLE };

const allRoles = {
  user: ['user'],
  admin: ['getUsers', 'manageUsers', 'parkingLotManager'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

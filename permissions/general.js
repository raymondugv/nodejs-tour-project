const {ROLE, PERMISSION_ROLE} = require("../data");

const canViewItem = (user, item) => {
  return PERMISSION_ROLE.READ.includes(user.roleId) || item.owner === user.id;
};

const scopedItems = (user, items) => {
  if (user.roleId === ROLE.ADMIN) {
    return items;
  }

  return items.filter((item) => item.owner === user.id);
};

const canDeleteItem = (user, item) => {
  return (PERMISSION_ROLE.DELETE.includes(user.roleId) ||
          item.owner === user.id);
};

const canEditItem = (user, item) => {
  return (PERMISSION_ROLE.UPDATE.includes(user.roleId) ||
          item.owner === user.id);
};

module.exports = {
  canViewItem,
  scopedItems,
  canDeleteItem,
  canEditItem,
};

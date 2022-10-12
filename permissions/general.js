const {
  ROLE,
  PERMISSION,
  PERMISSION_ROLE,
  ACTIVE_FIELD,
} = require("@config/data");

const isOwner = (user, item) => {
  if (item) {
    return item.owner === user.id;
  }
};

const canViewItem = (user, item) => {
  return PERMISSION_ROLE.READ.includes(user.roleId) || isOwner(user, item);
};

const canCreateItem =
    (user) => { return PERMISSION_ROLE.CREATE.includes(user.roleId); };

const scopedItems = (user, items) => {
  if (user.roleId === ROLE.ADMIN) {
    return items;
  }

  return items.filter((item) => isOwner(user, item));
};

const canDeleteItem = (user, item) => {
  return PERMISSION_ROLE.DELETE.includes(user.roleId) || isOwner(user, item);
};

const canEditItem = (user, item) => {
  return PERMISSION_ROLE.UPDATE.includes(user.roleId) || isOwner(user, item);
};

const canActiveItem = (user, body) => {
  const field =
      Object.keys(body).find((key) => { ACTIVE_FIELD.includes(key); });

  return (PERMISSION_ROLE.ACTIVE.includes(user.roleId) &&
          ACTIVE_FIELD.includes(field));
};

module.exports = {
  canViewItem,
  canCreateItem,
  scopedItems,
  canDeleteItem,
  canEditItem,
  canActiveItem,
};

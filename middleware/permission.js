const {
  canViewItem,
  canDeleteItem,
  canEditItem,
} = require("../permissions/general");

module.exports = (req, res, next) => {
  const condition = canViewItem(req.user, req.item) ||
                    canEditItem(req.user, req.item) ||
                    canDeleteItem(req.user, req.item);

  if (!condition) {
    return res.status(403).json({
      error : "You do not have permission to perform this action.",
    });
  }

  next();
};

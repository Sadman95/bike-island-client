/**
 * Roles value enum
 * @enum {string}
 */
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
/**
 * order status value enum
 * @enum {string}
 */
const ORDER_STAT = {
  PENDING: 'pending',
  APPROVED: 'approved',
  CANCELED: 'canceled',
};
/**
 * notification status value enum
 * @enum {string}
 */
const NOTIFICATION = {
  CREATE_ORDER: 'create-order',
  CREATE_PRODUCT: 'create-product',
  UPDATE_ORDER: 'update-order',
  DELETE_ORDER: 'delete-order',
  CANCEL_ORDER: 'cancel-order',
  UPDATE_PRODUCT: 'update-product',
  DELETE_PRODUCT: 'delete-product',
  DELETE_USER: 'delete-user',
};

export { ROLES, ORDER_STAT, NOTIFICATION };

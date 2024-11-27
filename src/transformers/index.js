import { MONTHS } from 'constants';

/**
 =================
 orders transformer
 ===================
 */
export function transformOrdersData(orders) {
  const result = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (!result[year]) {
      result[year] = Array(12).fill(0);
    }

    result[year][month] += order.price || order.totalAmount;
  });

  const formattedResult = Object.keys(result).map((year) => ({
    [year]: result[year],
  }));

  return formattedResult;
}

/**
 ================
 users transformer
 ==================
 */
export function transformUsersData(users) {
  const result = {};

  users.forEach((user) => {
    const date = new Date(user.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (!result[year]) {
      result[year] = MONTHS.map((label) => ({ label, value: 0 }));
    }

    result[year][month].value++;
  });
  // Transform result to the desired format
  // const output = Object.keys(result).map((year) => ({
  //   [year]: result[year],
  // }));

  return result;
}

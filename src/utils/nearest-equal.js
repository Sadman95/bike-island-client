/**
 * Finds the nearest or equal data point to the target value from an array.
 * @param {(string | number)[]} arra - An array of data points as strings or numbers.
 * @param {number} target - The target value to find the nearest data point to.
 * @returns {number} The nearest or equal data point to the target.
 */
export const nearestEqual = (arra, target) => {
  const nearestData = arra
    .map((data) => parseInt(data, 10)) // Convert each data point to an integer
    .reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));
  return nearestData;
};

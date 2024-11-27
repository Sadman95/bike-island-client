export function convertToTitleCase(str) {
  // Split the string by camel case
  const words = str.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word and join them with spaces
  const titleCase = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return titleCase;
}

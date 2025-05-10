/**
 * Parse a hexcode into an rgba
 * @param {string} hexcode
 * @param {number} opacity
 * @return {string}
 */
export function rgba(hexcode: string, opacity: number) {
  const values = [
    hexcode.substring(1, 3),
    hexcode.substring(3, 5),
    hexcode.substring(5, 7),
  ].map((item) => parseInt(item, 16));
  return `rgba(${values[0]},${values[1]},${values[2]},${opacity})`;
}

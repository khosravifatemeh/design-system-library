export function convertName(name) {
  return formatNameToScss(name);
}

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
/**
 * format a given name to the format expected in CSS/SCSS-based projects.
 * @param {string} name
 * @returns {string}
 */
function formatNameToScss(name) {
  let string = "";
  for (let i = 0; i < name.length; i++) {
    const char = name[i];

    // Skip dashes
    if (char === "-") {
      continue;
    }

    // If it's a number, add dash and the rest, then break
    if (
      numbers.indexOf(char) !== -1 &&
      i !== 0 &&
      numbers.indexOf(name[i - 1]) === -1
    ) {
      string += "-" + name.slice(i);
      break;
    }

    // If uppercase
    if (
      char === char.toUpperCase() &&
      char.toLowerCase() !== char.toUpperCase()
    ) {
      // If previous char is lowercase, insert a dash
      if (
        i > 0 &&
        name[i - 1] !== "-" &&
        name[i - 1] !== name[i - 1].toUpperCase()
      ) {
        string += "-" + char.toLowerCase();
      } else {
        // Otherwise just add the lowercase version
        string += char.toLowerCase();
      }
      continue;
    }

    // Default: just add the char
    string += char;
  }

  return string;
}

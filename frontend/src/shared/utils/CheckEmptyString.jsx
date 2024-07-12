export default function checkEmptyString(...strs) {
  for (let str of strs) {
    if (str.length == 0) {
      return true;
    }
  }

  return false;
}

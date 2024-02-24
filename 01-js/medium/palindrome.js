/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // Convert the string to lowercase and remove non-alphabetic characters
  str = str.toLowerCase().replace(/[^a-z]/g, '');

  let start = 0;
  let end = str.length - 1;

  // Compare characters from both ends of the string
  while (start < end) {
      if (str[start] !== str[end]) {
          return false; // If characters do not match, it's not a palindrome
      }
      start++;
      end--;
  }

  return true; // If all characters match, it's a palindrome
}


module.exports = isPalindrome;

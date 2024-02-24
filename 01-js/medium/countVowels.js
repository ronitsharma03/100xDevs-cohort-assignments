/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let count = 0;
    let st = str.toLowerCase();
    for(let i = 0; i <= st.length; i++){
      if(st[i] === 'a'){
        count++;
      }
      else if (st[i] === 'e') {
        count++;
      }
      else if (st[i] === 'i') {
        count++;
      }
      else if (st[i] === 'o') {
        count++;
      }
      else if (st[i] === 'u') {
        count++;
      }
    }
    return count;
}

module.exports = countVowels;
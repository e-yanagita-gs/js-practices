#!/usr/bin/env node

function fizzbuzz(i) {
  if (i % 3 === 0 && i % 5 === 0) {
    return "FizzBuzz";
  } else if (i % 3 === 0) {
    return "Fizz";
  } else if (i % 5 === 0) {
    return "Buzz";
  } else {
    return i.toString();
  }
}

for (let i = 1; i <= 20; i++) {
  console.log(fizzbuzz(i));
}

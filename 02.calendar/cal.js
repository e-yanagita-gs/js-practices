#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
let year = argv.y ?? today.getFullYear();
let month = argv.m ?? today.getMonth() + 1;

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDate.getDay()));

for (
  let currentDate = firstDate.getDate();
  currentDate <= lastDate.getDate();
  currentDate++
) {
  process.stdout.write(String(currentDate).padStart(2));
  if (
    (firstDate.getDay() + currentDate) % 7 === 0 ||
    currentDate === lastDate.getDate()
  ) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}

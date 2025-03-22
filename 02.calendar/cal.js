#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y ?? today.getFullYear();
const month = argv.m ?? today.getMonth() + 1;

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDate.getDay()));

for (
  let currentDay = firstDate.getDate();
  currentDay <= lastDate.getDate();
  currentDay++
) {
  process.stdout.write(String(currentDay).padStart(2));
  if (
    (firstDate.getDay() + currentDay) % 7 === 0 ||
    currentDay === lastDate.getDate()
  ) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}

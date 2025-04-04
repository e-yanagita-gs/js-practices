import sqlite3 from "sqlite3";

import { runQuery, allQuery, closeDb } from "./dbOperations.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  await runQuery(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  console.log("テーブルを作成しました");

  const result = await runQuery(db, "INSERT INTO books (title) VALUES (?)", [
    "Sample",
  ]);
  console.log(`データを追加しました。ID: ${result.lastID}`);

  const books = await allQuery(db, "SELECT * FROM books");
  console.log("取得したデータ:", books);

  await runQuery(db, "DROP TABLE books");
  console.log("テーブルを削除しました");
  closeDb(db);
}

main();

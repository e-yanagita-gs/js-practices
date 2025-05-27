import sqlite3 from "sqlite3";

import { runQuery, allQuery, closeDb } from "./db_operations.js";

const db = new sqlite3.Database(":memory:");

runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブルを作成しました");
    return runQuery(db, "INSERT INTO books (title) VALUES (?)", ["Sample"]);
  })
  .then((result) => {
    console.log(`データを追加しました。ID: ${result.lastID}`);
    return allQuery(db, "SELECT * FROM books");
  })
  .then((books) => {
    console.log("取得したデータ:", books);
    return runQuery(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return closeDb(db);
  })
  .then(() => {
    console.log("データベースを閉じました");
  });

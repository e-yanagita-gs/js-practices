import sqlite3 from "sqlite3";

import { runQuery, allQuery, closeDb } from "./dbOperations.js";

const db = new sqlite3.Database(":memory:");

runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブルを作成しました");
    return runQuery(db, "INSERT INTO book (title) VALUES (?)", ["Sample"]);
  })
  .catch((error) => {
    console.error("データの追加に失敗しました:", error.message);
    return allQuery(db, "SELECT content FROM books");
  })
  .catch((error) => {
    console.error("データの取得に失敗しました:", error.message);
    return runQuery(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");
    closeDb(db);
  });

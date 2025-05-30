import sqlite3 from "sqlite3";

import { runQuery, allQuery, closeDb } from "./db_operations.js";

const db = new sqlite3.Database(":memory:");

await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
console.log("テーブルを作成しました");

try {
  await runQuery(db, "INSERT INTO book (title) VALUES (?)", ["Sample"]);
} catch (error) {
  if (error instanceof Error && error.code === "SQLITE_ERROR") {
    console.error("データの追加に失敗しました:", error.message);
  } else {
    throw error;
  }
}

try {
  await allQuery(db, "SELECT content FROM books");
} catch (error) {
  if (error instanceof Error && error.code === "SQLITE_ERROR") {
    console.error("データの取得に失敗しました:", error.message);
  } else {
    throw error;
  }
}

await runQuery(db, "DROP TABLE books");
console.log("テーブルを削除しました");

await closeDb(db);
console.log("データベースを閉じました");

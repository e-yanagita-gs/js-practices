import sqlite3 from "sqlite3";

import { runQuery, allQuery, closeDb } from "./dbOperations.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  try {
    await runQuery(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    );
    console.log("テーブルを作成しました");
    const result = await runQuery(db, "INSERT INTO book (title) VALUES (?)", [
      "Sample",
    ]);
  } catch (error) {
    console.error("データの追加に失敗しました:", error.message);
  }
  try {
    const books = await allQuery(db, "SELECT content FROM books");
  } catch (error) {
    console.error("データの取得に失敗しました:", error.message);
  } finally {
    runQuery(db, "DROP TABLE books");
    console.log("テーブルを削除しました");
    closeDb(db);
  }
}
main();

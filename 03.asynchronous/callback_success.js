import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブルを作成しました");

    db.run("INSERT INTO books (title) VALUES (?)", ["Sample"], function () {
      console.log(`データを追加しました。ID: ${this.lastID}`);

      db.all("SELECT * FROM books", (_, books) => {
        console.log("取得したデータ:", books);

        db.run("DROP TABLE books", () => {
          console.log("テーブルを削除しました");

          db.close(() => {
            console.log("データベースを閉じました");
          });
        });
      });
    });
  },
);

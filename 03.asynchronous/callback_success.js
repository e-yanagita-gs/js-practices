import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  function () {
    console.log("テーブルを作成しました");

    db.run("INSERT INTO books (title) VALUES (?)", ["Sample"], function () {
      console.log(`データを追加しました。ID: ${this.lastID}`);

      db.all("SELECT * FROM books", function (_, rows) {
        console.log("取得したデータ:", rows);

        db.run("DROP TABLE books", function () {
          console.log("テーブルを削除しました");
          db.close();
        });
      });
    });
  },
);

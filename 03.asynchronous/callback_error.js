import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("テーブルを作成しました");

    db.run("INSERT INTO book (title) VALUES (?)", ["Sample"], function (error) {
      if (error) {
        console.error("データの追加に失敗しました:", error.message);
      }

      db.all("SELECT content FROM books", (error) => {
        if (error) {
          console.error("データの取得に失敗しました:", error.message);
        }

        db.run("DROP TABLE books", () => {
          console.log("テーブルを削除しました");

          db.close();
          console.log("データベースを閉じました");
        });
      });
    });
  },
);

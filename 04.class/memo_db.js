import sqlite3 from "sqlite3";
import Memo from "./memo.js";

class MemoDb {
  constructor() {
    this.db = new sqlite3.Database("./memos.db");
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
      );
    });
  }

  createMemo(content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO memos (content) VALUES (?)",
        content,
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        },
      );
    });
  }

  getAllMemos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map((row) => new Memo(row.id, row.content)));
        }
      });
    });
  }

  getMemo(id) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM memos WHERE id = ?", id, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? new Memo(row.id, row.content) : null);
        }
      });
    });
  }

  deleteMemo(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM memos WHERE id = ?", id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}

export default MemoDb;

export function runQuery(db, query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

export function allQuery(db, query, params) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export function closeDb(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

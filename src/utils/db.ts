import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'NoteAppDb',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('DB Error', error);
  },
);

export const initializeDatabase = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT,user_name TEXT,email TEXT,password TEXT,location TEXT);',
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,title TEXT,description TEXT,FOREIGN KEY(user_id) REFERENCES Users(id));',
      );
    },
    error => console.log('DB İNİT ERROR', error),
    () => console.log('Tüm tablolar başarılı bir şekilde oluşturuldu'),
  );
};

export const insertUserIfNotExists = async user => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // İlk olarak e-posta kontrolü yapılıyor
      tx.executeSql(
        `SELECT * FROM Users WHERE email = ?`,
        [user.email],
        (tx, results) => {
          if (results.rows.length > 0) {
            // Kullanıcı zaten varsa
            reject({success: false, message: 'Kullanıcı kaydı mevcut'});
          } else {
            // Kullanıcı yoksa yeni kayıt ekle
            tx.executeSql(
              `INSERT INTO Users (user_name, email, password,location) VALUES (?, ?, ?,?)`,
              [user.name, user.email, user.password],
              (tx, results) => {
                resolve({
                  success: true,
                  message: 'Kullanıcı Başarılı bir şekilde kayıt oldu',
                });
              },
              (tx, error) => {
                reject(error.message || 'Failed to insert user');
              },
            );
          }
        },
        (tx, error) => {
          reject(error.message || 'Failed to check for existing user');
        },
      );
    });
  });
};
export const insertNoteDb = values => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO  Notes (user_id,title,description) VALUES (?,?,?)',
        [values.user_id, values.title, values.description],
      );
    },
    error => console.log('Veri ekleme hatası', error),
    () => console.log('veri başarılı birşekilde eklendi'),
  );
};
export const getUsersFromDb = async values => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE email=?`,
        [values.email, values.password],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            if (user.password == values.password) {
              resolve({success: true, message: 'Giriş Başarılı', user});
            } else {
              reject({
                success: false,
                message: 'Kullanıcı bilgileri kotrol edip tekrar deneyiniz',
              });
            }
          } else reject({success: false, message: 'Kullanıcı Bulunamadı'});
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
export const getUsersInfoFromDb = async userId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE id=?`,
        [userId],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            resolve(user);
          } else reject({success: false, message: 'Kullanıcı Bulunamadı'});
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
export const getNotesFromDb = async values => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Notes WHERE user_id=?`,
        [values.user_id],
        (tx, results) => {
          const len = results.rows.length;
          const notes = [];
          for (let i = 0; i < len; i++) {
            notes.push(results.rows.item(i));
          }
          resolve(notes);
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
export const updateUserFromDb = async values => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE  Users SET user_name=?,password=?,location=? WHERE id=?`,
        [values.username, values.password, values.location, values.id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve({success: true, message: 'Güncelleme Başarılı'});
          } else reject({success: false, message: 'Güncelleme Başarısız'});
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
export const deleteNoteFromDb = async notId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM Notes WHERE id=?`,
        [notId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve({success: true, message: 'Silme İşlemi Başarılı'});
          } else reject({success: false, message: 'Silme İşlemi Başarısız'});
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
export const updateNoteFromDb = async (note) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE Notes SET title = ?, description = ? WHERE id = ?`,
        [note.title, note.description, note.id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve({ success: true, message: 'Notunuz güncellendi' });
          } else {
            reject({ success: false, message: 'Not güncellenemedi' });
          }
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

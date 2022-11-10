const nedb = require("nedb");
const db = {};
const path = require("path");

module.exports.init = async () => {
  const tables = require("./config.json").table;
  return Promise.all(tables.map((name) => insertInitialData(name)));
};

const insertInitialData = async (tableName) => {
  db[tableName] = new nedb();
  const dataPath = path.join(__dirname, "initialData", tableName);
  const data = require(dataPath);
  return new Promise((resolve, reject) => {
    data.forEach((d) => {
      db[tableName].insert(d, (error) => {
        if (error) reject(error);
      });
    });
    resolve(data);
  });
};

module.exports.getDB = (tableName) => {
  if (tableName) return db[tableName];
  else return db;
};

module.exports.insertTo = async (tableName, doc) => {
  if (tableName && db[tableName] !== void 0) {
    return new Promise((resolve, reject) => {
      db[tableName].insert(doc, (error, doc) => {
        if (error) reject(error);
        else resolve(doc);
      });
    });
  } else {
    return null;
  }
};

module.exports.findFrom = async (tableName, query) => {
  if (tableName && db[tableName] !== void 0) {
    return new Promise((resolve, reject) => {
      db[tableName].find(query, (error, docs) => {
        if (error) reject(error);
        else resolve(docs);
      });
    });
  } else {
    return null;
  }
};

module.exports.findOneFrom = async (tableName, query) => {
  if (tableName && db[tableName] !== void 0) {
    return new Promise((resolve, reject) => {
      db[tableName].findOne(query, (error, doc) => {
        if (error) reject(error);
        else resolve(doc);
      });
    });
  } else {
    return null;
  }
};

module.exports.updateTo = async (tableName, query, update) => {
  if (tableName && db[tableName] !== void 0) {
    return new Promise((resolve, reject) => {
      db[tableName].update(query, update, (error, numAffected) => {
        if (error) reject(error);
        else resolve(numAffected);
      });
    });
  } else {
    return null;
  }
};

module.exports.removeFrom = async (tableName, query) => {
  if (tableName && db[tableName] !== void 0) {
    return new Promise((resolve, reject) => {
      db[tableName].remove(query, (error, numRemoved) => {
        if (error) reject(error);
        else resolve(numRemoved);
      });
    });
  } else {
    return null;
  }
};

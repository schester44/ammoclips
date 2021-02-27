const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const userData = app.getPath('userData');
const dbPath = path.join(userData, 'copied.json');

if (!fs.existsSync(userData)) {
  fs.mkdirSync(userData);
}

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '{}');
}

const adapter = new FileSync(dbPath);
const db = low(adapter);

db.defaults({
  clips: [],
  autoLaunch: true,
  maxClips: 10,
}).write();

export default db;

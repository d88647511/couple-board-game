import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg-YvvfUNvJNDYlzyd2bA0MuWXotvz5sg",
  authDomain: "couple-board-game.firebaseapp.com",
  databaseURL: "https://couple-board-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "couple-board-game",
  storageBucket: "couple-board-game.firebasestorage.app",
  messagingSenderId: "133501507868",
  appId: "1:133501507868:web:17396fe377a37fe83302d9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.db = db;

console.log("✅ Firebase 已連線");
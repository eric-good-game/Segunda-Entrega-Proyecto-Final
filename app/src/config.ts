import mongoose from "mongoose";
import admin from 'firebase-admin'

const serviceAccount = require("./db/coderhouse-fd4c7-firebase-adminsdk-aktuk-fc5aaf58b6.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://url-example.firebaseio.com",
});

const url = "mongodb://localhost:27017/ecommerce";
mongoose.connect(url);
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
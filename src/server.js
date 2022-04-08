import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { v4 as uuid } from "uuid";

const app = express();
const server = new http.Server(app);
const socket = new SocketServer(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res)=> {
  const redirectURL = uuid();
  res.redirect(`/${redirectURL}`);
})

app.get("/:room", (req, res)=> {
  const roomID = req.params.room;
  res.render("room", {
    roomID,
  });
})

socket.on("connection", connection => {
  connection.on("join-room", (roomId, userId) => {
    console.log(roomId);
    console.log(userId);
  })
})

app.listen(5000, () => {
  console.log("listening on 500");
})


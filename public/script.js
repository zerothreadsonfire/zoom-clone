const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "/",
  port: 3001,
});

const el = document.querySelector(".video");

navigator.mediaDevices.getUserMedia({
  video: "true",
  audio: "true",
}).then(stream => {
  el.srcObject = stream;
  el.addEventListener("loadedmetadata", () => {
    el.play();
  })
})

myPeer.on("open", id=> {
  socket.emit("join-room", ROOM_ID, 10);
})

socket.on("user-connected", userId => {
  console.log("new joiner"+ userId);
})

function addVideoToStream(video, stream){
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  })
}
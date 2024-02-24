let onlineUsers = [];
export default function (socket, io) {
  // user joins or opens app

  socket.on("join", (user) => {
   .... Code here 
  });

  //socket ofline - user

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
    // console.log(`user has went offline `);
  });

  // join convo Room
  socket.on("joinConvoRoom", (conversation) => {
    socket.join(conversation);
    // console.log("user joined ConvoRoom", conversation);
  });

  // send and recieve msg

  socket.on("sendMsg", (message) => {
    // console.log("new msg ---", message);
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
// code Here 
    });
  });

  // typing

  //typing
  socket.on("typing", (conversation) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    socket.in(conversation).emit("stop typing");
  });

  //  call user
  socket.on("call user", (data) => {
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    io.to(userSocketId?.socketId).emit("call user", {
     // Code here ///
    });
  });
  //answer call

  // socket.on("answer call", (data) => {
  //   io.to(data.to).emit("call accepted", data.signal);
  // });
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", data.signal);
  });

  //---end call
  socket.on("end call", (id) => {
    io.to(id).emit("end call");
  });
}

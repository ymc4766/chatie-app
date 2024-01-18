let onlineUsers = [];
export default function (socket, io) {
  // user joins or opens app

  socket.on("join", (user) => {
    // console.log("user joined -", user);
    socket.join(user);

    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
      // console.log(`user ${user} is now Online`);
    }

    // send online users frontend
    io.emit("get-online-users", onlineUsers);
    io.emit("setup socket", socket.id);
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
    let conversation = message?.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message?.sender?._id) return;
      socket.in(user._id).emit("messageRecieve", message);
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
}

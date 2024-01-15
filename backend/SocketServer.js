export default function (socket) {
  // user joins or opens app

  socket.on("join", (user) => {
    // console.log("user joined -", user);
    socket.join(user);
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
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("messageRecieve", message);
    });
  });
}

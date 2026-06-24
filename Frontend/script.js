const socket = io("http://localhost:5000");

const username = document.getElementById("username");
const msg = document.getElementById("msg");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

function send() {

  const user = username.value.trim() || "User";
  const message = msg.value.trim();

  if (!message) return;

  socket.emit("send_message", {
    user,
    message
  });

  msg.value = "";
}

function checkEnter(e) {
  if (e.key === "Enter") {
    send();
  }
}

msg.addEventListener("input", () => {
  socket.emit("typing", username.value || "User");
});

socket.on("typing", (name) => {

  typing.innerText = `${name} is typing...`;

  setTimeout(() => {
    typing.innerText = "";
  }, 1000);

});

socket.on("receive_message", (data) => {

  const li = document.createElement("li");

  if (data.user === username.value) {
    li.classList.add("me");
  }

  li.innerHTML = `
    <div class="msg-header">
      <span>${data.user}</span>
      <span>${data.time}</span>
    </div>
    <div>${data.message}</div>
  `;

  messages.appendChild(li);

  messages.scrollTop = messages.scrollHeight;

});

socket.on("users_count", (count) => {

  document.getElementById("users").innerText =
    `Online Users: ${count}`;

});

function toggleDark() {
  document.body.classList.toggle("dark");
}
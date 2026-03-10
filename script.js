const socket = io("http://localhost:5000");

const username = document.getElementById("username");
const msg = document.getElementById("msg");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const time = new Date().toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit',
});

window.onload = function(){

let name = prompt("Enter your name");

if(!name) name = "User";

username.value = name;

socket.emit("user_joined", name);

};

function send(){

const user = username.value;
const message = msg.value;

if(message === "") return;

socket.emit("send_message",{user,message});

msg.value = "";

}

function checkEnter(e){

if(e.key === "Enter"){
send();
}

}

msg.addEventListener("input",()=>{

socket.emit("typing", username.value);

});

socket.on("typing",(name)=>{

typing.innerText = name + " is typing...";

setTimeout(()=>{
typing.innerText = "";
},1000);

});

socket.on("receive_message",(data)=>{

const li = document.createElement("li");

const time = new Date().toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

if(data.user === username.value){
li.classList.add("me");
}

li.innerHTML =
"<b>"+data.user+"</b><br>"+
data.message+
"<div class='time'>"+time+"</div>";

messages.appendChild(li);

messages.scrollTop = messages.scrollHeight;

});

socket.on("users_count",(count)=>{

document.getElementById("users").innerText =
"Online Users: " + count;

});

socket.on("user_joined",(name)=>{

const li = document.createElement("li");

li.style.textAlign = "center";
li.style.background = "#ddd";

li.innerText = name + " joined the chat";

messages.appendChild(li);

});

function toggleDark(){
document.body.classList.toggle("dark");
}
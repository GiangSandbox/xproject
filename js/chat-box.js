
//firebase
var firebaseConfig = {
    apiKey: "AIzaSyDg4DQR6djcfqH5aRUdhtt4PbkVJGx2Dsk",
    authDomain: "xproject-f26ed.firebaseapp.com",
    databaseURL: "https://xproject-f26ed-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xproject-f26ed",
    storageBucket: "xproject-f26ed.appspot.com",
    messagingSenderId: "203552701124",
    appId: "1:203552701124:web:9569b7db3a15a307f1e791"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();


var notiSound = new Audio("noti-sound.mp3");

// get user's data
const username = prompt("Please Tell Us Your Name");

//on/of chat box
var chatCircle = document.getElementById("chat-circle");
var chatBox = document.getElementById("chat-box");
var chatBoxToggle = document.getElementById("chat-box-toggle");
//---
var messageForm = document.getElementById("message-form");
var messages =  document.getElementById("messages");


chatCircle.onclick= function(event){
  chatCircle.style.display = "none";
  chatBox.style.display = "block";
  event.stopPropagation();
  //  var user = firebase.auth().currentUser;
  //  if (user == 'undefined' || user == null){

  //    alert("undefined - not logged in user");
  // }
  // //check user logged in & get username?
  //  -->show Login form if not

}

chatBoxToggle.onclick = function(){
  chatCircle.style.display = "block";
  chatBox.style.display = "none";
}


messageForm.addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("chat-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  messages.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  notiSound.play();
  console.log(message);
  // create db collection and send in the data
  db.ref("xproject/" + timestamp).set({
    username,
    message,
  });

}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("xproject/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
  
});






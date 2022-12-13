// Global Variables

const emotesList = [
  { id: "like", src: "./icons/heart.svg" },
  { id: "understand", src: "./icons/tick.svg" },
  { id: "slow down", src: "./icons/snail.svg" },
  { id: "question", src: "./icons/question.svg" },
  { id: "castled", src: "./icons/castle.svg" },
];
const emoteSize = 42;
const showToolTip = false; // To show or not to show the tool tip 
const limitReactions = true; // To limit the reactions per duration or not
const reactionsLimitDuration = 1; // Duration in seconds

// Connect to Socket Server
const ROOM = "room_001";
const ENDPOINT = "https://flying-emotes-webserver-pus.herokuapp.com/";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

var allowClick = true;

const socket = io(ENDPOINT, connectionOptions);
socket.emit("join", { room: ROOM });

// Create Flying Emote Function
const flyingEmotesContainer = document.querySelector(".emotes-container");
socket.on("show-reaction", ({ emote }) => {
  const xPosition =
    Math.random() * (flyingEmotesContainer.clientWidth - 120) + 40;

  const newFlyingEmote = document.createElement("div");
  newFlyingEmote.classList.add("flying-emote");
  newFlyingEmote.style.bottom = `${-emoteSize}px`;

  const emoteBox = document.createElement("img");
  emoteBox.classList.add("box");
  emoteBox.src = emotesList.find((e) => e.id === emote).src;
  emoteBox.height = emoteSize;
  emoteBox.width = emoteSize;
  emoteBox.style.left = `${xPosition}px`;
  newFlyingEmote.appendChild(emoteBox);
  flyingEmotesContainer.appendChild(newFlyingEmote);

  //   Y-axis motion
  anime({
    targets: newFlyingEmote,
    opacity: [1, 0],
    translateY: -flyingEmotesContainer.clientHeight * 1.0,
    duration: Math.random() * 500 + 2000,
    easing: "easeInQuad",
  });

  //   X-axis motion
  const xAmplitude = Math.random() * 80 - 40;
  anime({
    targets: emoteBox,
    translateX: [-xAmplitude, xAmplitude],
    duration: 900,
    loop: true,
    direction: "alternate",
    easing: "easeInOutSine",
  });

  setTimeout(() => {
    flyingEmotesContainer.removeChild(newFlyingEmote);
  }, 3000);
  console.log(emote);
});

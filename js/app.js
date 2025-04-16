import { Storage } from "./storage.js";

// app.js

// === DOM Elements ===
const currentUserEl = document.getElementById("current-user");
const changeUserBtn = document.getElementById("change-user");

const postForm = document.getElementById("post-form");
const postContent = document.getElementById("post-content");
const visibilitySelect = document.getElementById("visibility");

const addFriendInput = document.getElementById("add-friend-input");
const addFriendBtn = document.getElementById("add-friend-btn");
const friendListEl = document.getElementById("friend-list");

const feedEl = document.getElementById("feed");

// === State ===
let currentUser = Storage.getUser() || prompt("Enter your username:");
Storage.saveUser(currentUser);
updateUsernameDisplay();

let friends = Storage.getFriends();
let posts = Storage.getPosts();

// === Setup ===
renderFriends();
renderFeed();

// === Event Listeners ===
changeUserBtn.addEventListener("click", () => {
  const name = prompt("Enter new username:");
  if (name) {
    currentUser = name;
    Storage.saveUser(name);
    updateUsernameDisplay();
    renderFeed(); // filter feed again
  }
});

postForm.addEventListener("submit", e => {
  e.preventDefault();

  const content = postContent.value.trim();
  const visibility = visibilitySelect.value;

  if (!content) return;

  const newPost = {
    id: Date.now(),
    author: currentUser,
    content,
    visibility,
    timestamp: new Date().toISOString()
  };

  posts.unshift(newPost);
  Storage.savePosts(posts);
  postContent.value = "";
  renderFeed();
});

addFriendBtn.addEventListener("click", () => {
  const name = addFriendInput.value.trim();
  if (name && !friends.includes(name) && name !== currentUser) {
    friends.push(name);
    Storage.saveFriends(friends);
    addFriendInput.value = "";
    renderFriends();
    renderFeed(); // so you see friend-only posts
  }
});

// === Functions ===

function updateUsernameDisplay() {
  currentUserEl.textContent = currentUser;
}

function renderFriends() {
  friendListEl.innerHTML = "";
  friends.forEach(friend => {
    const li = document.createElement("li");
    li.textContent = friend;
    friendListEl.appendChild(li);
  });
}

function renderFeed() {
  feedEl.innerHTML = "";

  const visiblePosts = posts.filter(post => {
    if (post.visibility === "public") return true;
    if (post.visibility === "private" && post.author === currentUser) return true;
    if (post.visibility === "friends" && (post.author === currentUser || friends.includes(post.author))) return true;
    return false;
  });

  visiblePosts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    const meta = document.createElement("div");
    meta.classList.add("meta");
    const date = new Date(post.timestamp).toLocaleString();
    meta.textContent = `${post.author} • ${post.visibility.toUpperCase()} • ${date}`;

    const content = document.createElement("p");
    content.textContent = post.content;

    div.appendChild(meta);
    div.appendChild(content);
    feedEl.appendChild(div);
  });
}
// storage.js — CirclePost local data manager

const USER_KEY = "circlepost-current-user";
const FRIENDS_KEY = "circlepost-friends";
const POSTS_KEY = "circlepost-posts";

export const Storage = {
  getUser() {
    return localStorage.getItem(USER_KEY);
  },

  saveUser(name) {
    localStorage.setItem(USER_KEY, name);
  },

  getFriends() {
    return JSON.parse(localStorage.getItem(FRIENDS_KEY)) || [];
  },

  saveFriends(friends) {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  },

  getPosts() {
    return JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
  },

  savePosts(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  clearAll() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(FRIENDS_KEY);
    localStorage.removeItem(POSTS_KEY);
  }
};
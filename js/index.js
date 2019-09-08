/*
  This game works off a timer based action system:
    1. an action is chosen by the player
    2. the time of completion is saved
    3. the action name and results (in array data format) are saved
    4. when the completion date is reached, the action results data is processed, and the player is free again


    This file is organized as follows:
    BASIC GAME VARIABLES
      self explanatory
    PLAYER DATA VARIABLES
      vars which are saved and loaded, keeping the game state.
      they are: app, farm, goods, tools, skills
    BASIC GAME FUNCTIONS
      core functions in the game, and helper functions.
      they are: 
        getDate - returns the current date, including day month year.
        save - occurs when the main menu is activated. 
          !important: its assumed that this happens after any action is initialized. 
                      without this, an action may not be recorded
        load - occurs at initialization
        getDuration - returns html for how long something takes, in days hrs mins sec
        updateTimeDisplay - maintains html for the time display in the top right corner, when an action is active
        completeAction - checks for actions that complete, and carries out their results
    MAIN GAME MENU
    INITIALIZE GAME

    each button in the main game menu 
*/


// BASIC GAME VARIABLES //
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const data = {};//this.load() || {}; // comment out load to always start new game
const isNewGame = data.app ? 'no' : 'yes'; 
const results = {}; // holds result-of-action functions
const timeDisplay = document.getElementById('timeDisplay');

// PLAYER DATA VARIABLES //
let app = data.app || {
  name: 'JP', //prompt('What is your name, homesteader?')
  farmName: "Field's Farmstead",  //prompt('What is the name of your farm, '+this.name+"?"),
  currentAction: undefined,
  completeTime: undefined,
  completeFunction: undefined,
  completeParams: undefined,
  speed: 0.0001 // speeds up all actions, == 1 for normal gameplay
}

let farm = data.farm || {
  pantry: []
}

let goods = data.goods || {
  cash: 100,
  lumber: 0,
  hay: 0
}

let tools = data.tools || {
  lumber: ["Axe"],
  tillage: ["Hoe"],
  mowing: ["Very Dull Scythe"],
  harvesting: ["Basket"],
  broken: []
}

let skills = data.skills || {
  lumberjack: 100,
  forager: 100,
  scyther: 100,
  gardener: 100,
  rancher: 100,
  carpenter: 100,
  toolkeeper: 100,
  mechanic: 100,
  arborist: 100,
  marketer: 100,
  cook: 100
}

// BASIC GAME FUNCTIONS //
function getDate(dateInMS){
  const date = dateInMS ? new Date(dateInMS) : new Date();
  return date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}

function save(){
  const data = {
    app: app,
    goods: goods,
    tools: tools,
    skills: skills
  }
  localStorage.setItem('Homesteader', JSON.stringify(data));
}

function load(){
  let data = localStorage.getItem('Homesteader');
  if (data) {
    return JSON.parse(data);
  }
}

function getDuration(ms){
  let html = "";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  ms %= (1000 * 60 * 60 * 24);
  if (days) { html += days + " days " }
  const hours = Math.floor(ms / (1000 * 60 * 60))
  ms %= (1000 * 60 * 60);
  if (hours) { html += hours + " hrs " }
  const minutes = Math.floor(ms / (1000 * 60));
  ms %= (1000 * 60);
  if (minutes) { html += minutes + " min " }
  const seconds = Math.floor(ms / 1000);
  ms %= (1000);
  if (seconds) { html += seconds + " sec" }
  return html;
}

function updateTimeDisplay(){
  if (!app.currentAction) {
    timeDisplay.innerHTML = "";
    return;
  }
  const doneIn = app.completeTime - Date.now();
  const html = getDuration(doneIn);

  timeDisplay.innerHTML = "<span style='color: steelblue;'>"+app.currentAction + "</span> - " + html;
}

function completeAction(){
  if (app.currentAction && app.completeTime <= Date.now()) {    
    results[app.completeFunction](app.completeParams);
    app.currentAction = undefined;
    app.completeTime = undefined;
    timeDisplay.innerHTML = "";
  }
  save();
}

// MAIN GAME MENU //
function mainMenu(isNewGame){
  if (isNewGame == 'yes'){
    print("Welcome, "+app.name+", to 'The Homesteader'! In this game, you will build your own digital homestead. Click the buttons below to start.", 'steelblue');
    print('===========================', 'steelblue');
  } else if (isNewGame == 'no'){
    print("Welcome back, "+app.name+" of "+app.farmName, 'steelblue');
    print('===========================', 'steelblue');
  }
  save();
  completeAction()
  if (!app.currentAction) {
    print("You are currently not working. It is now " + getDate())
  } else {
    print("You are currently " + app.currentAction + ". It is now " + getDate())
  }
  showButtons([
    [app.farmName, () => { myFarm() }],
    ["Forest", () => { forest() }],
    ["Garden"],
    ["Orchard"],
    ["Pastures", ()=>{ pastures() }],
    ["Town"]
  ]);
}

// INITIALIZE GAME //
mainMenu(isNewGame);
updateTimeDisplay();
setInterval(function () {
  completeAction()
  updateTimeDisplay()
}, 1000);
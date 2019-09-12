/*
--------------
  This game works off a timer based action system:
    1. an action is chosen by the player
    2. the time of completion is saved
    3. the action name and results (in array data format) are saved
    4. when the completion date is reached, the action results data is processed, and the player is free again

--------------
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
        XXX-updateTimeDisplay - maintains html for the time display in the top right corner, when an action is active
        completeAction - checks for actions that complete, and carries out their results
    STATUS BAR
    MAIN GAME MENU
    INITIALIZE GAME


--------------
    each button in the main game menu leads to an area of activity. these are:
     - The Farm
          > view your stats, use farm buildings like workshop
     - Forest
          > cut wood, forage, run pigs/goats?
     - Garden
          > grow herbacious plants
          > run animals
     - Orchard  
          > grow trees, run animals
     - Pastures
          > mow, run animals, dig a pond?
     - Town
          > visit stores, the hatchery, the library, etc

--------------
    The layout is like this:
      status-bar
      text | img
      buttons

      *the status bar shows money, action timer, current time, etc.
      *the img is a photo of the scene or action. eventually, 
       i should use all photos from my farm

--------------
    photos needed:
    farm front
    toolshed
    lumber/hay pile
    pantry
    workshop
    skilled farmer farming
    garden
    forest
    orchard
    pasture
    community center
    library
    farm supply
    hatchery
    farm auction

*/


// BASIC GAME VARIABLES //
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const data = {};//this.load() || {}; // comment out load to always start new game
const isNewGame = data.app ? 'no' : 'yes'; 
const results = {}; // holds result-of-action functions
let currentDate = new Date();

// PLAYER DATA VARIABLES //
let app = data.app || {
  name: 'JP', //prompt('What is your name, homesteader?')
  farmName: "Field's Farmstead",  //prompt('What is the name of your farm, '+this.name+"?"),
  currentAction: undefined,
  completeTime: undefined,
  completeFunction: undefined,
  completeParams: undefined,
  speed: 1 // speeds up all actions, == 1 for normal gameplay
}

let farm = data.farm || {
  pantry: []
}

let goods = data.goods || {
  money: 10000,
  lumber: 0,
  hay: 0,
  gas: 10
}

let tools = data.tools || {
  lumber: [],
  tillage: ["Hoe"],
  mowing: ["Very Dull Scythe"],
  harvesting: ["Basket"],
  broken: ["Broken Axe"]
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
function getMins(min){
  return (min+"").length == 2 ? min : '0'+min;
}

function getDate(dateInMS){
  const date = dateInMS ? new Date(dateInMS) : currentDate;
  return date.getHours() + ":" + getMins(date.getMinutes()) + ", " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
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

function completeAction(){
  if (app.currentAction && app.completeTime <= Date.now()) {    
    results[app.completeFunction](app.completeParams);
    app.currentAction = undefined;
    app.completeTime = undefined;
    timeDisplay.innerHTML = "";
  }
  save();
}

// STATUS BAR //

const moneyStatus = document.getElementById('money');
const woodStatus = document.getElementById('wood');
const hayStatus = document.getElementById('hay');
const gasStatus = document.getElementById('gas');
const clockStatus = document.getElementById('clock');
const actionStatus = document.getElementById('action');

function updateMoney(n){
  goods.money += n || 0;
  moneyStatus.innerHTML = goods.money + " <img src='images/coins.png' class='icon' />";
}
function updateWood(n) {
  goods.lumber += n || 0;
  woodStatus.innerHTML = goods.lumber + " <img src='images/logs.png' class='icon' />";
 }
function updateHay(n) {
  goods.hay += n || 0;
  hayStatus.innerHTML = goods.hay + " <img src='images/hay.png' class='icon' />";
}
function updateGas(n) {
  goods.gas += n || 0;
  gasStatus.innerHTML = goods.gas + " <img src='images/gas.png' class='icon' />";
}
// function updateClock() {
//   clockStatus.innerHTML = getDate();
// }
function updateAction() {
  if (!app.currentAction) {
    actionStatus.innerHTML = "";
    return;
  }
  const doneIn = app.completeTime - Date.now();
  const html = getDuration(doneIn);

  actionStatus.innerHTML = app.currentAction + " - " + html;
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
    print("What should we do now, farmer "+app.name+"?")
  } else {
    print("You are currently " + app.currentAction + ", farmer "+app.name+".")
  }
  showButtons([
    [app.farmName, () => { myFarm() }],
    ["Forest", () => { forest() }],
    ["Garden"],
    ["Orchard"],
    ["Pastures", ()=>{ pastures() }],
    ["Town", ()=>{ town() }]
  ]);
}

// INITIALIZE GAME //
mainMenu(isNewGame);
updateAction();
// updateClock();
updateHay();
updateGas();
updateWood();
updateMoney();
setInterval(function () {
  currentDate = new Date();
  completeAction()
  updateAction()
  // updateClock();
}, 1000);
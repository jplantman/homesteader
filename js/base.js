// code for a generic text-based game
var selectInput = document.getElementById("selectInput"),
    buttons = {},
    textInput = document.getElementById("textInput"),
    textArea = document.getElementById('textArea');

buttons.button0 = document.getElementById("button0");
buttons.button1 = document.getElementById("button1");
buttons.button2 = document.getElementById("button2");
buttons.button3 = document.getElementById("button3");
buttons.button4 = document.getElementById("button4");

buttons.button5 = document.getElementById("button5");
buttons.button6 = document.getElementById("button6");
buttons.button7 = document.getElementById("button7");
buttons.button8 = document.getElementById("button8");
buttons.button9 = document.getElementById("button9");


var print = function (text, color) {
  textArea.innerHTML += ("<span style='color:" + (color || ";'") + "'>" + text + "<br />");
  textArea.scrollTop = textArea.scrollHeight;
}


// adds a tiny delay to player's actions, to prevent weird glitches
var functionBlocked = false;
function functionDelayer(callback) {
  if (!functionBlocked) {
    functionBlocked = true;

    if (callback && typeof callback == 'function') {
      callback();
    } else {
      // disabled (no function passed with this button)
      print('Disabled', 'red')
    }
    setTimeout(function () {
      functionBlocked = false;
    }, 300);
  }
}

function showButtons(buttonOptions=[]) {
  // buttonOptions is an array of these: [ 'name string', onclickFunc ] 
  var i;
  var num = 10; // num == number of option buttons
  for (i = 0; i < num; i++) {
    (function (i) {
      var btn = buttonOptions[i];
      if (btn) {
        // if (i == 0) { options.enterKey = btn[1]; } // enter key triggers button0
        buttons['button' + i].innerHTML = btn[0];
        buttons['button' + i].style.display = 'inline-block';
        buttons['button' + i].onclick = function () {
          functionDelayer(btn[1]);
        }
      } else {
        buttons['button' + i].style.display = 'none';
      }
    })(i);
  }
}

function showOptions(options) { 
  // options is an array of strings 
  var i, len = options.length;
  selectInput.innerHTML = '';

  // create option elements
  var df = document.createDocumentFragment();

  for (i = 0; i < len; i++) {
    (function (i) {
      var data = options[i],
        elem = document.createElement('option');
      elem.value = data;
      elem.innerHTML = data;
      df.appendChild(elem);
    })(i);
  }

  selectInput.appendChild(df);
  selectInput.style.display = "block";
}
function hideOptions() {
  selectInput.innerHTML = '';
  selectInput.style.display = "none";
}

// Dot Dot Dot Text Output
function printnDots(text, color, ms, callback) {
  textArea.innerHTML += ("<span style='color:" + (color || ";'") + "'>" + text);
  textArea.scrollTop = textArea.scrollHeight;

  setTimeout(function () {
    textArea.innerHTML += '.';
  }, ms * 1 / 4);
  setTimeout(function () {
    textArea.innerHTML += '.';
  }, ms * 2 / 4);
  setTimeout(function () {
    textArea.innerHTML += '.<br/>';
  }, ms * 3 / 4);
  setTimeout(function () {
    callback();
  }, ms);
}

// var test = function(){
//   showButtons([
//     ["Click 1", function(){
//       print("click 1")
//     }],
//     ["Click 2", function(){
//       showButtons();
//       printnDots('woooo', 'red', 2000, function(){
//         test();
//       })
//     }],
//     ["Click 3", function(){
//       showOptions(["Hair", "Ear", "Nose"]);
//     }]
//   ]);
// }
// test();
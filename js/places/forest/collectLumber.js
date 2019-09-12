function collectLumber() {
  if (!app.currentAction) {
    if (tools.lumber.length == 0) {
      print("You don't have any woodcutting tools!", "red");
      return;
    }
    print("Which tool do you want to use?");
    let buttons = tools.lumber.map((tool) => {
      return [tool, () => {
        const data = lumberToolsInfo(tool);
        data.func();
        showButtons([
          ["Use " + tool +" ("+data.timeLabel+")", () => {
            app.currentAction = "Woodcutting";
            app.completeTime = Date.now() + data.time*app.speed;
            app.completeFunction = "collectLumber";
            app.completeParams = { tool: tool };
            mainMenu();
          }],
          ["Never Mind", () => { forest() }]
        ]);
      }];
    });
    buttons.push(["Never Mind", () => { forest() }])
    showButtons(buttons);

  } else {
    print("You are already busy " + app.currentAction + "!", 'red');
  }
}

function lumberToolsInfo(tool) {
  if (tool == 'Axe') {
    return {
      time: 3 * 60 * 60 * 1000, timeLabel: "3 hours", func: () => {
      print("A steel axe is good for chopping wood, but very hard work.");
    }}
  }
  else if (tool == 'Small Chainsaw') {
    return {
      time: 3 * 60 * 60 * 1000, timeLabel: "3 hours", func: () => {
        print("A chainsaw really helps, even if it's a small one. Uses 1 ounce of gas.");
      }
    }
  }
}

results.collectLumber = (obj) => {
  skills.lumberjack += 1;
  let collected = 3;
  // AXE
  if (obj.tool == "Axe") {
    const chance = Math.random();
    if (chance >= 0.1) {
      collected = 10;
    }
    else {
      print("Your axe broke while woodcutting!", "red");
      tools.lumber.splice(tools.lumber.indexOf('Axe'), 1);
      tools.broken.push("Broken Axe");
    }
  }

  // SMALL CHSINSAW
  if (obj.tool == "Small Chainsaw" && goods.gas >= 1) {
    updateGas(-1);
    collected = 15;
    const chance = Math.random();
    let dull = "";
    if (chance >= 0.9) {
      dull = "Your chainsaw is getting dull.";
    }
    else {
      print("Your axe broke while woodcutting!", "red");
      tools.lumber.splice(tools.lumber.indexOf('Axe'), 1);
      tools.broken.push("Broken Axe");
    }
  }

  updateWood( Math.floor(collected * skills.lumberjack / 100) );
  print("You collected " + collected + " lumber. Total: " + goods.lumber);
}
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
  // CHEAP CHAINSAW
  // SMALL CHAINSAW
  // LARGE CHAINSAW

  goods.lumber += Math.floor(collected * skills.lumberjack / 100);
  print("You collected " + collected + " lumber. Total: " + goods.lumber);
}
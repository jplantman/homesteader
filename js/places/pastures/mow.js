
function mow() {
  if (!app.currentAction) {
    if (tools.mowing.length == 0) {
      print("You don't have any mowing tools!", "red");
      return;
    }
    print("Which tool do you want to use?");
    let buttons = tools.mowing.map((tool) => {
      return [tool, () => {
        const data = mowingToolsInfo(tool);
        data.func();
        showButtons([
          ["Use " + tool + " (" + data.timeLabel + ")", () => {
            app.currentAction = "Mowing Pasture";
            app.completeTime = Date.now() + data.time*app.speed;
            app.completeFunction = "finishMowing";
            app.completeParams = { tool: tool };
            mainMenu();
          }],
          ["Never Mind", () => { pastures() }]
        ]);
      }];
    });
    buttons.push(["Never Mind", () => { pastures() }])
    showButtons(buttons);

  } else {
    print("You are already busy " + app.currentAction + "!", 'red');
  }
}

function mowingToolsInfo(tool) {
  if (tool == 'Scythe') {
    return {
      time: 1 * 60 * 60 * 1000, timeLabel: "1 hour", func: () => {
        print("A scythe is an excellent tool for collecting hay. Keep it sharp!");
      }
    }
  }
  else if (tool == 'Dull Scythe') {
    return {
      time: 1.333 * 60 * 60 * 1000, timeLabel: "1 hour, 20 minutes", func: () => {
        print("It might be worth sharpening this tool.");
      }
    }
  }
  else if (tool == 'Very Dull Scythe') {
    return {
      time: 1.667 * 60 * 60 * 1000, timeLabel: "1 hour, 40 minutes", func: () => {
        print("You should really sharpen this tool before using it.");
      }
    }
  }
}

results.finishMowing = (obj) => {
  
  // Scythe
  if (obj.tool == "Scythe") {
    skills.scyther += 1;
    let collected = 10;
    let dull = "";
    if (Math.random() <= 0.3) {
      dull = "Your scythe gets duller. ";
      tools.mowing[tools.mowing.indexOf('Scythe')] = "Dull Scythe";
      collected -= 2;
    }
    goods.hay += Math.floor(collected);
    print("You collected " + collected + " hay. Total: " + goods.hay+". "+dull);
  }
  else if (obj.tool == "Dull Scythe") {
    let collected = 7;
    let dull = "";
    if (Math.random() <= 0.3) {
      dull = "Your scythe gets even duller";
      tools.mowing[tools.mowing.indexOf('Dull Scythe')] = "Very Dull Scythe";
      collected -= 2;
    }
    goods.hay += Math.floor(collected);
    print("You collected " + collected + " hay. Total: " + goods.hay + ". "+dull);
  }
  else if (obj.tool == "Very Dull Scythe") {
    skills.scyther += 1;
    skills.scyther += 1;
    let collected = 4;
    let breaks = "";
    if (Math.random() <= 0.3) {
      breaks = "Your scythe breaks!";
      tools.mowing.splice(tools.mowing.indexOf('Very Dull Scythe'), 1);
      tools.broken.push("Broken Scythe");
      collected -= 2;
    }
    goods.hay += Math.floor(collected);
    print("You collected " + collected + " hay. Total: " + goods.hay + ". "+breaks);
  }

  
}
function workshop(){
  showButtons([
    ["Sharpen Tools", ()=>{ sharpenTools() }],
    ["Repair Tools"],
    ["Back", ()=>{ mainMenu() }]
  ]);
}

function sharpenTools(){
  const buttons = [];
  for (const category in tools) {
    if (tools.hasOwnProperty(category)) {
      const toolsArray = tools[category];
      toolsArray.forEach((tool, i) => {
        if (tool.includes('Dull')){
          buttons.push(["Sharpen "+tool, ()=>{ sharpenTool(tool, category, i) }]);
        }
      });
    }
  }
  if ( !buttons.length ){
    print("No dull tools here");
    return;
  }
  buttons.push(["Never Mind", ()=>{ workshop() }]);
  showButtons(buttons);
}

const toolsSharpened = {
  "Dull Scythe": "Scythe",
  "Very Dull Scythe": "Dull Scythe"
}

function sharpenTool(tool, category, i){
  const time = 20*60*1000 * ( 200-skills.toolkeeper  )/100;
  print("Sharpening the "+tool+" should take about "+getDuration(time));
  showButtons([
    ["Sharpen", ()=>{
      app.currentAction = "Sharpening "+tool;
      app.completeTime = Date.now() + time * app.speed;
      app.completeFunction = "sharpenTool";
      app.completeParams = { tool: tool, category: category, i: i };
      mainMenu();
    }],
    ["Never Mind", ()=>{ workshop() }]
  ]);
}

results.sharpenTool = function(obj){
  skills.toolkeeper += 1;
  const sharpenedTool = toolsSharpened[ obj.tool ];
  tools[ obj.category ][ obj.i ] = sharpenedTool;
  print("Your " + obj.tool + " has been sharpened, to a " + sharpenedTool);
}
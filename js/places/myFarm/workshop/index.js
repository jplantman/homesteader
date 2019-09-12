function workshop(){
  showButtons([
    ["Sharpen Tools", ()=>{ sharpenTools() }],
    ["Repair Tools", ()=>{ repairTools() }],
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
  const time = 10*60*1000 * ( 200-skills.toolkeeper  )/100;
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

function repairTools(){
  if ( !tools.broken.length ){
    print('No broken tools here.');
    return;
  }
  const buttons = tools.broken.map((tool, i)=>{
    return ["Fix "+tool, ()=>{
      repairTool(tool, i);
    }];
  } );
  buttons.push(["Never Mind", ()=>{ workshop() }]);
  showButtons(buttons);
}

const toolsRepaired = {
  "Broken Axe": [tools.lumber, 'Axe'],
  "Broken Scythe": [tools.mowing, 'Very Dull Scythe']
}

function repairTool(tool, i) {
  const time = 30 * 60 * 1000 * (200 - skills.toolkeeper) / 100;
  print("Fixing the " + tool + " should take about " + getDuration(time));
  showButtons([
    ["Fix", () => {
      app.currentAction = "Fixing " + tool;
      app.completeTime = Date.now() + time * app.speed;
      app.completeFunction = "repairTool";
      app.completeParams = { tool: tool, i: i };
      mainMenu();
    }],
    ["Never Mind", () => { workshop() }]
  ]);
}

results.repairTool = function(obj){
  tools.broken.splice(obj.i, 1);
  const data = toolsRepaired[obj.tool];
  data[0].push(data[1]);
  print("You fixed your "+data[1]+"!");
}
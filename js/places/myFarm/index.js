function myFarm(){
  showButtons([
    ["Toolshed", () => { checkToolshed() }],
    ["Goods", ()=>{ checkGoods() }],
    ["Pantry", ()=>{ checkPantry() }],
    ["Workshop", ()=>{ workshop(); }],
    ["Skills", ()=>{ checkSkills() }],
    ["Back", mainMenu]
  ]);
}
function checkToolshed(){
  let html = "";
  for (const type in tools) {
    if (tools.hasOwnProperty(type)) {
      const toolset = tools[type];
      if (toolset.length){
        html += "== " + type + " ==<br/>";
      }
      for (let i = 0; i < toolset.length; i++) {
        const tool = toolset[i];
        html += (i+1)+". "+tool+"<br/>";
      }
      
    }
  }
  print(html);
}

function checkGoods(){
  let html = "";
  for (const good in goods) {
    if (goods.hasOwnProperty(good)) {
      const val = goods[good];
      html += good+": "+val+"<br/>";
    }
  }
  print("== Goods ==<br/>"+html);
}

function checkPantry(){
  if (!farm.pantry.length){
    print("Your pantry is empty");
    return;
  }
  let html = "";
  for (const foodItem in farm.pantry) {
    if (farm.pantry.hasOwnProperty(foodItem)) {
      const val = farm.pantry[foodItem];
      html += foodItem + ": " + val + "<br/>";
    }
  }
  print("== Pantry ==<br/>" + html);
}

function checkSkills(){
  let html = "";
  for (const skill in skills) {
    if (skills.hasOwnProperty(skill)) {
      const val = skills[skill];
      html += skill + ": " + val + "<br/>";
    }
  }
  print("== Skills ==<br/>" + html);
}
function town(){
  let text;
  let hour = currentDate.getHours();
    if ( hour < 6 || hour > 22 ){
      text = "quiet, everyone is sleeping.";
    } else if ( hour < 9 ) {
      text = "waking up. A few people are starting to cpme outside.";
    } else if ( hour < 19  ){
      text = "busy with activity.";
    } else {
      text = "quieting down, people are starting to go inside for the night.";
    }
  print("The town is "+text);
  showButtons([
    ["Shops", () => { shops() }],
    ["Library"],
    ["Community Center"],
    ["Back To The Farm", ()=>{ mainMenu() }]
  ]);
}

function shops(){
  showButtons([
    ["Lumber Yard", ()=>{ lumberYard() }],
    ["Gas Station", ()=>{ gasStation() }],
    ["Never Mind", ()=>{ mainMenu() }]
  ]);
}

function gasStation(){
  print("Gas is at $5 a gallon.");
  showButtons([
    ["Buy Gas ($5)", ()=>{ 
      if (goods.money >= 5) {
        updateGas(1);
        updateMoney(-5);
        print("Bought 1 gallon of gas.");
      } else {
        print("Not enough money.", "red");
      }
     }],
    ["Buy 10 Gallons ($50)", () => {
      if (goods.money >= 50) {
        updateGas(10);
        updateMoney(-50);
        print("Bought 10 gallons of gas.");
      } else {
        print("Not enough money.", "red");
      }
    }],
    ["Back", ()=>{ shops() }]
  ]);
}
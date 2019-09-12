function lumberYard(){
  showButtons([
    ["Sell Wood", ()=>{
      print("We buy raw wood for $1 each. Minimum of 10 units.");
      showButtons([
        ["Sell 10", ()=>{
          if (goods.lumber >= 10){
            updateWood(-10);
            updateMoney(10);
            print("Sold 10 wood.");
          } else {
            print("You don't have that much lumber to sell.", "red");
          }
        }],
        ["Sell 100", () => {
          if (goods.lumber >= 100) {
            updateWood(-100);
            updateMoney(100);
            print("Sold 100 wood.");
          } else {
            print("You don't have that much lumber to sell.", "red");
          }
        }],
        ["Done", ()=>{ lumberYard() }]
      ]);
    }],
    ["Buy Wood", ()=>{
      print("We sell raw wood for $3 each. Minimum of 10 units.");
      showButtons([
        ["Buy 10", () => {
          if (goods.money >= 30) {
            updateWood(10);
            updateMoney(-30);
            print("Bought 10 wood.");
          } else {
            print("Not enough money.", "red");
          }
        }],
        ["Buy 100", () => {
          if (goods.money >= 300) {
            updateWood(100);
            updateMoney(-300);
            print("Bought 100 wood.");
          } else {
            print("Not enough money.", "red");
          }
        }],
        ["Done", () => { lumberYard() }]
      ]);
    }],
    ["Tool Shop", ()=>{
      showButtons([
        ["Buy Tools", ()=>{
          print("What are you looking for?");
          showOptions([
            "Axe",
            "Small Chainsaw",
            "Chainsaw",
            "Large Chainsaw"
            // "Gallon Of Gas"
          ]);
          showButtons([
            ["Look At Item", () => {
              let cost, item = selectInput.value;
              switch (item) {
                case "Axe":
                  print("Our hardened-steel axes are ideal for cutting down a few trees. $120");
                  cost = 120;
                  break;
                case "Small Chainsaw":
                  print("This 12 inch saw is ideal for the small-scale forester. $250");
                  cost = 250;
                  break;
                case "Chainsaw":
                  print("This 20 inch saw rips through trees. $500");
                  cost = 500;
                  break;
                case "Large Chainsaw":
                  print("This 32 inch saw can cut incredibly thick tree trunks, very fast. $800");
                  cost = 800;
                  break;
              }
              // print("Buy "+item+" for "+cost+"?");
            }],
            ["Buy it", () => {
              let cost, item = selectInput.value;
              switch (item) {
                case "Axe":
                  cost = 120;
                  break;
                case "Small Chainsaw":
                  cost = 250;
                  break;
                case "Chainsaw":
                  cost = 500;
                  break;
                case "Large Chainsaw":
                  cost = 800;
                  break;
              }
              showButtons([
                ["Buy "+item +" ("+cost+")", ()=>{
                  if ( goods.money >= cost ){
                    updateMoney(-cost);
                    tools.lumber.push(item);
                    print("You now have a "+item+"!");
                  } else {
                    print("Not enough money.", "red");
                  }
                }],
                ["Never Mind", ()=>{ lumberYard() }]
              ]);
              // print("Buy "+item+" for "+cost+"?");
            }],
            ["Never Mind", ()=>{ lumberYard(); hideOptions(); }]
          ]);
        }],
        ["Repair Tools"]
      ]);
    }],
    ["Back To Town", ()=>{ shops() }]
  ]);
}
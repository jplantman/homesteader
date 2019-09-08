function forest() {
  showButtons([
    ["Collect Lumber", () => { collectLumber() }],
    ["Forage", ()=>{ forage() }],
    ["Back", () => { mainMenu() }]
  ]);
}


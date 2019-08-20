'use strict'

let games =[
    {gameName: "Dota 2", type: "Strategy", level: "Pro"},
    {gameName: "Leg Of Leg", type: "Strategy", level: "Entry"},
    {gameName: "Fortnite", type: "Individual", level: "Entry"},

];

exports.getAll = () => {
  return games;
};

exports.get = (gameName) => {
    return games.find((item) => {
        return item.gameName === gameName;
        });
};

exports.delete = (gameName) => {
    const oldLength = games.length;
    games = games.filter((item) => {
        return item.gameName !== gameName;
    });
    return {deleted: oldLength !== games.length, total: games.length};
};

exports.add = (newGame) => {
    const oldLength = games.length;

    let found = this.get(games.gameName);
    if(!found){
        games.push(newGame);
    }
    return {added: oldLength !== games.length, total: games.length};
};

/*let newGame = {"name": "Dota 2", "type": "Pro", "airdate": 1999}
let result = this.add(newGame);
console.log(result);*/
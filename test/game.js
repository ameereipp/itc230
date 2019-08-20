'use strict'
const expect = require("chai").expect;
const game = require("../lib/game");


describe("Game",() => {

    it("returns requested game", function() {
        let result = game.get("dota 2");
        expect(result).to.deep.equal({name: "dota 2", type:"strategy", level:"pro"});
    });

    it("fails to return an w/ invalid game", function() {
        let result = game.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new game", function() {
        let result = game.add({name: "gta", type:"gta", level:"gta"});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing game", function() {
        let result = game.add({name: "Dota 2", type:"Strategy", level:"Pro"});
        expect(result.added).to.be.false;
    });

    it("deletes an existing game", function() {
        let result = game.delete("Leg Of Leg");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid game", function() {
        let result = game.delete("fake game");
        expect(result.deleted).to.be.false;
    });

});

// let games =[
//     {gameName: "Dota 2", type: "Strategy", level: "Pro"},
//     {gameName: "Leg Of Leg", type: "Strategy", level: "Entry"},
//     {gameName: "Fortnite", type: "Individual", level: "Entry"},
//
// ];
'use strict'
const expect = require("chai").expect;
const game = require("../lib/game");


describe("Game",() => {

    it("returns requested game", function() {
        let result = game.get("Dota 2");
        expect(result).to.deep.equal({name: "Dota 2", type:"Strategy", level:"Pro"});
    });

    it("fails to return an w/ invalid game", function() {
        let result = game.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new book", function() {
        let result = game.add({name: "fake Dota 2", type:"fake Strategy", level:"fake Pro"});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing book", function() {
        let result = game.add({name: "Dota 2", type:"Strategy", level:"Pro"});
        expect(result.added).to.be.false;
    });

    it("deletes an existing book", function() {
        let result = game.delete("dune");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid book", function() {
        let result = game.delete("travels with charlie");
        expect(result.deleted).to.be.false;
    });

});
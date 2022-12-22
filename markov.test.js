const markov = require("./markov");

describe("Markov Machine", function() {
    let mm;

    beforeEach( () => {
        mm = new markov.MarkovMachine("the cat in the hat");
    });

    test("makeChains", () => {
        const mmKeys = Object.keys(mm.chains);
        expect(mmKeys).toEqual(["the", "cat", "in", "hat"]);
        expect(mm.chains["the"]).toEqual(["cat", "hat"]);
    });

    test("makeText", () => {
        const mmText = mm.makeText();
        expect(mmText).toContain("hat");
    });
});
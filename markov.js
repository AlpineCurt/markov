/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      if (!(this.words[i] in this.chains)) {
        this.chains[this.words[i]] = [];
      }
      this.chains[this.words[i]].push(this.words[i + 1]);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text = ""
    let prevWord = ""
    let newWord = ""
    
    for (let i = 0; i < numWords; i++) {
      if (i === 0) {
        const keys = Object.keys(this.chains);
        prevWord = keys[Math.floor(keys.length * Math.random())];
        text = prevWord;
      }
      let arr = this.chains[prevWord];
      let randIdx = Math.floor(Math.random() * arr.length);
      newWord = arr[randIdx];
      if (newWord === undefined) {
        return text;
      }
      text += " ";
      text += newWord;
      prevWord = newWord;
    }
    return text;
  }
}

module.exports = {
  MarkovMachine
}
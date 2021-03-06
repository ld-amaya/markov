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
    let wordChain = new Map();

    for (let i = 0; i < this.words.length; i++){
      // Get current word and next word 
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
    
      
      // Check if word is already in map, if not create new map 
      if (wordChain.has(word)) {
        wordChain.get(word).push(nextWord);
      } else {
        wordChain.set(word, [nextWord])
      }
    }
    this.chain = wordChain;
  }

  static choice(pick) {
    return pick[Math.floor(Math.random() * pick.length)]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // select random key 
    let keys = Array.from(this.chain.keys())
    let key = MarkovMachine.choice(keys)
    let words = [];
    while (words.length < numWords && key !== null) {
      words.push(key);
      key = MarkovMachine.choice(this.chain.get(key))
    }
    return (words.join(' '));
  }
}

module.exports = { MarkovMachine };
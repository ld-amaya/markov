/** Command-line tool to generate Markov text. */
const fs = require('fs');
const mv = require('./markov');
const process = require('process');
const axios = require('axios')

// Generate markov and return text generated
function generateText(text) {
    let markov = new mv.MarkovMachine(text);
    console.log(markov.makeText())
}

//Read eggs.txt
function readText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Cannot read file ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    })
}

// Read from url 
async function readURL(path) {
    try {
        let response = await axios.get(path);
        generateText(response.data)
    } catch (err) {
        console.log(`Cannot read ${path} file: ${err}`)
    }
}

let fileType = process.argv[2];
let path = process.argv[3];

if (fileType === 'file') {
    readText(path);
} else if (fileType === 'url') {
    readURL(path)
} else {
    console.log('Invalid file type, select either file or url');
}

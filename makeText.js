/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function file (path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            const mm = new MarkovMachine(data);
            console.log(mm.makeText());
        }
    });
}

async function url (path) {
    try {
        const res = await axios.get(path);
        const mm = new MarkovMachine(res.data);
        console.log(mm.makeText());
    } catch (err) {
        console.error(`Error getting ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[3];

if (process.argv[2] === "file") {
    file(path);
} else if (process.argv[2] === "url") {
    url(path);
} else {
    console.error(`Invalid argument: ${process.argv[2]}`);
    process.exit(1);
}
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

// function readFile(){
//     return new Promise((resolve) => {
//         fs.readFile('a.txt', 'utf-8', function (err, data){
//             resolve(data);
//         });
//     });
// }

// readFile().then((data) => {
//     console.log(data);
// })

async function readFile(){
    fs.readFile('a.txt', 'utf-8', function(err, data){
        console.log(data);
    })
}
readFile();
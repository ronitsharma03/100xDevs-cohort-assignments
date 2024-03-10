const fs = require('fs');

async function writeInFile(){
    await fs.writeFile('a.txt', 'I am Ronits', function(err){
        console.log(err);
    });
}
writeInFile();
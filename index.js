const fs = require('fs');
const csv = require('csv-parser');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

const results = [];

fs.createReadStream('1025.csv')
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
    })
    .on('end', () => {
        write2txt(results);
        write2csv(results);
    });


function write2txt(data) {
    const words = data.map((item) => Object.values(item)[0]);
    fs.writeFile('1025.txt', words.join('\n'), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function write2csv(data) {
    const words = data.map((item) => {
        const [w, _, t] = Object.values(item)
        const foo = t.split(';').join('\n')
        return `${w}\n${foo}\n`
    });
    const docString = words.join('\n');
    var doc = new PDFDocument();          
    doc.font(`${__dirname}/msyh.ttf`)
        .fontSize(12)
        .text(docString);
    doc.pipe(fs.createWriteStream('demo.pdf'));  
    doc.end(); 
}

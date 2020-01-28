const express = require('express');
const pdf = require('html-pdf');
const fs = require('fs');
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req, res) => {
    res.send('hello');
});


app.post('/document/pdf', (req, res) => {
   
    const html = req.body.html;

    // // pdf.create(html, options).toFile("report.pdf", function (err, html) {
    // //     if (err) {
    // //         res.send(err);
    // //     } else {
    // //         res.send("File created successfully");
    // //     }
    // // });


    // pdf.create(html).toStream(function (err, stream) {
    //     stream.pipe(fs.createWriteStream('./foo.pdf'));
    // });
    var options = { format: 'Letter' };
 
    pdf.create(html).toStream(function(err, stream) {
        if (err) {
            console.log(err)
        } else {
            res.set('Content-type', 'application/pdf');
            stream.pipe(res)
        }
    });

});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
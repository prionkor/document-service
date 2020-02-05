const express = require('express');
const pdf = require('html-pdf');
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser());


app.get('/', (req, res) => {
    res.send('hello');
});


app.post('/document/pdf', (req, res) => {
   
    const html = req.body.html;
    var options = { format: 'A4' };


    pdf.create(html, options).toStream(function(err, stream) {
        if (err) {
            res.send(404);
        } else {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=test-file.pdf;');

            stream.pipe(res);

          
        }
    });

});


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
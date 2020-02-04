const express = require('express');
const pdf = require('html-pdf');
const fs = require('fs');
const bodyParser= require('body-parser')
const app = express()
const cors = require('cors');

app.use(bodyParser());

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});


app.post('/document/pdf', (req, res) => {
   
    const html = req.body.html;
    console.log(" fdfdfdferror");
    var options = { format: 'Letter' };
    

    pdf.create(html).toStream(function(err, stream) {
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
require('dotenv').config();

const express = require('express');
const pdf = require('html-pdf');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Updials Document Service.' });
});

app.post('/document/pdf', (req, res) => {
  // TODO: Sanitize incoming html, fileName
  // This is potential security issue

  const { html, fileName } = req.body;
  var options = {
    format: 'A4',
    phantomArgs: ['--local-url-access=false'],
  };

  pdf.create(html, options).toStream(function (err, stream) {
    if (err) {
      res.send(404);
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${fileName}.pdf;`
      );

      stream.pipe(res);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});

const fs = require('fs');

fs.writeFile(
  'date.docx',
  'What have you not done for me ',
  function (err, data) {
    if (err) {
      console.error(err);
    }
    console.log('Hallelujah o ');
  }
);

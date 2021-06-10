const https = require('https');
const fs = require('fs');

https
  .get('https://hashflags.io/hashflags', (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      const json = JSON.parse(data);
      let i = 0;

      if (!fs.existsSync('tests/public/test_files')) {
        fs.mkdirSync('tests/public/test_files');
      }

      Object.keys(json).forEach((key) => {
        // console.log(json[key]);
        if (json[key].isAnimated === true) {
          i += 1;
          const anim = JSON.stringify(json[key].animation);
          if (anim !== undefined) {
            fs.writeFile(`tests/public/test_files/${i}.json`, anim, (err) => {
              if (err) {
                throw err;
              }
              // eslint-disable-next-line
              console.log('JSON data is saved.');
            });
          }
        }
      });
    });
  })
  .on('error', (err) => {
    // eslint-disable-next-line
    console.log('Error: ' + err.message);
  });

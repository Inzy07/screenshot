const express = require('express'),
    app = express(),
    puppeteer = require('puppeteer'),
    selector = '.ceo',
    fileName = 'MyPost.png',
    fileType = 'image/jpg',
    cors = require('cors'),
    fs = require('fs');
app.use(cors({
  origin: 'https://fam-erp.com'
}));
app.get("/", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      headless:true
    });
    const page = await browser.newPage();
    await page.goto(request.query.url); // Read url query parameter.
    await page.setViewport({ 
      width: 2880, // default: 800
      height: 1800, // default: 600 
      deviceScaleFactor: 2 // default: 1
    });
    await page.waitForSelector(request.query.sel);
    const element = await page.$(request.query.sel);
    const image = await element.screenshot(
      {path: 'areaPost.jpg', type: 'jpeg', quality: 100 }
    );
    await browser.close();
    response.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': fileType,
      })
    const download = Buffer.from(image, 'base64')
    response.end(download);
  } catch (error) {
    console.log(error);
  }
});

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




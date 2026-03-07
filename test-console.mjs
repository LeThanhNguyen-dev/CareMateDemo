import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log(`BROWSER CONSOLE LOG: ${msg.text()}`);
    });

    page.on('pageerror', error => {
        console.log(`BROWSER CONSOLE ERROR: ${error.message}`);
    });

    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    } catch (err) {
        console.log(`GOTO ERROR: ${err}`);
    }

    await browser.close();
})();

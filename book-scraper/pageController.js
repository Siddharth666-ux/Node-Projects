const fse = require("fs-extra");
const pageScraper = require("./pageScraper");
const fs = require("fs");

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    let scrapedData = {};
    // Call the scraper for different set of books to be scraped
    scrapedData["Travel"] = await pageScraper.scraper(browser, "Travel");
    scrapedData["HistoricalFiction"] = await pageScraper.scraper(
      browser,
      "Historical Fiction"
    );
    scrapedData["Mystery"] = await pageScraper.scraper(browser, "Mystery");
    await browser.close();
    console.log(scrapedData);
    await pageScraper.scraper(browser);
    await fse.writeJSON("data.json", scrapedData);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);

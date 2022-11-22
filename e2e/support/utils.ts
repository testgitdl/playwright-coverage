import { BeforeAll, AfterAll, After, setDefaultTimeout, Status, Before } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { Browser, Page, BrowserContext, webkit } from "playwright";
import { mkdir, existsSync } from 'fs';
import PuppeteerToIstanbul from 'puppeteer-to-istanbul';
export let browser: Browser;
export let page: Page;
export let context: BrowserContext;
export const BASE_URL_CHROME = 'http://localhost:4200';
export let consoleLogs: string[] = [];
export let browserName: string;

setDefaultTimeout(120000);

const dir = './testResults';
if (!existsSync(dir)) {
  mkdir(dir, { recursive: true }, (err: any) => {
    if (err) throw err;
  });
}

const configChrome = {
  slowMo: 0,
  headless: false
};

const configEdge = {
  slowMo: 0,
  headless: false
};

// launch the browser
BeforeAll(async function () {
  browser = await chromium.launch(configChrome);
});

Before(async function () {
  consoleLogs = [];
  context = await browser.newContext();
  page = await context.newPage();
  // await Promise.all([
  //   page.coverage.startJSCoverage(),
  //   page.coverage.startCSSCoverage()
  // ]);
  await page.setViewportSize({ width: 1920, height: 1080 });
});

// close the browser
AfterAll(async function () {
  // const [jsCoverage, cssCoverage] = await Promise.all([
  //   page.coverage.stopJSCoverage(),
  //   page.coverage.stopCSSCoverage(),
  // ]);

  // console.log(jsCoverage);
  // await PuppeteerToIstanbul.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' });
  await page.close();
  await context.close();
  await browser.close();
});


After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const scenarioName = scenario.pickle.name.replace(/ /g, '');
    const buffer = await page.screenshot({ path: `testResults/bdd/screenshots/${scenarioName}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
});

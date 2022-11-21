import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { BASE_URL_CHROME, page } from '@support/bdd';

When('I start the application', async () => {
  await page.goto(BASE_URL_CHROME);
});


Then('I see it has a title', async () => {
  console.log('xxxxxxxxxxxxxx');
  expect(await page.locator('body > app-root > div.content > div.card.highlight-card.card-small > span').textContent()).equals('playwright-coverage app is running!');
});


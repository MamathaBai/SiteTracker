/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { CommonUtils } from '../utils/CommonUtils';
import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('Go to the sitetracker website', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
});

When('User enters username as {string}', async function (this: ICustomWorld, userName: string) {
  const page = this.page!;
  await page.getByLabel('Username').fill(userName);
});

When('User enters password as {string}', async function (this: ICustomWorld, password: string) {
  const page = this.page!;
  await page.getByLabel('Password').fill(password);
});

When('User click on Log In button', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Log In' }).click();
});

When('User selects the My Leads view', { timeout: 90000 }, async function (this: ICustomWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Leads List' }).waitFor();
  await page.getByRole('button', { name: 'Leads List' }).click();
  if (!(await page.getByRole('menuitem', { name: 'My Leads' }).isVisible()))
    await page.getByRole('button', { name: 'Leads List' }).click();
  await page.getByRole('menuitem', { name: 'My Leads' }).click();
});

When('User navigates to leads menu', { timeout: 90000 }, async function (this: ICustomWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'App Launcher' }).click();
  await page.getByPlaceholder('Search apps and items...').fill('Leads');
  await page.getByRole('option', { name: 'Leads' }).click();
});

Then('the filter count is {string}', async function (this: ICustomWorld, count: string) {
  const page = this.page!;
  const filterRecords = await page.locator('.countSortedByFilteredBy').textContent();
  expect(filterRecords?.startsWith(count)).toBeTruthy();
});

Then('User verify the success msg pop up displayed', async function (this: ICustomWorld) {
  const page = this.page!;
  expect(await page.locator('.toastMessage').textContent()).toEqual('List view updated.');
  await page.locator('.toastMessage').waitFor({ state: 'detached' });
});

When('User save filter', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Save' }).click();
});

When(
  'User selects the custom date range {string} {string}',
  async function (this: ICustomWorld, operator: string, fromDate: string) {
    const page = this.page!;
    await page.getByRole('button', { name: 'Remove All' }).click();
    if (await page.getByRole('button', { name: 'Save' }).isVisible())
      await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Add Filter' }).click();
    await page.getByRole('combobox', { name: 'Field' }).click();
    await page.getByRole('option', { name: 'Created Date' }).locator('span').nth(1).click();
    await page.getByRole('combobox', { name: 'Operator' }).click();
    await page.getByText(operator).click();
    await page.getByLabel('Value').click();
    await page.getByLabel('Value').fill(fromDate);
    await page.getByRole('button', { name: 'Done' }).click();
  },
);

When('User click on filter icon', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Show filters' }).click();
});

Then(
  'User creates below tasks and verify confirmation message',
  { timeout: 90000 },
  async function (this: ICustomWorld, table: DataTable) {
    const page = this.page!;
    const tasks = table.hashes();
    for (let i = 0; i < tasks.length; i++) {
      await page.getByLabel('New Task').click();
      await page.getByLabel('Subject').fill(tasks[i].Subject);
      await page.getByLabel('Due Date').click();
      if (tasks[i].DueDate === 'Today') await page.locator('.slds-is-today').click();
      else if (tasks[i].DueDate === 'After 1 week') {
        const dateToSelect = CommonUtils.formatDateWithDaysAdded(new Date(), 8);
        await page.locator(`[data-value="${dateToSelect}"]`).click();
      }
      await page.locator('a.select').click();
      await page.getByRole('option', { name: tasks[i].Status }).click();
      await page.getByRole('button', { name: 'Save' }).click();
      expect(await page.locator('.toastMessage').textContent()).toEqual(
        `Task "${tasks[i].Subject}" was created.`,
      );
    }
  },
);

When('User navigate to activity tab', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.getByRole('tab', { name: 'Activity' }).click();
});

When(
  'User search for {string} and navigate to profile',
  async function (this: ICustomWorld, user: string) {
    const page = this.page!;
    await page.getByPlaceholder('Search this list...').fill(user);
    await page.getByPlaceholder('Search this list...').press('Enter');
    await page.getByRole('link', { name: user }).click();
  },
);

Then(
  'User verify the description is {string}',
  async function (this: ICustomWorld, description: string) {
    const page = this.page!;
    expect(await page.locator('div.slds-item--detail').textContent()).toBe(description);
  },
);

When('User expands the {string} tasks', async function (this: ICustomWorld, task: string) {
  const page = this.page!;
  await page
    .locator(
      `//a[text()='${task}']/ancestor::div[contains(@class,'timelineItem')]/preceding-sibling::div/div[contains(@class,'showMore ')]`,
    )
    .first()
    .waitFor();
  await page
    .locator(
      `//a[text()='${task}']/ancestor::div[contains(@class,'timelineItem')]/preceding-sibling::div/div[contains(@class,'showMore ')]`,
    )
    .first()
    .click();
});

When('User adds the comment as {string}', async function (this: ICustomWorld, comment: string) {
  const page = this.page!;
  await page.locator('textarea[aria-describedby="quickTextKeyboardTip"]').fill(comment);
  await page.locator('button.cuf-publisherShareButton').click();
});

When('User selects Edit Comments from the dropdown', async function (this: ICustomWorld) {
  const page = this.page!;
  await page
    .locator(
      `//a[text()='Create Budget Plan']/ancestor::div[contains(@class,'slds-truncate')]/following-sibling::div//span[contains(@class,'slds-icon-utility-down')]/..`,
    )
    .first()
    .click();
  await page.locator('div.visible  a>div[title="Edit Comments"]').click();
});

Then(
  'User verifies the tasks are displayed under Activity tab',
  async function (this: ICustomWorld, table: DataTable) {
    const page = this.page!;
    const tasks = table.rows();
    const tasksList: any[] = [];
    const tasksListElements = await page
      .locator('li.runtime_sales_activitiesActivityTimelineFixedStencil a.subjectLink')
      .all();
    for (const element of tasksListElements) {
      tasksList.push(await element.textContent());
    }
    tasks.forEach((task) => expect(tasksList).toContainEqual(task[0]));
  },
);

When('user click on Show All Activities', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('//button[text()="Show All Activities"]').click();
});

When('set the date range to the next 7 days then apply', async function (this: ICustomWorld) {
  const page = this.page!;
  await page
    .locator('//span[text()="Next 7 days"]/preceding-sibling::span[contains(@class,"radioFaux")]')
    .click();
  await page.locator('//button[text()="Apply"]').click();
});

When('User Click on the gear icon next to Filters', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('button.filterMenuLink').click();
});

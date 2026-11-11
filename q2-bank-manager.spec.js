const { test, expect } = require('@playwright/test');

test('Q2 - Add customer, open account, search and delete', async ({ page }) => {
  // Create a unique last name so that the test can be repeated.
  const lastName = `Test${Date.now()}`;

  // 1. Open the banking application and log in as Bank Manager.
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: /bank manager login/i }).click();
  await expect(page.getByRole('button', { name: /add customer/i })).toBeVisible();

  // 2. Add a new customer.
  await page.getByRole('button', { name: /add customer/i }).click();
  await page.locator('input[ng-model="fName"]').fill('John');
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill('682001');

  // Capture the browser alert, print its message and accept it.
  page.once('dialog', async dialog => {
    console.log('Add customer alert:', dialog.message());
    await dialog.accept();
  });
  await page.getByRole('button', { name: /add customer/i }).last().click();

  // 3. Open an account for the new customer using Dollar currency.
  await page.getByRole('button', { name: /open account/i }).click();
  await page.locator('#userSelect').selectOption({ label: `John ${lastName}` });
  await page.locator('#currency').selectOption({ label: 'Dollar' });

  page.once('dialog', async dialog => {
    console.log('Open account alert:', dialog.message());
    await dialog.accept();
  });
  await page.getByRole('button', { name: /process/i }).click();

  // 4. Search for the customer and check that exactly one row is shown.
  await page.getByRole('button', { name: /customers/i }).click();
  await page.locator('input[ng-model="searchCustomer"]').fill(lastName);
  const customerRows = page.locator('table tbody tr');
  await expect(customerRows).toHaveCount(1);
  await expect(customerRows.first()).toContainText('John');
  await expect(customerRows.first()).toContainText(lastName);
  console.log('Customer found:', await customerRows.first().innerText());

  // 5. Delete the customer and verify that no row remains.
  await customerRows.getByRole('button', { name: /delete/i }).click();
  await expect(customerRows).toHaveCount(0);
  console.log(`Deletion confirmed: ${lastName} is no longer listed.`);
});

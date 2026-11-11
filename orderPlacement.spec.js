const { test, expect } = require('@playwright/test');

test.describe('Q1: E2E Grocery Order Placement - Selenium Practice', () => {
  test('Should place an order for Broccoli and verify confirmation message', async ({ page }) => {
    // 1. Application Launch
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await expect(page).toHaveTitle(/GreenKart/);

    // 2. Locate Broccoli product card precisely and click ADD TO CART
    const broccoliCard = page.locator('div.product').filter({ hasText: 'Brocolli - 1 Kg' });
    await broccoliCard.locator('button', { hasText: 'ADD TO CART' }).click();

    // 3. Verify item count in cart
    const cartIcon = page.locator('a.cart-icon');
    await expect(page.locator('.cart-info table tr:nth-child(1) td:nth-child(3)')).toHaveText('1');

    // 4. Shopping Cart Navigation
    await cartIcon.click();
    const cartPreview = page.locator('.cart-preview.active');
    await expect(cartPreview).toBeVisible();
    await expect(cartPreview.locator('.product-name')).toContainText('Brocolli');

    // Click 'PROCEED TO CHECKOUT'
    await page.locator('button', { hasText: 'PROCEED TO CHECKOUT' }).click();

    // 5. Checkout and Order Submission
    await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible();
    await page.locator('button', { hasText: 'Place Order' }).click();

    // Select Country 'India' from Dropdown
    const countryDropdown = page.locator('select');
    await countryDropdown.selectOption({ label: 'India' });
    await expect(countryDropdown).toHaveValue('India');

    // Accept Terms & Conditions Checkbox
    const chkbox = page.locator('input.chkAgree');
    await chkbox.check();
    await expect(chkbox).toBeChecked();

    // Click Proceed button
    await page.locator('button', { hasText: 'Proceed' }).click();

    // 6. Assertions & Confirmation Message Verification
    const confirmationLocator = page.locator('span', { 
      hasText: 'Thank you, your order has been placed successfully' 
    });
    
    await expect(confirmationLocator).toBeVisible();
    const confirmationText = await confirmationLocator.textContent();
    
    // 7. Console Output
    console.log('--------------------------------------------------');
    console.log('[SUCCESS] Order Confirmation Message Captured:');
    console.log(`"${confirmationText.trim()}"`);
    console.log('--------------------------------------------------');

    expect(confirmationText).toContain('Thank you, your order has been placed successfully');
  });
});
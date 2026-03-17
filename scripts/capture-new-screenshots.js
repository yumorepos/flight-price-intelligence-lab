const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  const baseUrl = 'https://flight-price-intelligence-lab.vercel.app';
  
  console.log('Capturing screenshots from live site...');
  
  // 1. Homepage with JFK search results
  await page.goto(baseUrl);
  await page.waitForTimeout(3000); // Wait for data to load
  await page.screenshot({ 
    path: 'docs/images/01-homepage-working.png',
    fullPage: false
  });
  console.log('✅ 1/5 Homepage with results');
  
  // 2. Test UI page
  await page.goto(`${baseUrl}/test-ui`);
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'docs/images/02-test-ui-recharts.png',
    fullPage: false
  });
  console.log('✅ 2/5 Test UI with Recharts');
  
  // 3. Scrolled down to show route cards
  await page.goto(baseUrl);
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'docs/images/03-route-cards.png',
    fullPage: false
  });
  console.log('✅ 3/5 Route cards detail');
  
  // 4. Mobile responsive (iPhone)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl);
  await page.waitForTimeout(3000);
  await page.screenshot({ 
    path: 'docs/images/04-mobile-homepage.png',
    fullPage: true
  });
  console.log('✅ 4/5 Mobile responsive');
  
  // 5. Mobile test UI
  await page.goto(`${baseUrl}/test-ui`);
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'docs/images/05-mobile-test-ui.png',
    fullPage: true
  });
  console.log('✅ 5/5 Mobile test UI');
  
  await browser.close();
  console.log('\n✅ All screenshots saved to docs/images/');
})();

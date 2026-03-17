const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  const baseUrl = 'https://flight-price-phase2.vercel.app';
  
  console.log('Taking screenshots...');
  
  // 1. Homepage
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'docs/images/01-homepage-route-explorer.png',
    fullPage: false
  });
  console.log('✅ 1/6 Homepage');
  
  // 2. Test UI page
  await page.goto(`${baseUrl}/test-ui`);
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'docs/images/02-test-ui-components.png',
    fullPage: false
  });
  console.log('✅ 2/6 Test UI components');
  
  // 3. Test UI - Fare trend chart (scroll to chart)
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'docs/images/03-fare-trend-chart.png',
    fullPage: false
  });
  console.log('✅ 3/6 Fare trend chart');
  
  // 4. Mobile responsive (iPhone)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'docs/images/04-mobile-responsive.png',
    fullPage: true
  });
  console.log('✅ 4/6 Mobile responsive');
  
  // 5. Test UI mobile
  await page.goto(`${baseUrl}/test-ui`);
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'docs/images/05-mobile-test-ui.png',
    fullPage: true
  });
  console.log('✅ 5/6 Mobile test UI');
  
  await browser.close();
  console.log('\n✅ All screenshots saved to docs/images/');
})();

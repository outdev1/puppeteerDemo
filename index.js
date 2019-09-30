const puppeteer = require('puppeteer');

const url = 'http://puppeteerdemo.x10host.com/wp';
const loginPage = '/wp-login.php';
const newPostPage = '/wp-admin/post-new.php'
const user = 'admin';
const pass = 'g97t3nV2XA6DERp';
const postTitle = 'New Post ' + Date.now();


puppeteer.launch().then(async browser => {
  // Setup new instance
  const page = await browser.newPage();
  await page.goto(url + loginPage, {
    waitUntil: 'networkidle0'
  });

  // call login form fill
  await loginForm(page);
  await page.screenshot({path: 'afterLogin.png'});

  // Go to new post page
  await page.goto(url + newPostPage, {
    waitUntil: 'networkidle0'
  })
  await page.screenshot({path: 'newPostPage.png'});

  await page.type('#post-title-0', postTitle)
  await page.click('.editor-post-publish-panel__toggle');
  await page.click('.editor-post-publish-button');

  await page.screenshot({path: 'postSuccess.png'});

  const page2 = await browser.newPage();
  await page2.goto(url);
  await page2.screenshot({path: 'indexPage.png'});
  console.log('New Post Title: ', postTitle);

  await browser.close();
});

async function loginForm(page) {
  await page.type('#user_login', user);
  await page.type('#user_pass', pass);

  const loginBtn = await page.$('input[name="wp-submit"]');
  await page.screenshot({path: 'beforeLogin.png'})
  await loginBtn.click();
  await page.waitForNavigation();
  return page;

}


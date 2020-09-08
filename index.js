const puppeteer = require("puppeteer");

const start = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.etsy.com/shop/atolyeTEE');
  page.on('console', msg => {
    console.log({msg })
  });
  const lastNumberLi = await page.evaluate(() => {
    const pagination = document.querySelector('.wt-action-group.wt-list-inline.wt-flex-no-wrap.wt-flex-no-wrap.wt-pt-lg-1.wt-pb-lg-3')
    const liArr = pagination.querySelectorAll('li')
    const lastNumberLi = liArr[liArr.length - 2]
    const pageNumbers = /\d+/g.exec(lastNumberLi.innerText)
    return pageNumbers
  })
  console.log(lastNumberLi)
  await browser.close();
};

start();

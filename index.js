const puppeteer = require("puppeteer");

const start = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://www.etsy.com/shop/atolyeTEE?page=0";
  await page.goto(url);
  page.on("console", (msg) => {
    console.log({ msg });
  });
  const lastNumberLi = await page.evaluate(() => {
    const pagination = document.querySelector(
      ".wt-action-group.wt-list-inline.wt-flex-no-wrap.wt-flex-no-wrap.wt-pt-lg-1.wt-pb-lg-3"
    );
    const liArr = pagination.querySelectorAll("li");
    const lastNumberLi = liArr[liArr.length - 2];
    const pageNumbers = /\d+/g.exec(lastNumberLi.innerText);
    return pageNumbers;
  });

  const partners = await page.evaluate(() => {
    Array.from(document.querySelectorAll("v2-listing-card")).map((ele) => ({
      image: ele.querySelector(".height-placeholder > img").src,
    }));
  });
  const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
  const nextUrl = `https://www.etsy.com/shop/atolyeTEE?page=${nextPageNumber}`;
  await page.close();
  console.log(lastNumberLi);
  await browser.close();
};

start();

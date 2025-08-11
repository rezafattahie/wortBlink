const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;

let browser;
let page; // permanent Tab

(async () => {
  console.log("Starting browser...");
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // open a permanent Tab
  page = await browser.newPage();

  // block big files
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (["image", "stylesheet", "font"].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  console.log("Opening wort.app...");
  await page.goto("https://wort.app", { waitUntil: "domcontentloaded" });
  console.log("Browser ready!");
})();

app.get("/api/search/:path", async (req, res) => {
  const apiPath = req.params.path; // مثل cons یا vocab یا هرچی
  const q = req.query.q || "";

  if (!page) {
    return res.status(503).json({ error: "Browser not ready yet" });
  }

  try {
    // درخواست به API داخل همان تب
    const data = await page.evaluate(
      async (path, search) => {
        const resp = await fetch(
          `https://wort.app/api/search/${path}?q=${encodeURIComponent(search)}`,
          {
            headers: {
              accept: "application/json, text/plain, */*",
            },
          }
        );
        return resp.json();
      },
      apiPath,
      q
    );

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

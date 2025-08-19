const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());
app.set('strict routing', false);
app.set('case sensitive routing', false);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

let browser;
let page;

// ===== Puppeteer setup =====
(async () => {
  try {
    console.log("Starting Puppeteer...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    page = await browser.newPage();

    // Block heavy resources
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "stylesheet", "font"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Open wort.app once to init session
    console.log("Opening wort.app to init session...");
    await page.goto("https://wort.app", { waitUntil: "domcontentloaded" });
    console.log("Browser ready!");
  } catch (err) {
    console.error("Failed to launch Puppeteer:", err);
  }
})();

// ===== API route for search pages =====
app.get("/api/search/:path", async (req, res) => {
  const apiPath = req.params.path;
  const q = req.query.q || "";

  if (!page) return res.status(503).json({ error: "Browser not ready yet" });

  try {
    const data = await page.evaluate(
      async (path, search) => {
        const resp = await fetch(
          `https://wort.app/api/search/${path}?q=${encodeURIComponent(search)}`,
          { method: "GET", headers: { accept: "application/json, text/plain, all" } }
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

// ===== API route for _next/data pages =====
app.get("/_next/data/*", async (req, res) => {
  const fullPath = req.originalUrl;
  const url = `https://wort.app${fullPath}`;

  if (!page) return res.status(503).json({ error: "Browser not ready yet" });

  try {
    const data = await page.evaluate(async (url) => {
      const resp = await fetch(url, { headers: { accept: "application/json" } });
      return resp.json();
    }, url);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch _next/data page" });
  }
});


// ===== Start server =====
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

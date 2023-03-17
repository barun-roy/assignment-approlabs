const dotenv = require("dotenv");
const express = require("express");

const scrapeInstagram = require("./util/scrapeInstagram");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/scraped", async (req, res) => {
  const scraped = await scrapeInstagram("https://www.instagram.com/nipgaming/");

//   console.log(scraped)

  res.status(200).json({
    status: "success",
    data: scraped,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

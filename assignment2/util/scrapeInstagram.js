const cheerio = require("cheerio");
const axios = require("axios");


const scrapeInstagram = async function (url) {
    try {
      // Fetch the HTML content of the Instagram page
      const response = await axios.get(url);
      const html = response.data;
  
      // Load the HTML into Cheerio
      const $ = cheerio.load(html);
  
      // Extract the meta tags
      const title = $('meta[property="og:title"]').attr("content");
      const description = $('meta[property="og:description"]').attr("content");
      const ogImage = $('meta[property="og:image"]').attr("content");
      const siteURL = $('meta[property="og:url"]').attr("content");
  
      // Log the extracted values
      // console.log("Title:", title);
      // console.log("Description:", description);
      // console.log("OG Image:", ogImage);
      // console.log("Site URL:", siteURL);
  
      const scrapObj = {
          "Title": title,
          "Description":description,
          "OG Image":ogImage,
          "Site URL": siteURL
      }
  
      return scrapObj;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = scrapeInstagram
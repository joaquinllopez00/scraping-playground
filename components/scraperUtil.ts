import axios from "axios";
import * as fs from "fs";
import * as cheerio from "cheerio";
import { NullLiteral } from "typescript";

//Make a class
class ScaperUtil {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async getHtml(url: string) {
    const response = await axios.get(`${this.baseUrl}${url}`);

    const rawHtml = response.data;

    //save the corresponding html to a file
    //using the current date appended to the url as the filename
    const filename = `/${url.replace(/\//g, "")}-${Date.now()}.html`;
    const savedHtmlResponse = await this.saveHtml(filename, rawHtml);

    return savedHtmlResponse;
  }

  async getHtmls(urls: string[]) {
    const promises = urls.map((url) => this.getHtml(url));
    return Promise.all(promises);
  }

  async saveHtml(fileName: string, html: string) {
    //Get filename without filetype
    const fileNameWithoutFileType = fileName.split(".")[0];

    //Construct the filename(s)
    const fullRawFilePath = `${__dirname}/${fileNameWithoutFileType}/${"RAW" + "-" + fileName.substring(1)}`;

    const fullCleanedFilePath = `${__dirname}/${fileNameWithoutFileType}/${"CLEAN" + "-" + fileName.substring(1)}`;

    //Create the directory if it doesn't exist
    if (!fs.existsSync(`${__dirname}/${fileNameWithoutFileType}`)) {
      fs.mkdirSync(`${__dirname}/${fileNameWithoutFileType}`);
    }

    fs.writeFile(fullRawFilePath, html, (err) => {
      if (err) throw err;
      return `Raw File has been saved at ${fullRawFilePath}`;
    });

    //Clean the html
    const cleanedHtml = await this.cleanHtml(html);
    console.log(cleanedHtml, "cleanedHtml");

    //Save the cleaned html
    fs.writeFile(fullCleanedFilePath, cleanedHtml, (err) => {
      if (err) throw err;
      return `Cleaned file has been saved at ${fullCleanedFilePath}`;
    });
  }

  async cleanHtml(html: string) {
    //Removes everything outside of the body tags of an html document
    const $ = cheerio.load(html);
    const bodyOfHtml = $("body").html();

    //Remove all script tags
    const cleanedHtml = bodyOfHtml?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    return cleanedHtml;
  }
}

async function main() {
  //Instantiate a new ScraperUtil
  const scraper = new ScaperUtil("https://www.entrepreneur.com/");

  await scraper.getHtml("/franchises/directory/fastest-growing-ranking");
}

main();

import axios from "axios";
import * as fs from "fs";
import * as cheerio from "cheerio";

//Make a class
class ScaperUtil {
  baseUrl: string;
  dataAnchorTag?: string;
  constructor(url: string, anchorTag?: string) {
    this.baseUrl = url;
    this.dataAnchorTag = anchorTag;
  }

  async getHtmlAndSaveLocally(url: string): Promise<string> {
    const response = await axios.get(`${this.baseUrl}${url}`);

    const rawHtml = response.data;

    //save the corresponding html to a file
    //using the current date appended to the url as the filename
    const filename = `/${url.replace(/\//g, "-")}-${Date.now()}.html`;

    //Check if the directory exists
    await this.checkForDirectory(filename);

    await this.saveRawHtml(filename, rawHtml);
    await this.saveCleanedHtml(filename, rawHtml);

    return "Data was saved!";
  }

  async getHtmls(urls: string[]) {
    const promises = urls.map((url) => this.getHtmlAndSaveLocally(url));
    return Promise.all(promises);
  }

  //Checks for the directory of a given file name, and creates it if it doesn't exist.
  //It also creates the scraped-data directory if it doesn't exist
  async checkForDirectory(fileName: string) {
    //Get filename without filetype
    const fileNameWithoutFileType = fileName.split(".")[0];

    //Checkl for scraped-data directory and create it if it doesn't exist
    if (!fs.existsSync(`${__dirname}/scraped-data`)) {
      fs.mkdirSync(`${__dirname}/scraped-data`);
    }

    //Create the directory if it doesn't exist
    if (!fs.existsSync(`${__dirname}/scraped-data${fileNameWithoutFileType}`)) {
      fs.mkdirSync(`${__dirname}/scraped-data${fileNameWithoutFileType}`);
    }
  }

  async saveRawHtml(fileName: string, html: string) {
    //Get filename without filetype
    const fileNameWithoutFileType = fileName.split(".")[0];

    //Construct the filename(s)
    const fullRawFilePath = `${__dirname}/scraped-data${fileNameWithoutFileType}/${
      "RAW" + "-" + fileName.substring(1)
    }`;

    fs.writeFile(fullRawFilePath, html, (err) => {
      if (err) throw err;
      return `Raw File has been saved at ${fullRawFilePath}`;
    });
  }

  async saveCleanedHtml(fileName: string, html: string) {
    //Get filename without filetype
    const fileNameWithoutFileType = fileName.split(".")[0];

    //Construct the filename(s)
    const fullCleanedFilePath = `${__dirname}/scraped-data/${fileNameWithoutFileType}/${
      "CLEAN" + "-" + fileName.substring(1)
    }`;

    //Clean the html
    const cleanedHtml: string = this.cleanHtml(html);
    console.log(cleanedHtml, "cleanedHtml");

    //Save the cleaned html
    fs.writeFile(fullCleanedFilePath, cleanedHtml, (err) => {
      if (err) throw err;
      return `Cleaned file has been saved at ${fullCleanedFilePath}`;
    });
  }

  cleanHtml(html: string): string {
    //Removes everything outside of the body tags of an html document
    const $: any = cheerio.load(html);
    const bodyOfHtml: string = $("body").html();

    //Remove all script tags
    const cleanedHtml: string = bodyOfHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    return cleanedHtml;
  }

  async cleanHtmlByTag(html: string, tag: string) {
    //Removes everything outside of the tag argument
    const $ = cheerio.load(html);
    const bodyOfHtml = $(tag).html();

    console.log(bodyOfHtml, "bodyOfHtml");
  }

  setDataAnchorTag(dataAnchorTag: string): void {
    this.dataAnchorTag = dataAnchorTag;
  }
}

async function main() {
  //Instantiate a new ScraperUtil
  const scraper = new ScaperUtil("https://www.entrepreneur.com/");

  // await scraper.getHtmlAndSaveLocally("/franchises/directory/fastest-growing-ranking");
  scraper.setDataAnchorTag("<table class='w-full bg-white shadow overflow-hidden sm:rounded-md table-fixed'>");
}

main();

import axios from "axios";
import * as fs from "fs";

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
    const savedHtmlResponse = await this.saveHtml(filename, rawHtml, "raw");

    return savedHtmlResponse;
  }

  async saveHtml(fileName: string, html: string, type: string) {
    //Get filename without filetype
    const fileNameWithoutFileType = fileName.split(".")[0];

    //Construct the filename
    const fullFilePath = `${__dirname}/${fileNameWithoutFileType}/${type + "-" + fileName.substring(1)}`;

    //Create the directory if it doesn't exist
    if (!fs.existsSync(`${__dirname}/${fileNameWithoutFileType}`)) {
      fs.mkdirSync(`${__dirname}/${fileNameWithoutFileType}`);
    }

    fs.writeFile(fullFilePath, html, (err) => {
      if (err) throw err;
      return `File has been saved at ${fileName}`;
    });
  }

  async getHtmls(urls: string[]) {
    const promises = urls.map((url) => this.getHtml(url));
    return Promise.all(promises);
  }
}

async function main() {
  //Instantiate a new ScraperUtil
  const scraper = new ScaperUtil("https://www.entrepreneur.com/");

  await scraper.getHtml("/franchises/directory/fastest-growing-ranking");
}

main();

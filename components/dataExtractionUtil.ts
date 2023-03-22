import axios from "axios";
import * as fs from "fs";
import * as cheerio from "cheerio";

//Will turn the HTML document into a csv that dynamically creates headers based on content recieved
class DataExtractionUtil {
  filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  //Function that extracts the html content from a local directory
  async getHtml() {
    const html = fs.readFileSync(this.filePath, "utf8");

    return html;
  }

  //Function that segments data on an HTML page, and extracts insights from the inner HTML
  //This is better for data found on list-like websites
  async extractDataBySeperator(
    seperator: string,
    htmlTagInsightPairings: {
      elementSelector: string;
      category: string;
    }[],
  ) {
    //Get the html
    const html = await this.getHtml();

    console.log(html, "html");

    //Load the html into cheerio
    const $ = cheerio.load(html);

    //Verify seperator exists on the html
    if (!html.includes(seperator)) {
      throw new Error("Seperator not found in html");
    }

    //Create an array of objects that will hold the data
    const data = [];
  }
}

async function main() {
  const dataExtractionUtil = new DataExtractionUtil(
    `${__dirname}/franchisesdirectoryfastest-growing-ranking-1679463855444/CLEAN-franchisesdirectoryfastest-growing-ranking-1679463855444.html`,
  );

  const data = await dataExtractionUtil.extractDataBySeperator(
    "<tr class='border-b border-grey-100 hover:bg-blue-50 cursor-pointer '>",
    [
      {
        elementSelector: "<p class='text-sm text-gray-700'>",
        category: "Intial Investment",
      },
      {
        elementSelector: "  <p class='text-base font-medium text-gray-700 w-1/2'>",
        category: "Franchise Name",
      },
      {
        elementSelector: "<a class='block'>",
        category: "Category/Description",
      },
    ],
  );
}

main();

export default DataExtractionUtil;

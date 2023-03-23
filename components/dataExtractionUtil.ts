import axios from "axios";
import * as fs from "fs";
import * as cheerio from "cheerio";

//Will turn the HTML document into a csv that dynamically creates headers based on content recieved
class DataExtractionUtil {
  filePath: string;
  workableData: string;
  constructor(filePath: string) {
    this.filePath = filePath;
    this.workableData = "";
  }

  //Function that extracts the html content from a local directory
  setWorkableData() {
    // Open the file for reading
    let fd = fs.openSync(this.filePath, "r");

    // Read the file
    let buffer = Buffer.alloc(10000000);
    let bytesRead = fs.readSync(fd, buffer, 0, 10000000, 0);

    // Close the file
    fs.closeSync(fd);

    // Convert the buffer to a string
    let data = buffer.toString("utf8", 0, bytesRead);

    this.workableData = data;
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
    this.setWorkableData();

    //Load the html into cheerio
    const $ = cheerio.load(this.workableData);

    //Create an array of objects that will hold the data
    const data = [];

    console.log("Workable Data: ", this.workableData);
    console.log("Seperator: ", seperator);

    //Loop through the seperator elements
    $(seperator).each((i, element) => {
      //Create an object to hold the data for this element
      let dataObject = {};
      console.log("Element: ", element);
    });

    //Return the data
    return data;

    // //Create a csv file
    // const csvWriter = createCsvWriter({
    //   path: `${__dirname}/scraped-data/-franchises-directory-fastest-growing-ranking-1679509968840/TAG--franchises-directory-fastest-growing-ranking-1679509968840.csv`,
    //   header: [
    //     { id: "Intial Investment", title: "Intial Investment" },
    //     { id: "Franchise Name", title: "Franchise Name" },
    //     { id: "Franchise Website", title: "Franchise Website" },
    //   ],
    // });

    // //Write the data to the csv file
    // csvWriter.writeRecords(data).then(() => {
    //   console.log("...Done");
    // });

    // //Return the data
    // return data;
  }
}

async function main() {
  const dataExtractionUtil = new DataExtractionUtil(
    `${__dirname}/scraped-data/-franchises-directory-fastest-growing-ranking-1679509968840/TAG--franchises-directory-fastest-growing-ranking-1679509968840.html`,
  );

  const data = await dataExtractionUtil.extractDataBySeperator(
    "tr[class='border-b border-grey-100 hover:bg-blue-50 cursor-pointer']",
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

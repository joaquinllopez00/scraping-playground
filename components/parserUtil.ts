import axios from "axios";
import * as fs from "fs";
import * as cheerio from "cheerio";

class ParserUtil {
  filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getHtml() {
    const html = fs.readFileSync(this.filePath, "utf8");
    return html;
  }
}

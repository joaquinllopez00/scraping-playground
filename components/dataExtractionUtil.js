"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var cheerio = require("cheerio");
//Will turn the HTML document into a csv that dynamically creates headers based on content recieved
var DataExtractionUtil = /** @class */ (function () {
    function DataExtractionUtil(filePath) {
        this.filePath = filePath;
        this.workableData = "";
    }
    //Function that extracts the html content from a local directory
    DataExtractionUtil.prototype.setWorkableData = function () {
        // Open the file for reading
        var fd = fs.openSync(this.filePath, "r");
        // Read the file
        var buffer = Buffer.alloc(10000000);
        var bytesRead = fs.readSync(fd, buffer, 0, 10000000, 0);
        // Close the file
        fs.closeSync(fd);
        // Convert the buffer to a string
        var data = buffer.toString("utf8", 0, bytesRead);
        this.workableData = data;
    };
    //Function that segments data on an HTML page, and extracts insights from the inner HTML
    //This is better for data found on list-like websites
    DataExtractionUtil.prototype.extractDataBySeperator = function (seperator, htmlTagInsightPairings) {
        return __awaiter(this, void 0, void 0, function () {
            var $, data;
            return __generator(this, function (_a) {
                //Get the html
                this.setWorkableData();
                $ = cheerio.load(this.workableData);
                data = [];
                console.log("Workable Data: ", this.workableData);
                console.log("Seperator: ", seperator);
                //Loop through the seperator elements
                $(seperator).each(function (i, element) {
                    //Create an object to hold the data for this element
                    var dataObject = {};
                    console.log("Element: ", element);
                });
                //Return the data
                return [2 /*return*/, data];
            });
        });
    };
    return DataExtractionUtil;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dataExtractionUtil, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataExtractionUtil = new DataExtractionUtil("".concat(__dirname, "/scraped-data/-franchises-directory-fastest-growing-ranking-1679509968840/TAG--franchises-directory-fastest-growing-ranking-1679509968840.html"));
                    return [4 /*yield*/, dataExtractionUtil.extractDataBySeperator("tr[class='border-b border-grey-100 hover:bg-blue-50 cursor-pointer']", [
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
                        ])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
exports.default = DataExtractionUtil;

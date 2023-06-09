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
var axios_1 = require("axios");
var fs = require("fs");
var cheerio = require("cheerio");
//Make a class
var ScaperUtil = /** @class */ (function () {
    function ScaperUtil(url, anchorTag) {
        this.baseUrl = url;
        this.dataAnchorTag = anchorTag;
    }
    ScaperUtil.prototype.getHtmlAndSaveLocally = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, rawHtml, filename, cleanedHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl).concat(url))];
                    case 1:
                        response = _a.sent();
                        rawHtml = response.data;
                        filename = "/".concat(url.replace(/\//g, "-"), "-").concat(Date.now(), ".html");
                        //Check if the directory exists
                        return [4 /*yield*/, this.checkForDirectory(filename)];
                    case 2:
                        //Check if the directory exists
                        _a.sent();
                        return [4 /*yield*/, this.saveRawHtml(filename, rawHtml)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.saveCleanedHtml(filename, rawHtml)];
                    case 4:
                        cleanedHtml = _a.sent();
                        if (!this.dataAnchorTag) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.saveDataAnchorTagHtml(filename, cleanedHtml)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, "Data was saved!"];
                }
            });
        });
    };
    ScaperUtil.prototype.getHtmls = function (urls) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return __generator(this, function (_a) {
                promises = urls.map(function (url) { return _this.getHtmlAndSaveLocally(url); });
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    //Checks for the directory of a given file name, and creates it if it doesn't exist.
    //It also creates the scraped-data directory if it doesn't exist
    ScaperUtil.prototype.checkForDirectory = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var fileNameWithoutFileType;
            return __generator(this, function (_a) {
                fileNameWithoutFileType = fileName.split(".")[0];
                //Checkl for scraped-data directory and create it if it doesn't exist
                if (!fs.existsSync("".concat(__dirname, "/scraped-data"))) {
                    fs.mkdirSync("".concat(__dirname, "/scraped-data"));
                }
                //Create the directory if it doesn't exist
                if (!fs.existsSync("".concat(__dirname, "/scraped-data").concat(fileNameWithoutFileType))) {
                    fs.mkdirSync("".concat(__dirname, "/scraped-data").concat(fileNameWithoutFileType));
                }
                return [2 /*return*/];
            });
        });
    };
    ScaperUtil.prototype.saveRawHtml = function (fileName, html) {
        return __awaiter(this, void 0, void 0, function () {
            var fileNameWithoutFileType, fullRawFilePath;
            return __generator(this, function (_a) {
                fileNameWithoutFileType = fileName.split(".")[0];
                fullRawFilePath = "".concat(__dirname, "/scraped-data").concat(fileNameWithoutFileType, "/").concat("RAW" + "-" + fileName.substring(1));
                fs.writeFile(fullRawFilePath, html, function (err) {
                    if (err)
                        throw err;
                    return "Raw File has been saved at ".concat(fullRawFilePath);
                });
                return [2 /*return*/, html];
            });
        });
    };
    ScaperUtil.prototype.saveCleanedHtml = function (fileName, html) {
        return __awaiter(this, void 0, void 0, function () {
            var fileNameWithoutFileType, fullCleanedFilePath, cleanedHtml;
            return __generator(this, function (_a) {
                fileNameWithoutFileType = fileName.split(".")[0];
                fullCleanedFilePath = "".concat(__dirname, "/scraped-data/").concat(fileNameWithoutFileType, "/").concat("CLEAN" + "-" + fileName.substring(1));
                cleanedHtml = this.cleanHtml(html, "body");
                //Save the cleaned html
                fs.writeFile(fullCleanedFilePath, cleanedHtml, function (err) {
                    if (err)
                        throw err;
                    return "Cleaned file has been saved at ".concat(fullCleanedFilePath);
                });
                return [2 /*return*/, cleanedHtml];
            });
        });
    };
    ScaperUtil.prototype.saveDataAnchorTagHtml = function (fileName, html) {
        return __awaiter(this, void 0, void 0, function () {
            var fileNameWithoutFileType, fullCleanedFilePath, cleanedHtml;
            return __generator(this, function (_a) {
                fileNameWithoutFileType = fileName.split(".")[0];
                fullCleanedFilePath = "".concat(__dirname, "/scraped-data/").concat(fileNameWithoutFileType, "/").concat("TAG" + "-" + fileName.substring(1));
                cleanedHtml = this.cleanHtml(html, this.dataAnchorTag);
                // console.log(cleanedHtml);
                //Save the cleaned html
                fs.writeFile(fullCleanedFilePath, cleanedHtml, function (err) {
                    if (err)
                        throw err;
                    return "Cleaned file has been saved at ".concat(fullCleanedFilePath);
                });
                return [2 /*return*/];
            });
        });
    };
    ScaperUtil.prototype.cleanHtml = function (html, tag) {
        //Removes everything outside of tags of an html document
        var $ = cheerio.load(html);
        //Get all occurances of tag and append array
        var tagElementsArr = [];
        $(tag).each(function (i, el) { return tagElementsArr.push($(el).html()); });
        var htmlInTags = tagElementsArr.join("");
        //Remove all script tags
        var cleanedHtml = htmlInTags.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
        return cleanedHtml;
    };
    ScaperUtil.prototype.setDataAnchorTag = function (dataAnchorTag) {
        this.dataAnchorTag = dataAnchorTag;
    };
    return ScaperUtil;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var scraper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scraper = new ScaperUtil("https://www.entrepreneur.com/", 'table[class="w-full bg-white shadow overflow-hidden sm:rounded-md table-fixed"]');
                    return [4 /*yield*/, scraper.getHtmlAndSaveLocally("/franchises/directory/fastest-growing-ranking")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();

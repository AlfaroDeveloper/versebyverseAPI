/**
 *  BIBLE STUDY TOOL
 *
 *  Name: 1P-315
 *  Year: 2023
 *  Author: Armando Alfaro
 */

// Production or Localhost PORT
const PORT = process.env.PORT || 8000;

// Required Packages
const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

// Express Application
const app = express();
const server = http.createServer(app);
app.use(cors({ methods: "GET" }));

let bibleVerses = [];
let originalTexts = [];
let strongsDef = [];
let comment = [];

function format(arr) {
  let formatted = [];
  for (let i = 0; i < arr.length; i++) {
    formatted.push(arr[i].replace(/[^a-zA-Z0-9]/g, ""));
  }
  return formatted;
}
function firstIndex(arr) {
  return arr[arr.length - 1];
}
function strongsFormat(arr) {
  arr.pop();
  return arr[arr.length - 1];
}
function arrayLength(array, iteration) {
  let newArray = [];
  let val = "";
  for (let i = 1; i <= iteration; i++) {
    val = array[array.length - 1];
    array.pop();

    newArray.push(val);
  }
  newArray.reverse();
  return newArray;
}
function containsSearchedData(arr, verse, book, chapter) {
  console.log("v", verse, " ", "ch", chapter, " ", "b", book);
  if (
    arr.filter((index) => index["jsonVerse"] === `Verse ${verse}`) &&
    arr.filter((index) => index["name"] === `${book} ${chapter}:${verse}`)
  ) {
    const i = arr.findIndex(
      (e) => e.name === `${book} ${chapter} Verse ${verse}`
    );
    return arr[i];
  }
}
function code(string) {
  let bookCode = "";
  let chapterCode = "";
  let verseCode = "";
  let code = "";

  let deciphering = string.split(".");

  switch (deciphering[0].trim()) {
    case "Gen":
      bookCode = "01";
      break;
    case "Exo":
      bookCode = "02";
      break;
    case "Lev":
      bookCode = "03";
      break;
    case "Num":
      bookCode = "04";
      break;
    case "Deu":
      bookCode = "05";
      break;
    case "Jos":
      bookCode = "06";
      break;
    case "Jdg":
      bookCode = "07";
      break;
    case "Rut":
      bookCode = "08";
      break;
    case "1Sa":
      bookCode = "09";
      break;
    case "2Sa":
      bookCode = "10";
      break;
    case "1Ki":
      bookCode = "11";
      break;
    case "2Ki":
      bookCode = "12";
      break;
    case "1Ch":
      bookCode = "13";
      break;
    case "2Ch":
      bookCode = "14";
      break;
    case "Ezr":
      bookCode = "15";
      break;
    case "Neh":
      bookCode = "16";
      break;
    case "Est":
      bookCode = "17";
      break;
    case "Job":
      bookCode = "18";
      break;
    case "Psa":
      bookCode = "19";
      break;
    case "Pro":
      bookCode = "20";
      break;
    case "Ecc":
      bookCode = "21";
      break;
    case "Sng":
      bookCode = "22";
      break;
    case "Isa":
      bookCode = "23";
      break;
    case "Jer":
      bookCode = "24";
      break;
    case "Lam":
      bookCode = "25";
      break;
    case "Ezk":
      bookCode = "26";
      break;
    case "Dan":
      bookCode = "27";
      break;
    case "Hos":
      bookCode = "28";
      break;
    case "Joe":
      bookCode = "29";
      break;
    case "Amo":
      bookCode = "30";
      break;
    case "Oba":
      bookCode = "31";
      break;
    case "Jon":
      bookCode = "32";
      break;
    case "Mic":
      bookCode = "33";
      break;
    case "Nam":
      bookCode = "34";
      break;
    case "Hab":
      bookCode = "35";
      break;
    case "Zep":
      bookCode = "36";
      break;
    case "Hag":
      bookCode = "37";
      break;
    case "Zec":
      bookCode = "38";
      break;
    case "Mal":
      bookCode = "39";
      break;
    case "Mat":
      bookCode = "40";
      break;
    case "Mrk":
      bookCode = "41";
      break;
    case "Luk":
      bookCode = "42";
      break;
    case "Jhn":
      bookCode = "43";
      break;
    case "Act":
      bookCode = "44";
      break;
    case "Rom":
      bookCode = "45";
      break;
    case "1Co":
      bookCode = "46";
      break;
    case "2Co":
      bookCode = "47";
      break;
    case "Gal":
      bookCode = "48";
      break;
    case "Eph":
      bookCode = "49";
      break;
    case "Php":
      bookCode = "50";
      break;
    case "Col":
      bookCode = "51";
      break;
    case "1Th":
      bookCode = "52";
      break;
    case "2Th":
      bookCode = "53";
      break;
    case "1Ti":
      bookCode = "54";
      break;
    case "2Ti":
      bookCode = "55";
      break;
    case "Tit":
      bookCode = "56";
      break;
    case "Phm":
      bookCode = "57";
      break;
    case "Heb":
      bookCode = "58";
      break;
    case "Jam":
      bookCode = "59";
      break;
    case "1Pe":
      bookCode = "60";
      break;
    case "2Pe":
      bookCode = "61";
      break;
    case "1Jn":
      bookCode = "62";
      break;
    case "2Jn":
      bookCode = "63";
      break;
    case "3Jn":
      bookCode = "64";
      break;
    case "Jud":
      bookCode = "65";
      break;
    case "Rev":
      bookCode = "66";
      break;
  }
  chapterCode = deciphering[1];
  switch (deciphering[1].length) {
    case 1:
      chapterCode = `00${chapterCode}`;
      break;
    case 2:
      chapterCode = `0${chapterCode}`;
      break;
    case 3:
      chapterCode = chapterCode;
      break;
  }
  verseCode = deciphering[2];
  switch (deciphering[2].length) {
    case 1:
      verseCode = `00${verseCode}`;
      break;
    case 2:
      verseCode = `0${verseCode}`;
      break;
    case 3:
      verseCode = verseCode;
      break;
  }

  code = `${bookCode}${chapterCode}${verseCode}`;

  return code;
}

function checkBook(book) {
  book.toLowerCase();
  switch (book) {
    case "ezekiel":
      book = "ezk";
      break;
    case "judges":
      book = "jdg";
      break;
    case "philippians":
      book = "php";
      break;
    case "nahum":
      book = "nam";
      break;
    case "mark":
      book = "mrk";
      break;
    case "john":
      book = "jhn";
      break;
    case "philemon":
      book = "phm";
      break;
    case "james":
      book = "jas";
      break;
    case "1john":
      book = "1jn";
      break;
    case "2john":
      book = "2jn";
      break;
    case "3john":
      book = "3jn";
      break;
    default:
      book = book.substring(0, 3);
      break;
  }
  if(book.includes("1") || book.includes("2")){
    book = book[0] + book[1].toUpperCase() + book[2];  
  }else{
    book = book[0].toUpperCase() + book.slice(1);
  }
  return book;
}

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json("WELCOME TO MY BIBLE API");
});

// return only 1 call
app.get("/verse/:bookID/:chapterID/:verseID", (req, res) => {
  let book = checkBook(req.params.bookID);
  const verse = `${book}.${req.params.chapterID}.${req.params.verseID}`;
  
  
  axios
    .get(
      `https://www.bible.com/bible/100/${verse}.NASB1995`
    )
    .then((response) => {
      let html = response.data;
      const $ = cheerio.load(html);

      $(".center.pt3", html).each(function () {
        const verse = $(this).find(".tc.f3.f2-m").text();
        const text = $(this).find(".yv-gray50.lh-copy.f3-m").text();
       // text.split(".");
        //text.split(",");
        //let format_array = text.split(" ");

        //let text_array = format(format_array);

        //let id = code(firstLetterUppercaseVerse);

        bibleVerses.push({
          verse,
          text         
        });
      });

      let lastTyped = firstIndex(bibleVerses);

      res.json(lastTyped);
    })
    .catch((err) => console.log(err));
});


const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received %s", message);
  });
  ws.send("something from server");
});
server.listen(PORT, function (err) {
  if (err) throw err;

  console.log(`listening on PORT: ${PORT}`);
});

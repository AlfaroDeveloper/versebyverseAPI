function containsSearchedData(arr, verse){
  const i = arr.findIndex(e => e.strongs === `verse ${verse}`);

  console.log(arr[i]);
}

let ot = [
  {
    strongs: "verse 16",
    ogText: "בְּרֵאשִׁ֖ית",
    enText: "In the beginning",
  },
  {
    strongs: "verse 12",
    ogText: "בָּרָ֣א",
    enText: "created",
  },
  {
    strongs: "430",
    ogText: "אֱלֹהִ֑ים",
    enText: "God",
  },
  {
    strongs: "853",
    ogText: "אֵ֥ת",
    enText: " - ",
  },
  {
    strongs: "8064",
    ogText: "הַשָּׁמַ֖יִם",
    enText: "the heavens",
  }
];

containsSearchedData(ot, '16');

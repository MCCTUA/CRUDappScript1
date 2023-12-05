function myFunction() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Customers')

  const wsData = ws.getRange(2,1, ws.getLastRow()-1, 3).getValues()
  // console.log( wsData)
  let searchWord = " Duck  man"

  let searchInput = searchWord.toString().toLowerCase().trim().split(/\s+/)

  console.log(searchInput)

  searchInput.every( (word) => console.log( word))

}

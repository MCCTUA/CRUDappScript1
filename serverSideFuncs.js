function getDataForSearch() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Customers')
  return ws.getRange(2,1, ws.getLastRow()-1, 3).getValues()
}

function deleteById(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Customers')
  const custIds = ws.getRange(2,1, ws.getLastRow()-1, 1).getValues().map( r => r[0].toString().toLowerCase())
  const posIndex = custIds.indexOf(id.toString().toLowerCase())
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2 // เป็น 0 เนื่องจากใน google sheet ไม่มีตำแหน่ง 0 จะเริ่มที่ 1 (ท้งแถว และ column) ดังนั้น จะ error ไม่มีแถวไหนโดนลบทิ้ง
  ws.deleteRow(rowNumber) 
}

function getCustomerById(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Customers')
  const custIds = ws.getRange(2,1, ws.getLastRow()-1, 1).getValues().map( r => r[0].toString().toLowerCase())
  const posIndex = custIds.indexOf(id.toString().toLowerCase())
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2 
  const customerInfo = ws.getRange(rowNumber, 1, 1, 4).getValues()[0]
  return {custID: customerInfo[0], firstName:  customerInfo[1], lastName:  customerInfo[2], phone:  customerInfo[3]}
}

function editcustomerById(id, customerInfo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Customers')
  const custIds = ws.getRange(2,1, ws.getLastRow()-1, 1).getValues().map( r => r[0].toString().toLowerCase())
  const posIndex = custIds.indexOf(id.toString().toLowerCase())
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2

  ws.getRange(rowNumber, 2, 1, 3).setValues([[
                                              customerInfo.firstName,
                                              customerInfo.lastName,
                                              customerInfo.phone
                                            ]])
  return true                                            
}

function addCutomer(customerInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Customers')
  const uniqueIDs = ws.getRange(2,1, ws.getLastRow()-1, 1).getValues()
  let maxNum = 0
  uniqueIDs.forEach(r => {
    maxNum = r[0] > maxNum ? r[0] : maxNum
  })
  let newID = maxNum + 1

  ws.appendRow([
                newID,
                customerInfo.firstName,
                customerInfo.lastName,
                customerInfo.phone
              ])
  return true
}
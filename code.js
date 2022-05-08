function sendEmail(to,subject,msg){

    GmailApp.sendEmail(to,subject,msg)
  
  }
  function test(){
    sendEmail("sithanathanpandiselvi@gmail.com","The Sub","the body")
  }
  
  function getSheetByName(name){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    for( var n in sheets) {
      if (name==sheets[n].getName()){
        return sheets[n];  
    }
  }
  return sheets[0];
  
  }
  function prepareMessage(name){
    var sheet = getSheetByName("Msg");
    var oldSheet = SpreadsheetApp.getActiveSheet()
    SpreadsheetApp.setActiveSheet(sheet)
  
    var dataRange = sheet.getRange(1,1,1,1)
    data = dataRange.getValues()
    var msg = data[0][0]
    msg = msg.replace("%FIRST%",name)
    SpreadsheetApp.setActiveSheet(oldSheet)
    return msg
  }
  
  function sendGrades(){
    var sheet = getSheetByName("grades")
    var rows = sheet.getLastRow()
    var cols = sheet.getLastColumn()
    var dataRange = sheet.getRange(2,1,rows-1,cols)
    var data = dataRange.getValues();
    for (i in data){
      var name = data[i][0]
      var to = data[i][1]
      var msg = prepareMessage(name)
      sendEmail(to,"Important Grade Info",msg)
    }
  }
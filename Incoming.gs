function doPost(e){
  var sheets = SpreadsheetApp.openById(getSpreadsheet());
  var amount = String(e.parameters.text).replace("@counter ", '');
    var user = e.parameters.user_name.toString();
    var userid = e.parameters.user_id.toString();
  if(amount.isNumber()){
    var time = new Date(e.parameters.timestamp * 1000);
    var shifts = CalendarApp.getCalendarsByName(getCalendar())[0].getEventsForDay(time);
    var workers = '';
    for (var i in shifts){
      if(shifts[i].getStartTime() <= new Date() && shifts[i].getEndTime() >= new Date()) {
        workers += shifts[i].getTitle() + ',';
      }
    }
    workers = workers.substring(0, workers.length - 1);
    Logger.log(workers);
    sheets.appendRow([time, amount, workers, user]);
    var payload = {
      "username" : "People Counter", //bot name
      "text" : "Hey <@" + userid + ">, you just added \n `" + amount + " people @ " + time.toString() + "`\n in the People Count!" , //message request
      "icon-emoji" : ":man-woman-girl-boy:", //bot icon
    };
  }
  else{
    var payload = {
      "username" : "People Counter", //bot name
      "text" : "<@" + userid + "> that was an invalid input, try entering *\"@counter [number of people]\"*" , //message request
      "icon-emoji" : ":man-woman-girl-boy:", //bot icon
    }
  }
  Logger.log(sendToSlack(payload));
}
  
String.prototype.isNumber = function(){
  return /^\d+$/.test(this);
}
function askForCount() {
  var now = new Date();
  var shifts = CalendarApp.getCalendarsByName(getCalendar())[0].getEventsForDay(now);
  var workers = '';
  for (var i in shifts){
    if(shifts[i].getStartTime() <= now && shifts[i].getEndTime() >= now){
      workers += shifts[i].getTitle().toLowerCase() + ', ';
    }
  }
  
  var payload = {
    "username" : "People Counter", //bot name
    "text" : "Hey " + workers + " can you please reply with the number of people in the lab right now?\n Type *\"@counter [number of people]\"*", //message request
    "icon-emoji" : ":man-woman-girl-boy:", //bot icon
  };
  sendToSlack(payload);
}

function sendToSlack(payload){
  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload)
  };
  return UrlFetchApp.fetch(getSlackURL(), options);
}
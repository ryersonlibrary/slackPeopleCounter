function triggerAsking(){
  var now = new Date()
  if(((now.getDay() >= 1 && now.getDay() <= 5) && (now.getHours() >= 10 && now.getHours() < 18)) || (now.getDay() == 4 && (now.getHours() == 18 || now.getHours() == 19)))
    askForCount();
}

function test(){
  Logger.log(getCalendar());
}
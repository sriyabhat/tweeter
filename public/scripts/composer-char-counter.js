const setCounter = function(){
  let counter = 140 - $("#tweet-text").val().length; 
  $("[name=counter]").val(counter);
  //add a class exceeds-limit if the counter value goes below 0.
  (counter < 0) ? $("[name=counter]").addClass("exceeds-limit") : $("[name=counter]").removeClass("exceeds-limit");
  return counter;
};

$(document).ready(function(){ 
  $("#tweet-text").on('input',function(event){ 
    counter = setCounter(); 
      if(counter >= 0) {
        $(".error").addClass("hidden");
      }     
  });   
});
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//calculate the time of the tweet
const tweetTime = (time) => {  
  let today = new Date();
  let tweetDate = new Date(time);
  let timeDifference = today.getTime() - tweetDate.getTime();
  console.log(today);
  console.log(tweetDate);
  console.log("..............................");
  let years = Math.floor(timeDifference/(1000 * 3600 * 24 * 30 * 12));
  console.log(timeDifference);
  console.log(years); 
  if(years > 0) {
    return `${years} years ago`;
  }
  let months = Math.floor(timeDifference /(1000 * 3600 * 24 *30));  
  if(months > 0) {
    return `${months} months ago`;
  }
  let days = Math.floor(timeDifference / (1000 * 3600 * 24));
  if(days > 0) {
    return `${days} days ago`;
  }
  let hours = Math.floor(timeDifference / (1000 * 3600));
  if(hours > 0) {
    return `${hours} hours ago`;
  }
  let minutes = Math.floor(timeDifference / (1000 * 60));
  if(minutes > 0) {
    return `${minutes} minutes ago`;
  }
  let seconds = Math.floor(timeDifference / (1000));
  if(seconds > 0) {
    return `${seconds} seconds ago`;
  }
  return `Just Now`;  
};


//create a DOM structure for a tweet. 
const createTweetElement = (tweetObj) => {  
  let output  =`<article class = "tweets">`;
  //tweet-header
  output += `<article class = "tweet-header">`;
  output += `<div><img src = "${tweetObj["user"].avatars}"/><label>${tweetObj["user"].name}</label></div>`;
  output += `<a class = "hidden" href = " ">${tweetObj["user"].handle}</a>`;
  output += `</article>`;
  //tweet-text
  output += `<article class ="tweet-text">`;
  output += `<p>${escape(tweetObj["content"].text)}</p>`;
  output += `</article>`;
  //tweet-footer
  output += `<article class = "tweet-footer">`;
  output += `<label id = "${tweetObj["created_at"]}">${tweetTime(tweetObj["created_at"])}</label>`;
  output += `<div>`;
  output += `<i class="fa fa-flag" aria-hidden="true"></i></i>`;
  output += `<i class="fa fa-retweet" aria-hidden="true"></i>`;
  output += `<i class="fa fa-heart" aria-hidden="true"></i>`;
  output += `</div>`;
  output += `</article>`;
  output += `</article>`;

  return output;
};


//on hovering over the tweet display the handle.
const renderStyle = () => {
  $(".tweets").on('mouseover',function(event){    
    $(event.currentTarget).children(".tweet-header").children("a").removeClass("hidden");    
  });
  
  $(".tweets").on('mouseleave',function(event){   
    $(event.currentTarget).children(".tweet-header").children("a").addClass("hidden");
  });
};


//Iterate over the tweets recieved as a response from the server
const renderTweet = (tweets) => {
  for(let tweetObj of tweets) {
    const tweet = createTweetElement(tweetObj);
    $('.tweets-container').prepend(tweet);
    renderStyle();
  }
};

//refresh the date 
const renderDate = (tweet) => {
  debugger;
  for(let tweetObj of tweet) {
    $(`#${tweetObj.created_at}`).text(tweetTime(tweetObj.created_at));
  }
};


//get the tweets from the Server in JSON format
const loadTweets = (afterPost) => {  
  $.ajax({
    url : '/tweets',
    method : 'GET'
  }).then(result => {
    if(afterPost) {
     let latestTweet = [];
     latestTweet.push(result[result.length - 1]);
     renderTweet(latestTweet);
     renderDate(result);
    } else {
      renderTweet(result);
    }             
  }).catch(error => {
    console.log(error);
  });
}; 

//check for the length of the Tweet and return an error-message if it fails the validation
const isInvalidTweet = (tweet) => {  
  if (!tweet) {
    return 'Please add some text to Tweet'; 
  }
  if(tweet.length > 140) {
    return 'Tweet content is too long';
  }
  return false;
};


$(document).ready(function(){

  loadTweets(); 

  //Post the Tweet
  $("form").on("submit",function(event) {  
    //prevents the default behaviour of the form sending the post request and reloading the page.
    event.preventDefault();    
    const error = isInvalidTweet($("#tweet-text").val());    
    if(!error) {
      //handle the post request asynchronously.
      $.ajax({
        url : '/tweets/',
        method : 'POST',
        data : $(this).serialize()
      }).then(() => {
        $("#tweet-text").val("");
        $("[name=counter]").val("140");
        //when true is passed as a parameter only the latest tweet will be added to the page.
        loadTweets(true);                
      });
    } else {
      $(".error").children("span").text(error);
      $(".error").removeClass("hidden");      
    }    
  });

});
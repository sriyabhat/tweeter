//create a DOM structure for a tweet. 
const createTweetElement = (tweetObj) => {
  let output  =`<article class = "tweets">`;
  //-----------------------------------------------
  //tweet-header
  output += `<article class = "tweet-header">`;
  output += `<div><img src = "${tweetObj["user"].avatars}"/><label>${tweetObj["user"].name}</label></div>`;
  output += `<a class = "hidden" href = " ">${tweetObj["user"].handle}</a>`;
  output += `</article>`;
  //-----------------------------------------------
  //tweet-text
  output += `<article class ="tweet-text">`;
  output += `<p>${tweetObj["content"].text}</p>`;
  output += `</article>`;
  //-----------------------------------------------
  //tweet-footer
  output += `<article class = "tweet-footer">`;
  output += `<label>10 days ago</label>`;
  output += `<div>`;
  output += `<i class="fa fa-comment"></i>`;
  output += `<i class="fa fa-retweet"></i>`;
  output += `<i class="fa fa-heart"></i>`;
  output += `</div>`;
  output += `</article>`;
  //-------------------------------
  output += `</article>`;

  return output;
};

const renderStyle = () => {
  $(".tweets").on('mouseover',function(event){    
    $(event.currentTarget).children(".tweet-header").children("a").removeClass("hidden");    
  });
  
  $(".tweets").on('mouseleave',function(event){   
    $(event.currentTarget).children(".tweet-header").children("a").addClass("hidden");
  });
};

const renderTweet = (tweets) => {
  for(let tweetObj of tweets) {
    const tweet = createTweetElement(tweetObj);
    $('.tweets-container').prepend(tweet);
    renderStyle();
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
     console.log(latestTweet);
     renderTweet(latestTweet);
    } else {
      renderTweet(result);
    }             
  }).catch(error => {
    console.log(error);
  });
}; 

const isInvalidTweet = (tweet) => {  
  if (!tweet) {
    return 'Please add some text to Tweet'; 
  }
  if(tweet.length > 140) {
    return 'Tweet content is too long';
  }
  return false;
}

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
        loadTweets(true);        
      });
    } else {
      alert(error);      
    }    
  });  
});
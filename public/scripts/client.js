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
  output += `<h6>${tweetObj["content"].text}</h6>`;
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

const renderTweet = (tweets) => {
  for(let tweetObj of tweets) {
    const tweet = createTweetElement(tweetObj);
    $('.tweets-container').append(tweet);
  }
}

//get the tweets from the Server in JSON format
const loadTweets = () => {  
  $.ajax({
    url : '/tweets',
    method : 'GET'
  }).then(result => {
    renderTweet(result);;
  }).catch(error => {
    console.log(error);
  });
}; 


$(document).ready(function(){  

  loadTweets();

  //Post the Tweet
  $("form").on("submit",function(event) {  
    //prevents the default behaviour of the form sending the post request and reloading the page.
    event.preventDefault();    
    //handle the post request asynchronously.
     $.ajax({
       url : '/tweets/',
       method : 'POST',
       data : $(this).serialize()
     }).then(result => {
       console.log('successfull');
     });
  });

  $(".tweets").on('mouseover',function(event){
    $(event.currentTarget).children(".tweet-header").children("a").removeClass("hidden");    
  });

  $(".tweets").on('mouseleave',function(){
    $(event.currentTarget).children(".tweet-header").children("a").addClass("hidden");
  });

});
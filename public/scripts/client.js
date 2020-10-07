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


$(document).ready(function(){
  
  const obj = {
         "user": {
           "name": "Newton",
           "avatars": "https://i.imgur.com/73hZDYK.png",
           "handle": "@SirIsaac"
         },
         "content": {
           "text": "If I have seen further it is by standing on the shoulders of giants"
         },
         "created_at": 1461116232227
       };

  const tweet = createTweetElement(obj);
  console.log(tweet);
  $('.tweets-container').append(tweet);
  
  $(".tweets").on('mouseover',function(event){
    $(event.currentTarget).children(".tweet-header").children("a").removeClass("hidden");    
  });

  $(".tweets").on('mouseleave',function(){
    $(event.currentTarget).children(".tweet-header").children("a").addClass("hidden");
  });
});
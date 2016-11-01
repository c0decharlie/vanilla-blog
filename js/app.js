(function(){

 // get current date
 function currentDate() {
   var d = new Date();
   var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   return d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+", "+d.getDate() +" "+month[d.getMonth()]+" "+d.getFullYear();
 }

 // get the post content data
 function getContent() {
   var title = document.getElementById('title');
   var content = document.getElementById('content');
   var author = document.getElementById('author');
   var postDate = currentDate();
   var id = postNumber(true);
   return {
    'id': id,
    'title':title.value,
    'author':author.value,
    'content':content.value,
    'date': postDate,
    'comments': []
   };
 }

 // check the post quantity.
 function postNumber(bool) {
   if (bool) {
     // check if there's any post in localstorage
     if (localStorage.postNum) {
       // increment post quantity
       localStorage.postNum++;
     } else {
       // create first post
       localStorage.setItem('postNum', 1);
     }
   }
  return localStorage.postNum;
 }

 // create post container
 function createPostContainer(parentContainer, post) {
   //create div post container
   var container = document.createElement("div");
   var postId = post.id;
   //add post classes
   container.classList.add('post', "post-"+postId);
   //create post template and add content
   container.innerHTML = "<div class=\"post-body\">"+
                         "<div class=\"post-title\"><h2>"+post.title+"</h2></div>" +
                         "<div class=\"post-author\"><h5> Author: "+post.author+"</h5></div>" +
                         "<div class=\"post-date\"><h5>"+post.date+"</h5></div>"+
                         "<div class=\"post-content\"><p>"+post.content +"</p></div>" +
                         "</div>"+
                         "<div class=\"post-comments\" id=\"comment-container-"+postId+"\">"+
                         "<hr>"+
                         "<h4>Comments:</h4>"+
                         "<div class=\"comments\"></div>"+
                         "<h4>Write a comment:</h4>"+
                         "<form id=\"add-comment-"+postId+"\">"+
                         "<label >Your name:</label>"+
                         "<input type=\"text\" class=\"comment-author form-control\" id=\"coment-author-"+postId+"\" placeholder=\"Author\" required>"+
                         "<label>Comment:</label>"+
                         "<textarea class=\"comment-text form-control\" placeholder=\"Write your comment here\" required></textarea>"+
                         "<button class=\"btn comment-add\" type=\"submit\">Add</button>"+
                         "</form>"+
                         "</div>";
  //add template to DOM
   parentContainer.insertBefore(container, null);
   // add post eventhandler here
   commentEventListener(postId);
 }

  function savePost(post) {
    // stringify the post object
    var stringPost = JSON.stringify(post);
    //save post to localstorage
    localStorage.setItem("Post-"+post.id, stringPost);
  }

function commentEventListener(id) {
  var commentContentWrapper = document.getElementById('comment-container-'+id);
  var commentForm = document.getElementById('add-comment-'+id);
  var commentsContainer = commentContentWrapper.getElementsByClassName('comments')[0];
  var commentButton = commentContentWrapper.getElementsByClassName('comment-add')[0];
  commentForm.addEventListener('submit',function(e){
    e.preventDefault();
    // get the comment content
    var commentContent = getCommentData(commentContentWrapper);
    // save comment to localStorage
    saveComment(commentContent, id);
    // add object to DOM
    addComment(commentsContainer, commentContent);
    // clear input fields
    clearInputs(commentContentWrapper);
  });
}

function getCommentData(container) {
  // find parent comment container
  var commentAuthor = container.getElementsByClassName('comment-author')[0].value;
  var commentText = container.getElementsByClassName('comment-text')[0].value;
  var commentDate = currentDate();
  return {
    "commentAuthor":commentAuthor,
    "commentText":commentText,
    "commentDate":commentDate
  };
}

function addComment(container, commentContent) {
  var commentsContainer = container;
  // add comment container
  var comment = document.createElement("div");
  comment.innerHTML = "<div class=\"comment\">"+
                      "<div class=\"comment-content\"><p>"+commentContent.commentText+"</p></div>"+
                      "<div class=\"comment-data\">"+
                      "<span class=\"author\">By: "+commentContent.commentAuthor+"</span>"+
                      "<span class=\"date\"> at "+commentContent.commentDate+"</span>"+
                      "</div>"+
                      "</div>";
  commentsContainer.insertBefore(comment, null);
}

function saveComment(commentObj, id) {
  // parse JSON to string
  var commentJSON = JSON.stringify(commentObj);
  // find post in localStorage
  if(localStorage.length) {
    for (var prop in localStorage) {
      var value = localStorage[prop];
      var postObject = JSON.parse(value);
      if (typeof(postObject) == 'object') {
        if (postObject.id == id) {
          postObject.comments.push(commentJSON);
        }
         localStorage[prop] = JSON.stringify(postObject);
      }
    }
  }
}

// if any posts exist, add them to blog with comments
 function existingPosts(container) {
   if(localStorage.length) {
     var blogContainer = document.getElementById('blog');
     for (var key in localStorage) {
       var value = localStorage[key];
       var postObject = JSON.parse(value);
       if(typeof(postObject) == 'object') {
         createPostContainer(blogContainer, postObject);
         if (postObject.comments != []) {
           var comments = postObject.comments;
           var postId = postObject.id;
           for (var i = 0 ; i < comments.length; i++) {
               var commentContainer = document.getElementById('comment-container-'+postId);
               var commentsOut = commentContainer.getElementsByClassName('comments')[0];
               var commentContent = JSON.parse(comments[i]);
               addComment(commentsOut, commentContent);
           }
         }
       }
     }
   }
 }


function clearInputs(container) {
  var inputs = container.getElementsByTagName('input');
  var textareas = container.getElementsByTagName('textarea');
  if (inputs.length) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
  if (textareas.length) {
    for (var x = 0; x < textareas.length; x++) {
      textareas[x].value = "";
    }
  }
}

function init() {
  existingPosts();
}

 // delete posts from localstorage
 var clearPosts = document.getElementById('clearBlog');
 clearPosts.addEventListener('click', function(){
   localStorage.clear();
   location.reload();
 });

// add post to DOM
 var TestButton = document.getElementById('post-form');
 TestButton.onsubmit = function(){
   var post = getContent();
   var container = document.getElementById('blog');
   var createPost = document.getElementsByClassName('create-post')[0];
   //  check post number
   savePost(post);
   createPostContainer(container, post);
   clearInputs(createPost);
 };

 return init();

}());

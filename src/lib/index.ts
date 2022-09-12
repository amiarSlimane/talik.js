import "./index.scss";

var commentsTemplate = require("./views/comments.handlebars");
var containerTemplate = require("./views/container.handlebars");

type comment =  {
  author: string,
  content: string
  replies: comment[]
}

class Talik {

  sendCommentButton:HTMLElement;
  commentInput:HTMLElement;
  commentsBlock:HTMLElement;
  comments:comment[];

  constructor() {
    console.log("Talik constructor loaded");

    const talikBlock = document.getElementById("talik");

    const containerElement= document.createElement("div");
    containerElement.id = 'talik_container';
    containerElement.innerHTML = containerTemplate();
    talikBlock.appendChild(containerElement);

    
    this.comments = this.getComments();

    const commentsBlockElement= document.getElementById('talik_comments') //document.createElement("div");
    commentsBlockElement.innerHTML = commentsTemplate({
      comments: this.comments , 
    });
     

    
    

    this.sendCommentButton = document.getElementById('sendComment');
    this.sendCommentButton.addEventListener('click', this.addComment)

    this.commentsBlock = document.getElementById('talik_comments');

    this.commentInput = document.getElementById('commentInput');
   
  }

  init = (): boolean => {
    console.log("Init Talik.js");
    
    return true;
  };


  
  getComments = ():comment[] =>{

    return [
      {
        author: 'slimane amiar',
        content: 'hello it is me from talik.io',
        replies:[
          {
            author: 'Allaoua amiar',
            content: 'hello it is me from talik.io hello it is me from talik.io hello it is me from talik.io hello it is me from talik.io hello it is me from talik.io hello it is me from talik.io hello it is me from talik.io hello it is me from talik.io',
            replies:[
              {
                author: 'Abderazak amiar',
                content: 'hello it is me from talik.io',
                replies:[],
              },
              {
                author: 'slimane amiar',
                content: 'hello it is me from talik.io',
                replies:[
                  {
                    author: 'slimane amiar',
                    content: 'hello it is me from talik.io',
                    replies:[],
                  },
                  {
                    author: 'slimane amiar',
                    content: 'hello it is me from talik.io',
                    replies:[],
                  }
                ],
              }
            ],
          }
        ]
      },
      {
        author: 'slimane amiar',
        content: 'hello it is me from talik.io',
        replies:[]
      },
      {
        author: 'slimane amiar',
        content: 'hello it is me from talik.io',
        replies:[]
      },
    ];
  }


  addComment = async () =>{

    const comment:comment = {
      author:'slimane amiar',
      content:this.commentInput.innerHTML,
      replies:[]
    } 
    const body = JSON.stringify(comment);
    const url = 'http://localhost:3080/api/v1/comments/111111111111111111111111';
    const reqOptions:RequestInit= {
      method:'POST',
      headers:{
        'content-type':'application/json; charset=utf-8'
      },
      body: body
    }

    const response = await fetch(url, reqOptions);
    const jsonResponse = await response.json();
    
    const addedComment:comment = jsonResponse.data
    
    this.comments.push(addedComment);

    this.commentsBlock.innerHTML = commentsTemplate({
      comments: this.comments , 
    });
    

  }


  editComment = ():comment => {

    return null;
  }
}



export default Talik;

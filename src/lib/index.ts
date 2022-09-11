import "./index.scss";

var commentTemplate = require("./views/comments.handlebars");

type comment =  {
  author: string,
  content: string
  replies: comment[]
}

class Talik {
  constructor() {
    console.log("Talik constructor loaded");
    const comments = this.getComments();
    document.querySelector("body").innerHTML = commentTemplate({
      comments: comments , 
    });



   
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


  addComment = ():comment[] =>{

    return null;
  }


  editComment = ():comment => {

    return null;
  }
}



export default Talik;

import "./index.scss";

var commentsTemplate = require("./views/comments.handlebars");
var containerTemplate = require("./views/container.handlebars");
var replyInputTemplate = require("./views/reply_input.handlebars");

type comment = {
  author?: string,
  content: string
  replies?: comment[]
}

const host = 'https://talik.io';

class Talik {

  sendCommentButton: HTMLElement;
  commentInput: HTMLElement;
  commentsBlock: HTMLElement;
  comments: comment[];
  replyCommentId: string;

  constructor() {

    console.log("Talik constructor loaded");

    const talikBlock = document.getElementById("talik");

    const containerElement = document.createElement("div");
    containerElement.id = 'talik_container';
    containerElement.innerHTML = containerTemplate();
    talikBlock.appendChild(containerElement);

    let self = this;

    this.getComments().then((comments) => {
      self.comments = comments;
    }).then(() => {

      const commentsBlockElement = document.getElementById('talik_comments') //document.createElement("div");
      commentsBlockElement.innerHTML = commentsTemplate({
        comments: this.comments,
      });

      
      this.sendCommentButton = document.getElementById('sendComment');
      this.sendCommentButton.addEventListener('click', this.addComment);

      let sendCommentReplyButtons = document.querySelectorAll('.sendCommentReply');

      sendCommentReplyButtons.forEach((item)=>{
        item.addEventListener('click',this.addCommentReply, false )

      })

      this.commentsBlock = document.getElementById('talik_comments');

      this.commentInput = document.getElementById('commentInput');
    });
  }

  wrapper = (evt:Event) => {
    console.log('evt', evt);
    
      // this.addCommentReply(evt);
  }
  

  init = (): boolean => {
    console.log("Init Talik.js");

    return true;
  };



  getComments = async (): Promise<comment[]> => {

    const postId = '111111111111111111111111';
    const reqOptions: RequestInit = {
      method: 'GET'
    }
    const url = `${host}/api/v1/comments/post/${postId}?limit=10`
    const response = await fetch(url, reqOptions);
    const jsonResponse = await response.json();
    console.log('jsonResponse', jsonResponse.data.data)
    return jsonResponse.data.data;
  }


  addComment = async () => {

    const comment: comment = {
      content: this.commentInput.innerHTML
    }
    const body = JSON.stringify(comment);
    const url = `${host}/api/v1/comments/111111111111111111111111`;
    const reqOptions: RequestInit = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: body
    }

    const response = await fetch(url, reqOptions);
    const jsonResponse = await response.json();

    const addedComment: comment = jsonResponse.data

    this.comments.push(addedComment);

    this.commentsBlock.innerHTML = commentsTemplate({
      comments: this.comments,
    });
  }

  addCommentReply = async (evt:Event) => {
    
    const { target } = evt;
    this.replyCommentId = (target as HTMLButtonElement).value;

    let replyInputContainer = document.getElementById(`reply_${this.replyCommentId}`)
   
    replyInputContainer.innerHTML = replyInputTemplate();
    const comment: comment = {
      content: this.commentInput.innerHTML
    }
    const body = JSON.stringify(comment);
    const url = `${host}/api/v1/comments/111111111111111111111111/comment/${this.replyCommentId}`;
    const reqOptions: RequestInit = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: body
    }

    // const response = await fetch(url, reqOptions);
    // const jsonResponse = await response.json();

    // const addedComment: comment = jsonResponse.data

    // this.comments.push(addedComment);

    // this.commentsBlock.innerHTML = commentsTemplate({
    //   comments: this.comments,
    // });
  }

  editComment = (): comment => {

    return null;
  }
}



export default Talik;

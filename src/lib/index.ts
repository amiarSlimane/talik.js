import { flatten, unflatten } from "flat";
import "./index.scss";

var commentsTemplate = require("./views/comments.handlebars");
var containerTemplate = require("./views/container.handlebars");
var replyInputTemplate = require("./views/reply_input.handlebars");

interface comment {
  author?: string,
  content: string
  replies?: comment[]
}
declare const PRODUCTION: boolean;
declare const SERVICE_URL: string;
 
console.log(`isProduction ${PRODUCTION}`);
console.log(`SERVICE_URL ${SERVICE_URL}`);
 


class Talik {

  sendCommentButton: HTMLElement;
  commentInput: HTMLElement;
  commentsBlock: HTMLElement;
  comments: comment[];
  replyCommentId: string;

  constructor() {

    console.log("Talik constructor loaded");


  }

  wrapper = (evt: Event) => {
    console.log('evt', evt);

    // this.addCommentReply(evt);
  }


  init = (): boolean => {
    console.log("Init Talik.js");


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
     

      this.attachEvents();

      this.commentsBlock = document.getElementById('talik_comments');

      this.commentInput = document.getElementById('commentInput');
    });

    return true;
  };



  getComments = async (): Promise<comment[]> => {

    const postId = '111111111111111111111111';
    const reqOptions: RequestInit = {
      method: 'GET'
    }
    const url = `${SERVICE_URL}/api/v1/comments/post/${postId}?limit=10`
    const response = await fetch(url, reqOptions);
    const jsonResponse = await response.json();
    return jsonResponse.data.data;
  }


  addComment = async () => {

    const comment: comment = {
      content: this.commentInput.innerHTML
    }
    const body = JSON.stringify(comment);
    const url = `${SERVICE_URL}/api/v1/comments/111111111111111111111111`;
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


    this.attachEvents();
  }

  attachEvents =  ()=>{
    this.sendCommentButton = document.getElementById('sendComment');
    this.sendCommentButton.addEventListener('click', this.addComment);

    let sendCommentReplyButtons = document.querySelectorAll('.sendCommentReply');

    sendCommentReplyButtons.forEach((item) => {
      item.addEventListener('click', this.addCommentReply, false)

    });

  }
  addCommentReply = async (evt: Event) => {

    const { target } = evt;
    this.replyCommentId = (target as HTMLButtonElement).value;

    let replyInputContainer = document.getElementById(`reply_${this.replyCommentId}`)

    replyInputContainer.innerHTML = replyInputTemplate({ id: this.replyCommentId });

    const sendReplyButton = document.getElementById(`send_reply_${this.replyCommentId}`);
    sendReplyButton.addEventListener('click', this.sendReply, true)

  }

  sendReply = async (evt: Event) => {

    const { target } = evt;
    const replyCommentId = (target as HTMLButtonElement).value;

    const reply_content = document.getElementById(`reply_content_${replyCommentId}`);
    console.log('Sending the reply', reply_content.innerHTML);

    const comment: comment = {
      content: reply_content.innerHTML
    }
    const body = JSON.stringify(comment);
    const url = `${SERVICE_URL}/api/v1/comments/111111111111111111111111/comment/${replyCommentId}`;
    const reqOptions: RequestInit = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: body
    }

    const response = await fetch(url, reqOptions);
    const jsonResponse = await response.json();

    const addedCommentReply: comment = jsonResponse.data


    const flatten_comments = flatten(this.comments);

    const found = Object.keys(flatten_comments).find(key => flatten_comments[key] === replyCommentId);
    const commentPath = found.substring(0, found.length - 4);

    console.log('commentPath ', commentPath);


    let newPath = '';
    commentPath.split('.').forEach((key) => {
      const index = parseInt(key);
      if (isNaN(index)) {
        newPath = newPath + `['${key}']`
      } else {
        newPath = newPath + `[${key}]`
      }
    })

    const comments = this.comments;
    const toeval = `comments${newPath}`;
    const parentOfReply = eval(toeval);
    parentOfReply.replies.push(addedCommentReply)


    this.commentsBlock.innerHTML = commentsTemplate({
      comments: this.comments,
    });

    this.attachEvents();

  }


  editComment = (): comment => {

    return null;
  }
}



export default Talik;

import "./index.scss";
interface comment {
    author?: string;
    content: string;
    replies?: comment[];
}
declare class Talik {
    sendCommentButton: HTMLElement;
    commentInput: HTMLElement;
    commentsBlock: HTMLElement;
    comments: comment[];
    replyCommentId: string;
    constructor();
    wrapper: (evt: Event) => void;
    init: () => boolean;
    getComments: () => Promise<comment[]>;
    addComment: () => Promise<void>;
    addCommentReply: (evt: Event) => Promise<void>;
    editComment: () => comment;
}
export default Talik;

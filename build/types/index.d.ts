import "./index.scss";
declare type comment = {
    author: string;
    content: string;
    replies: comment[];
};
declare class Talik {
    constructor();
    init: () => boolean;
    getComments: () => comment[];
    addComment: () => comment[];
    editComment: () => comment;
}
export default Talik;

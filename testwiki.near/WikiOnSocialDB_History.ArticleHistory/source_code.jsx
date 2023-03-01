/*
---props---

props.pathToCurrentArticle: string ("bozon.near/widget/PrivateMailBox")
props.pathToPrevArticle: string ("bozon.near/widget/PrivateMailBox")

props.currentBlockHeight: number

props.prevBlockHeight?: number

props.findUniqueResult(
  lineCountDeleted: number, 
  lineCountInserted: inserted,
  lineCountCurrentCode: number,
  lineCountPrevCode: number,
  allLineCount: number
)?: function

props.showLineNumber?: bool

*/
const authorForWidget = "testwiki.near";

if (
  !props.pathToCurrentArticle ||
  !props.pathToPrevArticle ||
  !props.currentBlockHeight
)
  return "send pathToCurrentArticle and pathToPrevArticle and currentBlockHeight in props";

const currentArticle = JSON.parse(
  Social.get(`${props.pathToCurrentArticle}`, props.currentBlockHeight)
);

const currentCode = currentArticle.body;

if (currentCode === null) return "Loading";

const prevCode = props.prevBlockHeight
  ? JSON.parse(Social.get(`${props.pathToPrevArticle}`, props.prevBlockHeight))
      .body
  : undefined;

if (prevCode === null) return "Loading";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode, prevCode, ...props }}
  />
);

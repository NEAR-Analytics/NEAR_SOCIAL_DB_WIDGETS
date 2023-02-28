/*
---props---

props.pathToWidget: string ("bozon.near/widget/PrivateMailBox")

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
const authorForWidget = "eugenewolf507.near";
console.log(props.pathToWidget, "  -  ", props.currentBlockHeight);

if (!props.pathToWidget || !props.currentBlockHeight)
  return "send pathToWidget and currentBlockHeight in props";

const currentArticle = JSON.parse(
  Social.get(`${props.pathToWidget}`, props.currentBlockHeight)
);

const currentCode = currentArticle.body;

if (currentCode === null) return "Loading";

const prevCode = props.prevBlockHeight
  ? JSON.parse(Social.get(`${props.pathToWidget}`, props.prevBlockHeight)).body
  : undefined;

if (prevCode === null) return "Loading";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode, prevCode, ...props }}
  />
);

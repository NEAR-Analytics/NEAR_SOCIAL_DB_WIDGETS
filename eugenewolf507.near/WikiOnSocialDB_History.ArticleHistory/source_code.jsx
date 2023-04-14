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

if (!props.pathToWidget || !props.currentBlockHeight)
  return "send pathToWidget and currentBlockHeight in props";

const currentCode = Social.get(
  `${props.pathToWidget}`,
  props.currentBlockHeight
).body;

if (currentCode === null) return "Loading";

const prevCode = props.prevBlockHeight
  ? Social.get(`${props.pathToWidget}`, props.prevBlockHeight).body
  : undefined;

if (prevCode === null) return "Loading";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode, prevCode, ...props }}
  />
);

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
if (!props.pathToWidget || !props.currentBlockHeight)
  return "send pathToWidget and currentBlockHeight in props";

const currentCode = Social.get(
  `${props.pathToWidget}`,
  props.currentBlockHeight
);
const prevCode = props.prevBlockHeight
  ? Social.get(`${props.pathToWidget}`, props.prevBlockHeight)
  : undefined;

if (currentCode === null || prevCode === null) return "Loading";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode, prevCode, ...props }}
  />
);

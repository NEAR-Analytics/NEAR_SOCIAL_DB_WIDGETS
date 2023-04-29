const FullWidthDiv = styled.div`
width: 100%;
height: 50%;
`;

const children = (
  <>
    <FullWidthDiv style={{ backgroundColor: "blue" }}></FullWidthDiv>
    <FullWidthDiv style={{ backgroundColor: "yellow" }}></FullWidthDiv>
  </>
);

return (
  <Widget src="ostolex.near/widget/FullScreenWrapper" props={{ children }} />
);

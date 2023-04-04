const stNEarIcon = (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.06863 18.336C13.8926 18.336 17.8046 14.424 17.8046 9.6C17.8046 4.776 13.8926 0.863999 9.06863 0.863999C4.24463 0.863999 0.332625 4.776 0.332625 9.6C0.332625 14.424 4.24463 18.336 9.06863 18.336ZM9.06863 14.208L4.38863 9.528L5.49263 8.4L9.06863 11.928L12.6206 8.4L13.7486 9.528L9.06863 14.208ZM9.06863 10.632L6.16463 7.752L7.29263 6.624L9.06863 8.424L10.8446 6.624L11.9726 7.752L9.06863 10.632ZM9.06863 7.128L7.94063 5.952L9.06863 4.848L10.1966 5.952L9.06863 7.128Z"
      fill="#032131"
    />
  </svg>
);
const Input = styled.div`
    border-radius: 8px;
    background-color: #f5ffd1;
    line-height: 48px;
    font-family: "Aeonik Fono", Arial;
    color: #032131;
    font-size: 1.125rem;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 283px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 283px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
  `;
const Frame = styled.div`
    line-height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 16.9126px;
    margin-bottom: 56px;
  `;
const Title = styled.span`
    letter-spacing: 1px;
    margin-right: 34px;
    margin-top: 3px;
    margin-bottom: -2px;
  `;
const Frame1 = styled.div`
    font-family: "Aeonik Mono", Arial;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    row-gap: 8px;
    margin-left: 4px;
  `;
const Frame2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
  `;
const Stnearcircle = styled.span`
    text-align: right;
    font-weight: 400;
    font-family: "Meta Space Icons", Arial;
    line-height: 32px;
    margin-left: 1px;
    margin-right: 2px;
    margin-top: 10px;
    margin-bottom: 10px;
  `;
const Num = styled.span`
    
  `;
const StNear = styled.span`
    text-align: right;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 18px;
    margin-left: 2px;
    margin-bottom: 5px;
  `;
const StNearIcon = styled.div`
  & svg {
      width: 29px;
      height: 32px;
    }

`;
return (
  <Input className={props.className || ""}>
    <Frame>
      <Title>You’ll get</Title>
    </Frame>
    <Frame1>
      <Frame2>
        <StNearIcon>{stNEarIcon}</StNearIcon>
        <Num>{props.amount || "0.00"}</Num>
      </Frame2>
      <StNear>stNEAR</StNear>
    </Frame1>
  </Input>
);

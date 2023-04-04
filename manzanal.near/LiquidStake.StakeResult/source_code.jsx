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
const Btc = styled.span`
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
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    margin-bottom: 5px;
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
    font-size: 2.5rem;
  `;
const StNear = styled.span`
    text-align: right;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 18px;
    margin-left: 2px;
    margin-bottom: 5px;
  `;
return (
  <Input className={props.className || ""}>
    <Frame>
      <Btc>{props.btc || "You’ll get"}</Btc>
    </Frame>
    <Frame1>
      <Frame2>
        <Num>{props.amount || "0.00"}</Num>
      </Frame2>
      <StNear>stNEAR</StNear>
    </Frame1>
  </Input>
);

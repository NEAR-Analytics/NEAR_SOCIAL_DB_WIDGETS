const value = props.value;
if (!props.onChange) {
  return "Cannot render stake input without onChange function!";
}
const data = fetch("https://api.coingecko.com/api/v3/coins/near", {
  subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});
if (!data) return "Loading...";
State.init({
  amountInUsd: 0,
});
const onChange = (e) => {
  props.onChange && props.onChange(e.target.value);
  State.update({
    amountInUsd:
      parseFloat(data.body.market_data.current_price.usd) *
      parseFloat(e.target.value),
  });
};

const Wrapper = styled.div`
    border-radius: 8px;
    background-color: #ffffff;
    border: 0.8px solid #c0c5c1;
    font-weight: 500;
    font-family: "Aeonik Mono", Arial;
    color: #032131;
    line-height: 48px;
    font-size: 2.5rem;
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
    font-size: 1.125rem;
    font-family: "Aeonik Fono", Arial;
    line-height: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 2px;
    margin-right: 65px;
  `;
const Frame1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 16.9126px;
    margin-bottom: 20px;
  `;
const Title = styled.span`
    letter-spacing: 1px;
    margin-left: 1px;
    margin-right: 5px;
    margin-top: 3px;
    margin-bottom: 2px;
  `;
const MaxButton = styled.div`
   text-align: right;
    gap: 8px;
    width: 67px;
    height: 34px;
    font-size: 1.125rem;
  `;
const Frame2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    column-gap: 8px;
    margin-left: 16px;
  `;
const Frame3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 8px;
  `;
const Num = styled.span`
  `;
const Usd = styled.div`
    color: #032131;
    font-weight: 400;
    line-height: 18px;
    text-align: right;
    font-size: 0.75rem;
    line-height: 18px;
    margin-left: 1px;
    margin-right: 1px;
    margin-bottom: 5px;
  `;
const Input = styled.input`
    font-size: 2.5rem;
     font-weight: 500;
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 2.5rem;
    border: 0;
    text-align-last: right;

`;
return (
  <Wrapper>
    <Frame>
      <Frame1>
        <Title>{props.title || "NEAR Amount"}</Title>
      </Frame1>
    </Frame>
    <Frame2>
      <Frame3>
        <MaxButton
          type="button"
          class="btn  btn-outline-secondary"
          onClick={props.onClickMax}
        >
          Max
        </MaxButton>
        <Input
          value={value}
          onChange={onChange}
          type="text"
          class="form-control"
          placeholder="0"
        />
        <Usd>USD {state.amountInUsd || "0.00"}</Usd>
      </Frame3>
    </Frame2>
  </Wrapper>
);

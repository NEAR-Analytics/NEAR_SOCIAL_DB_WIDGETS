const Container = styled.div`
    input{
      background: #152528;
      border-radius: 12px;
      height: 55px;
      font-size:20px;
      color: #7E8A93;
      padding:0 15px 0 15px;
      border:none;
    }
    input:focus{
      outline:none;
      background: #152528; 
      color: #7E8A93;
    }
 
    .balance {
      font-size:12px;
      color:#4B6778;
      margin-left:6px;
      cursor:pointer;
      text-decoration:underline;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    }
`;
const { handleAmount, balance, balance$ } = props;
const { amount } = state;
State.init({
  amount: 0,
});
function changeAmount(e) {
  const value = Number(e.target.value);
  console.log("88888888888-amount", value);
  if (Big(value || 0).gt(balance || 0)) return;
  console.log("校验过了哦");
  State.update({
    amount: value,
  });
  handleAmount(value);
}
function changeToMax() {
  State.update({
    amount: balance || 0,
  });
  handleAmount(balance || 0);
}
return (
  <Container>
    <input type="number" value={amount} onChange={changeAmount} />
    <span class="balance" onClick={changeToMax}>
      Balance: {balance || "0"}(${balance$ || "0"})
    </span>
  </Container>
);

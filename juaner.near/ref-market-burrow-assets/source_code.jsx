const Container = styled.div`
   background: #1A2E33;
    .table{
        margin:0;
        border-bottom:2px solid rgba(48, 67, 82, 0.5);
    }
    .table thead tr{
        height:50px;
        border:hidden;
    }
    .table tbody tr{
        height:50px;
    }
    .table.click tbody tr{
      cursor:pointer;
    }
     .table.click tbody tr:hover{
        background: rgba(0, 0, 0, 0.1);
     }
    .table th{
        color: #7E8A93;
        font-size:14px;
        vertical-align: middle;
    }
    .table td{
        color: #fff;
        font-size:14px;
        vertical-align: middle;
        border: none;
    }
    .tokenIcon{
      width: 26px;
      height: 26px;
      border-radius:100px;
      margin-right:8px;
    }
    .rewardIcon{
      width: 16px;
      height: 16px;
      border-radius:100px;
    }
    .text_red_color{
      color:#FF6BA9;
    }
    .ml_4_ne{
        margin-left:-4px;
    }
    .flex_center{
      display:flex;
      align-items:center;
    }
    .mt_25{
      margin-top:25px;
    }
    .mt-10{
      margin-top:10px;
    }
    .font-18{
      font-size:18px;
    }
`;
const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
`;

const Modal = styled.div`
  background-color:#1A2E33;
  border-radius:12px;
  position:fixed;
  z-index:1002;
  width:30rem;
  max-width: 95vw;
  max-height: 80vh;
  padding:10px 0 20px 0;
  animation:anishow 0.3s forwards ease-out;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  @keyframes anishow {
    from {
      opacity: 0;
      transform:translate(-50%,-70%);
    }
    to {
      opacity: 1;
      transform:translate(-50%,-50%);
    }
  }
    .modal-header{
      display:flex;
      align-items:center;
      justify-content:center;
      color:#fff;
      font-weight: 700;
      font-size: 18px;
      padding:12px;
      margin-bottom:16px;
      border-bottom:2px solid rgba(48, 67, 82, 0.5);
    } 
    .modal-header .btn-close{
      position:absolute;
      right:28px;
      margin:0;
    }
    .modal-body {
        padding:0 10px;
    }
    .modal-body .tab{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:30px;
    }
    .modal-body .tab span{
      display:flex;
      align-items:center;
      justify-content:center;
      width:50%;
      height:40px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 18px;
      cursor:pointer;
      color:#fff;
    }
    .modal-body .tab span.active{
      background: #304352;
    }
   .btn-close-custom{
      position:absolute;
      right:28px;
      width:12px;
      height:12px;
      cursor:pointer;
    }
`;
/** base tool start  */
const wnearbase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRYhbWYTUtjVxjH/9fRaFBaK3Q0ahCE3HTR0kWLL0g72nEh6NaAL+BivkIXHUpblWr9Ai78CIKgQqC1xYJNVnWwdiFCF9OS4CRRM2o7TRyw+XWRJk2uebuJ/uFC7jnP89xfzrnPOee5hmwIqJc0LOmxpA8keSW1SnpD0p+SLiT9JumZpF1Je4Zh3Nh5RiUQHcAKEMWeov/5td8FRBPwFZCwCWFVAvgCaKwWxAsc1ghh1RHwrl2QR8DlHYNk9BcwWinIMJC8J5CMEsDH5UDeAa7uGSSjC8DMfb6RA9Ik6WdJ79ma09r0q6R+wzBeS1JdTsdnhUACgYA8Ho8cDofGx8d1fn5u62mrq6tyuVwyTVPBYNDa/b6kT/NaSK8jBdPX4/EgKXsNDQ1xfX1d0Tz4/f48X9M0C5n9DTzMhVkpFjA3WOaam5srCxKPx+ns7LzlW0TLGZB6IGIHRhIrK0X5AZiZmSnoV0RRoF7AaKmguYFmZ2ezv+vq6tja2iros7m5iSSamppYWlqqBAZgRMA3lcJEo1Gmpqay9y0tLRwe5i/SZ2dntLe309bWxt7eHuFwuFKYrwX8UClMLBYjkUjQ19eXbevp6SEa/X//9Pl89Pb2cnx8DGAH5jsBf9iBATg5OaGrqyvbPjg4SDKZJBQKMTo6yunpadbfBsxzkd4rbMEAHBwc0NzcnO3z+XykUqlb/jZgrgTcVAMDsLGxgWEY2f7l5eVaYG6qHpmM5ufns/2GYbC+vl4tzJWA32uBSaVSTE9PZ22cTif7+/vVwDwX8H01MJFIhJGRESKRyK0Mc7vdRCIRuzDf1il9eLalo6MjDQwMqLu7Wx0dHXI6ndre3pbb7ZYkhcNhTUxMKJFI2An7TMBjOyOzu7tLa2srLpeLeDyeZ2vNsMnJSUKhUKUjM2xrb1pYWMDhcCAJv99f0N6aYdY9qoheAA8k2d+1nzx5Uuofsri4WHSDLaKl7GQB7RQ5z1iDud1uLi9Ln9WtGVYG5hXwdt7bA3xZyNI0zbx1ZGdnpyRIRslkkv7+/jwQr9dbyPTprVcZaKRAnRQIBDBNE5fLxdraWkUgGcViMcbGxmhoaMDr9RIMBq0mB4CjYG6RLtzuq16y6iXgKZnspAu4WsvZckoAH5UEyQEaAM7vCeSCcgVcASAT+OWOQQ4oNzUlgBqBz0mXE7XoFfCUYi+rTaiHwDLpldKOXgBLWNeRIjLKm+RBPZD0SNInkj5U+svVW5LelHQl6aXSX672Jf0o6SfDMP6pNP6/QZPF1Du0/sIAAAAASUVORK5CYII=";
const closeButtonBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAERSURBVHgBtdjLDYMwEEXRUSqhY+gg0xElUAIlvOAAwkEEPJ93JVaM47OJsCyyBaBbnhFrvZAreyzPvDxT2fv8stte1L2FVPnt014H6g+GhrrA/KJuMOmoG8zeWIZmPBdGNWC+lcEBbblRrZhi2Rdo4wIzyoDR88J0lBvDQIUxmag0TAYqHRNB0TAeFNgYB4qPSUapZBZEqTByolSYGVEqxl5iD6RZe2j/a9dxTp5ODAcVxOSikjA5KANGQTzkmTHVGg4KgQ9lOgoJX+00FBKPEGEUCOcZNwrEw5UZhfUWgoJxoHppHFQJ1oiay+DIxhhQ09N1jEpyN6gJD3dEKqQuUAemGtpR5XpmEHI4bl3GGvMBHUHk6KgoFgEAAAAASUVORK5CYII=";
let MAX_RATIO = 10_000;
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;
let B = Big();
B.DP = 60; // set precision to 60 decimals

const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return B(value).div(B(10).pow(decimals));
};

const expandToken = (value, decimals) => {
  return B(value).mul(B(10).pow(decimals));
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;

const power = (x, y) => {
  if (y === 0) {
    return 1;
  } else if (y % 2 === 0) {
    return power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  } else {
    return x * power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  }
};
const nFormat = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
const {
  rewards,
  account,
  balances,
  selectedTokenId,
  amount,
  hasError,
  assets,
  tabName,
  showModal,
} = state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
/** base tool end */
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const config = Near.view(BURROW_CONTRACT, "get_config");
const onLoad = (data) => {
  State.update(data);
};
const rewardsMap = rewards
  ? rewards.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
const assetsMap = assets
  ? assets.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
// get market can burrow assets
const can_burrow_assets = assets && assets.filter((a) => a.config.can_borrow);
const market_burrow_assets =
  can_burrow_assets &&
  can_burrow_assets.map((asset) => {
    const { token_id, metadata } = asset;
    const r = rewards.find((a) => a.token_id === asset.token_id);
    const borrowApy = r.apyBaseBorrow;
    const liquidity = nFormat(asset.availableLiquidity, 2);
    const hasRewards = rewardsMap[token_id] && assetsMap[token_id];
    const rewardMap = hasRewards && rewardsMap[token_id];
    const rewardTokens = rewardMap && rewardMap.rewardTokensBorrow;
    const rewardTokensImg =
      rewardTokens &&
      rewardTokens.map((token_id, index) => {
        const metadata = assetsMap[token_id].metadata;
        return (
          <img
            class={`rewardIcon ${index > 0 ? "ml_4_ne" : ""}`}
            src={metadata.icon}
          ></img>
        );
      });
    return (
      <tr
        onClick={() => {
          handleSelect(token_id);
        }}
      >
        <td>
          <img src={metadata.icon || wnearbase64} class="tokenIcon"></img>
          {metadata.symbol}
        </td>
        <td>{toAPY(borrowApy)}%</td>
        <td>{rewardTokensImg}</td>
        <td class="text-end">{liquidity}</td>
      </tr>
    );
  });
const handleSelect = (token_id) => {
  State.update({
    selectedTokenId: token_id,
    showModal: true,
  });
};
function closeModal() {
  State.update({
    showModal: false,
  });
}
function changeTab(tabName) {
  State.update({
    tabName,
  });
}
const selectedToken = (selectedTokenId && assetsMap[selectedTokenId]) || {};
const selectedTokenMeta = selectedToken.metadata || {};
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* market */}
    <div class="fw-bold text-white mt-3 font-18">
      <span class="text_red_color">Borrow</span> Market
    </div>
    <table class="table click">
      <thead>
        <tr>
          <th scope="col" width="25%">
            Assets
          </th>
          <th scope="col" class="text-start" width="25%">
            APY
          </th>
          <th scope="col" class="text-start" width="25%">
            Rewards
          </th>
          <th scope="col" class="text-end">
            Total Liquidity
          </th>
        </tr>
      </thead>
      <tbody>{market_burrow_assets}</tbody>
    </table>
    {/* Modal*/}
    <>
      <Modal style={{ display: showModal ? "block" : "none" }}>
        <div class="modal-header">
          <div class="flex_center">
            <img
              class="tokenIcon"
              src={selectedTokenMeta.icon || wnearbase64}
            />
            {selectedTokenMeta.symbol}
          </div>
          <img
            class="btn-close-custom"
            src={closeButtonBase64}
            onClick={closeModal}
          />
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <div class="tab">
              <span
                onClick={() => {
                  changeTab("borrow");
                }}
                class={`${tabName != "repay" ? "active" : ""}`}
              >
                Borrow
              </span>
              <span
                onClick={() => {
                  changeTab("repay");
                }}
                class={`${tabName == "repay" ? "active" : ""}`}
              >
                Repay
              </span>
            </div>
            {tabName == "repay" ? (
              <Widget
                src="juaner.near/widget/ref-market-burrow-repay"
                props={{ selectedTokenId, selectedTokenMeta, showModal }}
              />
            ) : (
              <Widget
                src="juaner.near/widget/ref-market-burrow-burrow"
                props={{ selectedTokenId, showModal }}
              />
            )}
          </div>
        </div>
      </Modal>
      <Backdrop
        style={{ display: showModal ? "block" : "none" }}
        onClick={closeModal}
      ></Backdrop>
    </>
  </Container>
);

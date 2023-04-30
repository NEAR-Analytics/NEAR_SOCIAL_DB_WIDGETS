const {
  firstIconName,
  firstIconUrl,
  secondIconName,
  secondIconUrl,
  componentType,
} = props; // liNEAR, xref
const BannerData = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
   margin-bottom:16px;
  .apr{
     display:flex;
  align-items:center;
    font-size: 16px;
    color:#fff;
    margin-right:30px;
    .value{
      font-weight: 700;
      font-size: 22px;
      color: #00FFA3;
      margin-left:8px;
    }
  }
`;
const ExchangeRoute = styled.div`
   position:relative;
   padding-left:96px;
   .bigIcon{
      position:absolute;
      left:20px;
      top:-24px;
      background: #1A2E33;
      border-radius: 100%;
      padding:7px;
      margin-right:13px;
      img{
        width:46px;
        height:46px;
        border-radius:100px;
      }
    }
   .flex-center{
     display:flex;
     align-items:center;
   }
  .boldText {
    font-weight: 700;
    font-size: 22px;
    color:#fff;
  }
  .thinText{
    font-weight: 400;
    font-size: 16px;
    color:#fff;
  }
  .mx-10{
    margin:0 10px 0 10px;
  }
  .smallIcon{
     width:26px;
     height:26px;
     margin-right:10px;
     border-radius:100px;
  }
`;
const arrowIcon = (
  <svg
    width="19"
    height="8"
    viewBox="0 0 19 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.389 7.51249C13.389 7.9163 13.8588 8.14441 14.1831 7.89809L18.8076 4.3856C19.0641 4.1908 19.0641 3.8092 18.8076 3.6144L14.1831 0.101915C13.8588 -0.144409 13.389 0.0836996 13.389 0.487513V1.78088C13.389 2.04963 13.1682 2.26749 12.8958 2.26749H0.493198C0.220812 2.26749 0 2.48536 0 2.75411V5.24589C0 5.51464 0.220813 5.73251 0.493198 5.73251H12.8958C13.1682 5.73251 13.389 5.95037 13.389 6.21912V7.51249Z"
      fill="#00FFA3"
    />
  </svg>
);
function getAPY() {
  const result = fetch("https://metrics.linearprotocol.org", {
    method: "GET",
  });
  const apy = result.body.apy;
  if (!apy) return "-";
  return Big(apy).mul(100).toFixed(2) + "%";
}
function getxrefAPY() {
  const result = Near.view("xtoken.ref-finance.near", "contract_metadata");
  if (!result) return "-%";
  const { locked_token_amount, reward_per_sec } = result;
  const apr =
    (1 / locked_token_amount) *
    (Number(reward_per_sec) * 365 * 24 * 60 * 60 * 100);
  return Big(apr).toFixed(2) + "%";
}
const apy = componentType == "liNEAR" ? getAPY() : getxrefAPY();
return (
  <BannerData>
    <ExchangeRoute>
      <div class="bigIcon">
        <img src={firstIconUrl} />
      </div>
      <div class="flex-center">
        <span class="boldText">{firstIconName}</span>
        <span class="mx-10">{arrowIcon}</span>
        <img class="smallIcon" src={secondIconUrl} />
        <span class="thinText">{secondIconName}</span>
      </div>
    </ExchangeRoute>
    <div class="apr">
      apr<span class="value">{apy}</span>
    </div>
  </BannerData>
);

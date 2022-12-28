let data = fetch("https://near.zavodil.ru/pools.txt");
if (!data) {
  return "Loading";
}

let flags = {
  ad: -352,
  ae: -368,
  af: -384,
  ag: -400,
  ai: -416,
  al: -432,
  am: -448,
  an: -464,
  ao: -480,
  aq: -496,
  ar: -512,
  as: -528,
  at: -544,
  au: -560,
  aw: -576,
  az: -592,
  ba: -608,
  bb: -624,
  bd: -640,
  be: -656,
  bf: -672,
  bg: -688,
  bh: -704,
  bi: -720,
  bj: -736,
  bm: -752,
  bn: -768,
  bo: -784,
  br: -800,
  bs: -816,
  bt: -832,
  bw: -848,
  by: -864,
  bz: -880,
  ca: -896,
  cg: -912,
  cf: -928,
  cd: -944,
  ch: -960,
  ci: -976,
  ck: -992,
  cl: -1008,
  cm: -1024,
  cn: -1040,
  co: -1056,
  cr: -1072,
  cu: -1088,
  cv: -1104,
  cy: -1120,
  cz: -1136,
  de: -1152,
  dj: -1168,
  dk: -1184,
  dm: -1200,
  do: -1216,
  dz: -1232,
  ec: -1248,
  ee: -1264,
  eg: -1280,
  eh: -1296,
  er: -1312,
  es: -1328,
  et: -1344,
  fi: -1360,
  fj: -1376,
  fm: -1392,
  fo: -1408,
  fr: -1424,
  ga: -1440,
  gb: -1456,
  gd: -1472,
  ge: -1488,
  gg: -1504,
  gh: -1520,
  gi: -1536,
  gl: -1552,
  gm: -1568,
  gn: -1584,
  gp: -1600,
  gq: -1616,
  gr: -1632,
  gt: -1648,
  gu: -1664,
  gw: -1680,
  gy: -1696,
  hk: -1712,
  hn: -1728,
  hr: -1744,
  ht: -1760,
  hu: -1776,
  id: -1792,
  mc: -1792,
  ie: -1808,
  il: -1824,
  im: -1840,
  in: -1856,
  iq: -1872,
  ir: -1888,
  is: -1904,
  it: -1920,
  je: -1936,
  jm: -1952,
  jo: -1968,
  jp: -1984,
  ke: -2000,
  kg: -2016,
  kh: -2032,
  ki: -2048,
  km: -2064,
  kn: -2080,
  kp: -2096,
  kr: -2112,
  kw: -2128,
  ky: -2144,
  kz: -2160,
  la: -2176,
  lb: -2192,
  lc: -2208,
  li: -2224,
  lk: -2240,
  lr: -2256,
  ls: -2272,
  lt: -2288,
  lu: -2304,
  lv: -2320,
  ly: -2336,
  ma: -2352,
  md: -2368,
  me: -2384,
  mg: -2400,
  mh: -2416,
  mk: -2432,
  ml: -2448,
  mm: -2464,
  mn: -2480,
  mo: -2496,
  mq: -2512,
  mr: -2528,
  ms: -2544,
  mt: -2560,
  mu: -2576,
  mv: -2592,
  mw: -2608,
  mx: -2624,
  my: -2640,
  mz: -2656,
  na: -2672,
  nc: -2688,
  ne: -2704,
  ng: -2720,
  ni: -2736,
  nl: -2752,
  no: -2768,
  np: -2784,
  nr: -2800,
  nz: -2816,
  om: -2832,
  pa: -2848,
  pe: -2864,
  pf: -2880,
  pg: -2896,
  ph: -2912,
  pk: -2928,
  pl: -2944,
  pr: -2960,
  ps: -2976,
  pt: -2992,
  pw: -3008,
  py: -3024,
  qa: -3040,
  re: -3056,
  ro: -3072,
  rs: -3088,
  ru: -3104,
  rw: -3120,
  sa: -3136,
  sb: -3152,
  sc: -3168,
  sd: -3184,
  se: -3200,
  sg: -3216,
  si: -3232,
  sk: -3248,
  sl: -3264,
  sm: -3280,
  sn: -3296,
  so: -3312,
  sr: -3328,
  st: -3344,
  sv: -3360,
  sy: -3376,
  sz: -3392,
  tc: -3408,
  td: -3424,
  tg: -3440,
  th: -3456,
  tj: -3472,
  tl: -3488,
  tm: -3504,
  tn: -3520,
  to: -3536,
  tr: -3552,
  tt: -3568,
  tv: -3584,
  tw: -3600,
  tz: -3616,
  ua: -3632,
  ug: -3648,
  us: -3664,
  uy: -3680,
  uz: -3696,
  va: -3712,
  vc: -3728,
  ve: -3744,
  vg: -3760,
  vi: -3776,
  vn: -3792,
  vu: -3808,
  ws: -3824,
  ye: -3840,
  za: -3856,
  zm: -3872,
  zw: -3872,
};

const FlagItem = styled.div`
display: inline-block;
    height: 16px;
    width: 16px;
    vertical-align: text-bottom;
    line-height: 16px;
    background: url(https://github.s3.amazonaws.com/downloads/lafeber/world-flags-sprite/flags16.png) no-repeat;
    background-position: 0 ${(props) => props.flagPosition}px;    
      
  `;

let validatorsData = Social.get("pool-details.near/**", "final") ?? {};
let validators = [];
Object.entries(validatorsData).forEach((item) => {
  validators[item[0]] = item[1];
});
console.log(validators);

data = JSON.parse(data.body);
if (!data.data.length) {
  return "Illegal data";
}

let pools = data.data.map((pool) => {
  let details = validators[pool.account_id] ?? {};

  return (
    <tr className="align-middle">
      <td scope="row">
        {!!details.location.country_code ? (
          <>
            <FlagItem
              flagPosition={
                flags[details.location.country_code.toLowerCase()] ?? null
              }
            />
          </>
        ) : (
          ""
        )}
        {!!details.name ? `${details.name} ` : ""}
        {pool.account_id}
        {details.description ? (
          <div class="form-text fw-normal">{details.description}</div>
        ) : (
          ""
        )}
        {details["pool-owner"] ? (
          <div class="form-text fw-normal">
            Managed by
            <Widget
              src="zavodil.near/widget/ProfileLine"
              props={{ accountId: details["pool-owner"] }}
            />
            <span className="ms-2"> </span>
            <Widget
              src="zavodil.near/widget/LinkTree"
              props={{ linktree: details.linktree }}
            />
          </div>
        ) : (
          ""
        )}
      </td>
      <td class="text-center">{parseFloat(pool.numerator.toFixed(2))}%</td>
      <td class="text-center">
        {pool.number_of_accounts.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")}
      </td>
      <td class="text-end">
        {pool.stake.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")}&nbsp;Ⓝ
      </td>
      <td>
        <a
          className="btn btn-primary"
          href={`/#/zavodil.near/widget/NearStake?poolId=${
            pool.account_id
          }&serviceFee=${parseFloat(pool.numerator.toFixed(2))}`}
          role="button"
        >
          Stake
        </a>
      </td>
    </tr>
  );
});

return (
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Pool&nbsp;ID</th>
          <th>Service&nbsp;Fee&nbsp;</th>
          <th>Delegators&nbsp;</th>
          <th>Current&nbsp;Stake&nbsp;</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>{pools}</tbody>
    </table>
  </div>
);

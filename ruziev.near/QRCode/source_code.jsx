const PRIMARY_COLOR = "#3D7FFF";
const accountId = context.accountId || "self.social.near";
const isKnownUser = !!context.accountId;
const fileName = `${accountId}.svg`;
const NFT_CONTRACT = "social-qr-nft.near";
const SVG_CONTENT_TYPE = "image/svg+xml";

const NEAR_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="62" fill="none" viewBox="0 0 50 62" >
  <path fill="#000" fill-opacity="20%" d="M16.278 44.745v7.233a.104.104 0 0 1-.103.102h-.767a1.042 1.042 0 0 1-.872-.471l-3.444-5.28.12 2.637v3.012a.104.104 0 0 1-.1.102h-1a.106.106 0 0 1-.075-.03.104.104 0 0 1-.031-.072v-7.233a.104.104 0 0 1 .065-.097.105.105 0 0 1 .04-.008h.753a1.049 1.049 0 0 1 .875.471l3.442 5.269-.109-2.626v-3.01a.104.104 0 0 1 .065-.096.105.105 0 0 1 .04-.008h1.004a.106.106 0 0 1 .097.105ZM26.53 52.08h-1.063a.104.104 0 0 1-.085-.045.102.102 0 0 1-.01-.095l2.808-7.2a.155.155 0 0 1 .153-.1h1.328a.153.153 0 0 1 .144.1l2.812 7.2a.102.102 0 0 1-.098.14h-1.06a.103.103 0 0 1-.098-.066l-2.267-5.93a.105.105 0 0 0-.194 0l-2.267 5.93a.108.108 0 0 1-.102.066Zm13.448-.168-2.109-2.67c1.19-.223 1.887-1.02 1.887-2.243 0-1.403-.923-2.359-2.55-2.359h-2.94a.157.157 0 0 0-.158.154.988.988 0 0 0 .294.704 1.004 1.004 0 0 0 .71.291h1.966c.986 0 1.455.499 1.455 1.22 0 .723-.458 1.235-1.455 1.235h-2.811a.159.159 0 0 0-.159.155v3.582a.105.105 0 0 0 .106.102h1.003a.104.104 0 0 0 .103-.102v-2.673h1.158l1.83 2.37a1.038 1.038 0 0 0 .834.405h.76a.105.105 0 0 0 .099-.12.105.105 0 0 0-.023-.051Zm-16.62-7.272h-4.655a.14.14 0 0 0-.14.138 1.019 1.019 0 0 0 1.02 1.011h3.775a.104.104 0 0 0 .103-.105v-.94a.104.104 0 0 0-.103-.104Zm0 6.29h-3.477a.102.102 0 0 1-.106-.101v-1.865a.104.104 0 0 1 .106-.105h3.208a.104.104 0 0 0 .097-.063.102.102 0 0 0 .009-.04v-.942a.102.102 0 0 0-.106-.102h-4.367a.159.159 0 0 0-.11.045.156.156 0 0 0-.048.11v4.059a.156.156 0 0 0 .158.154h4.636a.106.106 0 0 0 .103-.102v-.942a.104.104 0 0 0-.03-.073.106.106 0 0 0-.073-.032ZM34.08 11.433l-6.272 9.234a.657.657 0 0 0 .114.86.67.67 0 0 0 .875.008l6.175-5.308a.25.25 0 0 1 .411.188v16.63a.246.246 0 0 1-.165.23.251.251 0 0 1-.276-.073l-18.653-22.16a3.224 3.224 0 0 0-2.442-1.121h-.65a3.21 3.21 0 0 0-2.26.928A3.159 3.159 0 0 0 10 13.092v23.422a3.16 3.16 0 0 0 .938 2.239 3.21 3.21 0 0 0 4.981-.586l6.273-9.234a.657.657 0 0 0-.114-.86.67.67 0 0 0-.875-.008l-6.175 5.308a.251.251 0 0 1-.411-.188v-16.63a.247.247 0 0 1 .165-.23.252.252 0 0 1 .276.073l18.653 22.16a3.2 3.2 0 0 0 2.442 1.122h.65a3.21 3.21 0 0 0 2.26-.929c.6-.595.937-1.401.937-2.243V13.086a3.16 3.16 0 0 0-.938-2.239 3.21 3.21 0 0 0-4.981.586Z"/>
  </svg>`;

const FUTURE_IS_NEAR = `<svg xmlns="http://www.w3.org/2000/svg" width="86" height="85" fill="none" viewBox="0 0 86 85">
  <path fill="#000" fill-opacity="20%" d="M9.388 81.601 4.297 76.51l3.111-3.111.962.961-2.15 2.15 1.103 1.103 1.726-1.725.961.961-1.725 1.726 2.065 2.064-.962.962Zm5.928-5.715c-.41.41-.854.688-1.33.834a2.574 2.574 0 0 1-1.432.025c-.476-.127-.918-.395-1.325-.803l-3.175-3.174.968-.983 3.175 3.175c.168.167.348.29.541.37.194.08.39.121.587.121.2-.002.394-.042.58-.12a1.696 1.696 0 0 0 .856-.863 1.458 1.458 0 0 0-.004-1.163 1.657 1.657 0 0 0-.368-.538l-3.175-3.174.976-.976 3.182 3.182c.408.407.675.85.803 1.326.127.476.119.953-.025 1.431-.146.477-.424.92-.834 1.33Zm4.133-4.346-4.193-4.193-1.605 1.605-.898-.898 4.172-4.172.898.898-1.605 1.605 4.193 4.193-.962.962Zm5.313-5.1c-.41.41-.853.688-1.33.834a2.574 2.574 0 0 1-1.431.025c-.476-.128-.918-.395-1.326-.803L17.5 63.32l.969-.983 3.175 3.175c.167.167.347.291.54.371.194.08.39.12.588.12.2-.002.393-.042.58-.12.186-.082.354-.199.505-.35a1.58 1.58 0 0 0 .35-.512 1.458 1.458 0 0 0-.004-1.163 1.657 1.657 0 0 0-.367-.538l-3.175-3.175.976-.976 3.182 3.182c.407.408.675.85.802 1.326.128.476.12.954-.024 1.432-.147.476-.425.92-.835 1.33Zm2.953-3.166-5.091-5.09 2.15-2.15c.049-.05.117-.114.204-.191.088-.083.17-.151.248-.205.351-.257.7-.406 1.046-.446.35-.042.686.007 1.012.149.323.139.627.35.912.636.426.427.686.898.777 1.414.09.514-.056 1.033-.438 1.556l-.396.453-1.188 1.187 1.726 1.726-.962.961Zm2.87-2.87-3.075-1.068.799-1.181 3.366 1.16-1.09 1.089Zm-4.532-.715 1.146-1.145c.05-.05.101-.106.155-.17.055-.064.1-.127.135-.19a.83.83 0 0 0 .123-.478 1 1 0 0 0-.134-.424 1.58 1.58 0 0 0-.251-.336 1.526 1.526 0 0 0-.332-.248.955.955 0 0 0-.425-.134.812.812 0 0 0-.48.12 1.18 1.18 0 0 0-.191.135 3.07 3.07 0 0 0-.17.155l-1.146 1.146 1.57 1.57Zm6.399-1.152-5.091-5.09 3.323-3.324.898.898-2.361 2.361 1.088 1.09 1.938-1.938.898.898-1.938 1.938 1.309 1.308 2.361-2.362.898.898-3.323 3.323Zm5.657-5.657-5.091-5.091.962-.962 5.09 5.092-.96.961Zm4.051-3.839a3.59 3.59 0 0 1-1.22.824 2.742 2.742 0 0 1-1.318.173 2.67 2.67 0 0 1-1.26-.523l.856-1.153c.363.222.735.301 1.114.237.38-.063.71-.236.994-.52a2.02 2.02 0 0 0 .385-.533c.1-.198.147-.393.145-.584 0-.193-.07-.36-.212-.502a.632.632 0 0 0-.173-.123.53.53 0 0 0-.212-.064.784.784 0 0 0-.273.032 1.627 1.627 0 0 0-.346.141l-1.711.934a5.46 5.46 0 0 1-.467.226 2.13 2.13 0 0 1-.601.155c-.22.026-.45.002-.69-.074-.24-.08-.482-.241-.724-.484-.342-.342-.54-.712-.594-1.11a2.177 2.177 0 0 1 .183-1.195 3.65 3.65 0 0 1 .792-1.117c.356-.347.73-.6 1.121-.76.392-.16.791-.223 1.199-.188.405.033.808.167 1.209.403l-.863 1.216a1.3 1.3 0 0 0-.626-.208 1.41 1.41 0 0 0-.622.106 1.7 1.7 0 0 0-.534.343c-.155.146-.277.31-.364.491a1.14 1.14 0 0 0-.127.523.62.62 0 0 0 .187.435.53.53 0 0 0 .375.17c.137 0 .278-.03.424-.092.146-.061.288-.132.425-.212l1.124-.644a7.28 7.28 0 0 1 .58-.297c.217-.103.45-.176.7-.219.25-.047.505-.034.767.04.264.07.524.234.781.49.274.274.455.57.545.892.09.315.105.637.046.965a3.033 3.033 0 0 1-.36.954 4.039 4.039 0 0 1-.655.852Z"/>
  <g clip-path="url(#a)">
    <path fill="#000" fill-opacity="20%" d="m57.373 23.336 4.71 4.709a.097.097 0 0 1 0 .134l-.487.486a.938.938 0 0 1-.869.254l-5.643-1.227 1.792 1.64 1.96 1.96a.096.096 0 0 1 0 .134l-.643.643a.095.095 0 0 1-.134 0l-4.71-4.71a.096.096 0 0 1 0-.134l.484-.484a.942.942 0 0 1 .868-.254l5.638 1.222-1.778-1.64-1.96-1.96a.095.095 0 0 1 0-.134l.642-.644a.096.096 0 0 1 .13.005Zm11.351-1.798-.68.68a.094.094 0 0 1-.083.026.097.097 0 0 1-.07-.053l-2.886-6.493a.144.144 0 0 1 .034-.162l.852-.853a.143.143 0 0 1 .158-.03l6.488 2.892a.096.096 0 0 1 .027.152l-.68.681a.096.096 0 0 1-.107.02l-5.31-2.403a.095.095 0 0 0-.107.018.093.093 0 0 0-.019.107l2.404 5.31a.096.096 0 0 1-.02.108Zm8.52-8.738-3.092-.386c.618-.909.546-1.874-.25-2.67-.913-.913-2.127-.945-3.172.1l-1.886 1.886a.142.142 0 0 0 0 .2.918.918 0 0 0 .994.201.9.9 0 0 0 .294-.196l1.266-1.266c.632-.632 1.26-.61 1.73-.14s.512 1.104-.127 1.742l-1.808 1.808a.142.142 0 0 0 .002.201l2.332 2.333a.095.095 0 0 0 .134 0l.643-.643a.095.095 0 0 0 .028-.067c0-.025-.01-.05-.028-.067l-1.745-1.745.743-.742 2.715.368a.947.947 0 0 0 .798-.27l.489-.489a.094.094 0 0 0 .017-.096.096.096 0 0 0-.077-.061Zm-15.398 5.928-2.984 2.985a.126.126 0 0 0 0 .178.93.93 0 0 0 .656.274.92.92 0 0 0 .655-.27l2.42-2.42a.093.093 0 0 0 .021-.103.095.095 0 0 0-.021-.031l-.613-.613a.096.096 0 0 0-.134 0Zm4.097 4.096-2.228 2.228a.095.095 0 0 1-.067.027.097.097 0 0 1-.067-.027l-1.214-1.215a.095.095 0 0 1 0-.134l2.058-2.06a.095.095 0 0 0 0-.134l-.617-.616a.095.095 0 0 0-.134 0l-2.806 2.805a.142.142 0 0 0 .002.201l2.642 2.642a.142.142 0 0 0 .2.001l2.974-2.974a.094.094 0 0 0 .028-.067c0-.025-.01-.05-.028-.067l-.613-.613a.094.094 0 0 0-.13.003Zm-18.66 8.058.829 4.182a.255.255 0 0 0 .267.218.25.25 0 0 0 .236-.25l.215-3.085a.093.093 0 0 1 .16-.06l4.511 4.511a.096.096 0 0 1 .019.106.094.094 0 0 1-.093.055l-11-1.02a1.208 1.208 0 0 0-.962.341l-.174.174a1.205 1.205 0 0 0-.352.856c.001.322.13.63.358.859l6.352 6.352c.228.228.537.357.859.358a1.204 1.204 0 0 0 1.174-1.49l-.828-4.182a.255.255 0 0 0-.268-.219.251.251 0 0 0-.236.25l-.215 3.085a.092.092 0 0 1-.113.087.094.094 0 0 1-.047-.026l-4.507-4.507a.096.096 0 0 1-.018-.106.094.094 0 0 1 .093-.054l11 1.02a1.207 1.207 0 0 0 .957-.348l.178-.178a1.202 1.202 0 0 0 .259-1.32 1.223 1.223 0 0 0-.264-.395l-6.352-6.352a1.223 1.223 0 0 0-1.327-.265c-.148.062-.28.152-.393.265a1.202 1.202 0 0 0-.318 1.138Z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h52.166v20.55H0z" transform="rotate(-45 62 -23)"/>
    </clipPath>
  </defs>
</svg>`;

const NEAR_SOCIAL_LOGO = `<svg x="145" y="80" width="160" height="26" viewBox="0 0 160 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.55396 20.518L2 13.009L9.55396 5.5" stroke="#3D7FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.536 5.5L27 13.009L19.536 20.518" stroke="#3D7FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M39.82 20.5V6.5H42.5L50.24 16.96H49.68C49.6267 16.5467 49.58 16.1467 49.54 15.76C49.5 15.36 49.46 14.96 49.42 14.56C49.3933 14.1467 49.3667 13.7267 49.34 13.3C49.3267 12.86 49.3133 12.4 49.3 11.92C49.2867 11.4267 49.28 10.8933 49.28 10.32V6.5H52.22V20.5H49.5L41.6 9.94L42.36 9.96C42.4267 10.6533 42.48 11.2467 42.52 11.74C42.5733 12.22 42.6133 12.64 42.64 13C42.6667 13.36 42.6867 13.6733 42.7 13.94C42.7267 14.2067 42.74 14.46 42.74 14.7C42.7533 14.94 42.76 15.1933 42.76 15.46V20.5H39.82ZM60.4752 20.7C59.3285 20.7 58.3285 20.4667 57.4752 20C56.6218 19.5333 55.9552 18.8933 55.4752 18.08C54.9952 17.2667 54.7552 16.3333 54.7552 15.28C54.7552 14.4667 54.8885 13.72 55.1552 13.04C55.4218 12.36 55.7952 11.7733 56.2752 11.28C56.7552 10.7733 57.3218 10.3867 57.9752 10.12C58.6418 9.84 59.3618 9.7 60.1352 9.7C60.8552 9.7 61.5218 9.83333 62.1352 10.1C62.7485 10.3533 63.2752 10.72 63.7152 11.2C64.1685 11.6667 64.5152 12.22 64.7552 12.86C64.9952 13.5 65.1018 14.2 65.0752 14.96L65.0552 15.84H56.5552L56.0952 14.1H62.7152L62.3952 14.46V14.02C62.3685 13.66 62.2485 13.3333 62.0352 13.04C61.8352 12.7467 61.5752 12.52 61.2552 12.36C60.9352 12.2 60.5752 12.12 60.1752 12.12C59.5885 12.12 59.0885 12.2333 58.6752 12.46C58.2752 12.6867 57.9685 13.02 57.7552 13.46C57.5418 13.9 57.4352 14.4333 57.4352 15.06C57.4352 15.7 57.5685 16.2533 57.8352 16.72C58.1152 17.1867 58.5018 17.5533 58.9952 17.82C59.5018 18.0733 60.0952 18.2 60.7752 18.2C61.2418 18.2 61.6685 18.1267 62.0552 17.98C62.4418 17.8333 62.8552 17.58 63.2952 17.22L64.6552 19.12C64.2685 19.4667 63.8418 19.76 63.3752 20C62.9085 20.2267 62.4285 20.4 61.9352 20.52C61.4418 20.64 60.9552 20.7 60.4752 20.7ZM71.1339 20.7C70.2539 20.7 69.4606 20.46 68.7539 19.98C68.0472 19.5 67.4872 18.8467 67.0739 18.02C66.6606 17.1933 66.4539 16.2467 66.4539 15.18C66.4539 14.1133 66.6606 13.1733 67.0739 12.36C67.5006 11.5333 68.0739 10.8867 68.7939 10.42C69.5139 9.94 70.3339 9.7 71.2539 9.7C71.7739 9.7 72.2472 9.78 72.6739 9.94C73.1139 10.0867 73.4939 10.2933 73.8139 10.56C74.1472 10.8267 74.4272 11.1333 74.6539 11.48C74.8806 11.8267 75.0406 12.2 75.1339 12.6L74.5339 12.5V9.92H77.3539V20.5H74.4939V17.96L75.1339 17.9C75.0272 18.2733 74.8539 18.6267 74.6139 18.96C74.3739 19.2933 74.0739 19.5933 73.7139 19.86C73.3672 20.1133 72.9739 20.32 72.5339 20.48C72.0939 20.6267 71.6272 20.7 71.1339 20.7ZM71.9139 18.24C72.4472 18.24 72.9139 18.1133 73.3139 17.86C73.7139 17.6067 74.0206 17.2533 74.2339 16.8C74.4606 16.3333 74.5739 15.7933 74.5739 15.18C74.5739 14.58 74.4606 14.0533 74.2339 13.6C74.0206 13.1467 73.7139 12.7933 73.3139 12.54C72.9139 12.2733 72.4472 12.14 71.9139 12.14C71.3939 12.14 70.9339 12.2733 70.5339 12.54C70.1472 12.7933 69.8406 13.1467 69.6139 13.6C69.3872 14.0533 69.2739 14.58 69.2739 15.18C69.2739 15.7933 69.3872 16.3333 69.6139 16.8C69.8406 17.2533 70.1472 17.6067 70.5339 17.86C70.9339 18.1133 71.3939 18.24 71.9139 18.24ZM80.2013 20.5V9.92H82.9413L83.0413 13.32L82.5613 12.62C82.7213 12.0733 82.9813 11.58 83.3413 11.14C83.7013 10.6867 84.1213 10.3333 84.6013 10.08C85.0946 9.82667 85.6079 9.7 86.1413 9.7C86.3679 9.7 86.5879 9.72 86.8013 9.76C87.0146 9.8 87.1946 9.84667 87.3413 9.9L86.5813 13.02C86.4213 12.94 86.2279 12.8733 86.0013 12.82C85.7746 12.7533 85.5413 12.72 85.3013 12.72C84.9813 12.72 84.6813 12.78 84.4013 12.9C84.1346 13.0067 83.9013 13.1667 83.7013 13.38C83.5013 13.58 83.3413 13.82 83.2213 14.1C83.1146 14.38 83.0613 14.6867 83.0613 15.02V20.5H80.2013ZM100.044 20.7C99.1769 20.7 98.3836 20.5933 97.6636 20.38C96.9569 20.1667 96.3236 19.8533 95.7636 19.44C95.2169 19.0267 94.7236 18.5267 94.2836 17.94L96.1636 15.8C96.8169 16.7067 97.4636 17.3267 98.1036 17.66C98.7569 17.98 99.4636 18.14 100.224 18.14C100.637 18.14 101.004 18.0867 101.324 17.98C101.657 17.86 101.917 17.6933 102.104 17.48C102.29 17.2667 102.384 17.0133 102.384 16.72C102.384 16.5067 102.337 16.3133 102.244 16.14C102.15 15.9533 102.017 15.7933 101.844 15.66C101.67 15.5133 101.464 15.3867 101.224 15.28C100.984 15.16 100.717 15.06 100.424 14.98C100.13 14.8867 99.8103 14.8133 99.4636 14.76C98.7169 14.5867 98.0636 14.38 97.5036 14.14C96.9436 13.8867 96.4769 13.58 96.1036 13.22C95.7303 12.8467 95.4503 12.4267 95.2636 11.96C95.0903 11.4933 95.0036 10.9667 95.0036 10.38C95.0036 9.78 95.1369 9.22667 95.4036 8.72C95.6703 8.2 96.0369 7.75333 96.5036 7.38C96.9836 7.00667 97.5303 6.72 98.1436 6.52C98.7703 6.32 99.4303 6.22 100.124 6.22C100.977 6.22 101.724 6.32 102.364 6.52C103.004 6.70667 103.557 6.98 104.024 7.34C104.504 7.7 104.904 8.14 105.224 8.66L103.324 10.5C103.044 10.1267 102.737 9.81333 102.404 9.56C102.084 9.30667 101.73 9.12 101.344 9C100.97 8.86667 100.584 8.8 100.184 8.8C99.7436 8.8 99.3636 8.86 99.0436 8.98C98.7236 9.08667 98.4703 9.24667 98.2836 9.46C98.1103 9.67333 98.0236 9.93333 98.0236 10.24C98.0236 10.48 98.0836 10.6933 98.2036 10.88C98.3236 11.0667 98.4969 11.2333 98.7236 11.38C98.9503 11.5133 99.2236 11.6333 99.5436 11.74C99.8636 11.8467 100.217 11.94 100.604 12.02C101.337 12.1667 101.997 12.36 102.584 12.6C103.17 12.84 103.67 13.1333 104.084 13.48C104.51 13.8133 104.837 14.2133 105.064 14.68C105.29 15.1333 105.404 15.6467 105.404 16.22C105.404 17.1667 105.177 17.9733 104.724 18.64C104.27 19.3067 103.644 19.82 102.844 20.18C102.044 20.5267 101.11 20.7 100.044 20.7ZM112.641 20.7C111.561 20.7 110.594 20.4667 109.741 20C108.901 19.52 108.234 18.8667 107.741 18.04C107.261 17.2133 107.021 16.2667 107.021 15.2C107.021 14.1333 107.261 13.1933 107.741 12.38C108.234 11.5533 108.901 10.9 109.741 10.42C110.594 9.94 111.561 9.7 112.641 9.7C113.707 9.7 114.661 9.94 115.501 10.42C116.354 10.9 117.021 11.5533 117.501 12.38C117.981 13.1933 118.221 14.1333 118.221 15.2C118.221 16.2667 117.981 17.2133 117.501 18.04C117.021 18.8667 116.354 19.52 115.501 20C114.661 20.4667 113.707 20.7 112.641 20.7ZM112.641 18.22C113.161 18.22 113.627 18.0933 114.041 17.84C114.454 17.5733 114.774 17.2133 115.001 16.76C115.241 16.2933 115.361 15.7733 115.361 15.2C115.361 14.6133 115.241 14.0933 115.001 13.64C114.774 13.1733 114.454 12.8133 114.041 12.56C113.627 12.2933 113.161 12.16 112.641 12.16C112.107 12.16 111.634 12.2933 111.221 12.56C110.807 12.8267 110.481 13.1867 110.241 13.64C110.001 14.0933 109.887 14.6133 109.901 15.2C109.887 15.7733 110.001 16.2933 110.241 16.76C110.481 17.2133 110.807 17.5733 111.221 17.84C111.634 18.0933 112.107 18.22 112.641 18.22ZM124.958 20.7C123.944 20.7 123.038 20.46 122.238 19.98C121.438 19.5 120.804 18.8467 120.338 18.02C119.884 17.1933 119.658 16.2533 119.658 15.2C119.658 14.16 119.884 13.2267 120.338 12.4C120.804 11.56 121.438 10.9 122.238 10.42C123.038 9.94 123.944 9.7 124.958 9.7C125.904 9.7 126.771 9.87333 127.558 10.22C128.344 10.5667 128.958 11.0467 129.398 11.66L127.838 13.54C127.651 13.2867 127.418 13.06 127.138 12.86C126.858 12.6467 126.551 12.48 126.218 12.36C125.898 12.24 125.564 12.18 125.218 12.18C124.671 12.18 124.184 12.3133 123.758 12.58C123.344 12.8333 123.018 13.1867 122.778 13.64C122.538 14.0933 122.418 14.6133 122.418 15.2C122.418 15.7733 122.538 16.2867 122.778 16.74C123.031 17.18 123.371 17.54 123.798 17.82C124.224 18.0867 124.704 18.22 125.238 18.22C125.584 18.22 125.911 18.1733 126.218 18.08C126.524 17.9733 126.811 17.82 127.078 17.62C127.358 17.42 127.611 17.18 127.838 16.9L129.378 18.78C128.924 19.3533 128.298 19.82 127.498 20.18C126.698 20.5267 125.851 20.7 124.958 20.7ZM131.437 20.5V9.92H134.277V20.5H131.437ZM132.837 7.74C132.291 7.74 131.864 7.60667 131.557 7.34C131.251 7.07333 131.097 6.69333 131.097 6.2C131.097 5.74667 131.251 5.38 131.557 5.1C131.877 4.80667 132.304 4.66 132.837 4.66C133.384 4.66 133.811 4.8 134.117 5.08C134.424 5.34667 134.577 5.72 134.577 6.2C134.577 6.66667 134.417 7.04 134.097 7.32C133.791 7.6 133.371 7.74 132.837 7.74ZM141.271 20.7C140.391 20.7 139.597 20.46 138.891 19.98C138.184 19.5 137.624 18.8467 137.211 18.02C136.797 17.1933 136.591 16.2467 136.591 15.18C136.591 14.1133 136.797 13.1733 137.211 12.36C137.637 11.5333 138.211 10.8867 138.931 10.42C139.651 9.94 140.471 9.7 141.391 9.7C141.911 9.7 142.384 9.78 142.811 9.94C143.251 10.0867 143.631 10.2933 143.951 10.56C144.284 10.8267 144.564 11.1333 144.791 11.48C145.017 11.8267 145.177 12.2 145.271 12.6L144.671 12.5V9.92H147.491V20.5H144.631V17.96L145.271 17.9C145.164 18.2733 144.991 18.6267 144.751 18.96C144.511 19.2933 144.211 19.5933 143.851 19.86C143.504 20.1133 143.111 20.32 142.671 20.48C142.231 20.6267 141.764 20.7 141.271 20.7ZM142.051 18.24C142.584 18.24 143.051 18.1133 143.451 17.86C143.851 17.6067 144.157 17.2533 144.371 16.8C144.597 16.3333 144.711 15.7933 144.711 15.18C144.711 14.58 144.597 14.0533 144.371 13.6C144.157 13.1467 143.851 12.7933 143.451 12.54C143.051 12.2733 142.584 12.14 142.051 12.14C141.531 12.14 141.071 12.2733 140.671 12.54C140.284 12.7933 139.977 13.1467 139.751 13.6C139.524 14.0533 139.411 14.58 139.411 15.18C139.411 15.7933 139.524 16.3333 139.751 16.8C139.977 17.2533 140.284 17.6067 140.671 17.86C141.071 18.1133 141.531 18.24 142.051 18.24ZM150.358 20.5V5.7H153.198V20.5H150.358Z" fill="white" />
    </svg>`;

const bgPatterns = {
  None: "",
  "Near Logo": NEAR_LOGO,
  "Future is NEAR": FUTURE_IS_NEAR,
};

const qrPayload = `https://${accountId.split("near")[0]}near.social/`;

const getNftUrl = (cid) => `https://${cid}.ipfs.nftstorage.link`;

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};

const nearSocialLogoData = imageToBase64(NEAR_SOCIAL_LOGO, SVG_CONTENT_TYPE);

const dotsType = [
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "square",
  "extra-rounded",
];

const cornersSquareTypes = ["dot", "square", "extra-rounded"];

const titleFonts = [
  { description: "Brush Script MT", value: "'Brush Script MT', cursive" },
  { description: "Arial", value: "Arial, sans-serif" },
  { description: "Times New Roman", value: "'Times New Roman', serif" },
  { description: "Georgia", value: "Georgia, serif" },
  { description: "Courier New", value: "'Courier New', monospace" },
  { description: "Gill Sans", value: "'Gill Sans', sans-serif" },
];

initState({
  title: "Follow me on",
  titleFont: titleFonts[0],
  titleColor: "#ffffff",
  titleSize: 60,
  bgColor: "#7e61cc",
  bgPattern: "Future is NEAR",
  qrColor: PRIMARY_COLOR,
  qrDotsType: "dots",
  qrCornersSquareType: "extra-rounded",
  qrCodeData: "",
  showNearSocialLogo: true,
});

const qrCodeParams = {
  width: 200,
  height: 200,
  type: "svg",
  data: qrPayload,
  dotsOptions: { color: state.qrColor, type: state.qrDotsType },
  cornersSquareOptions: { type: state.qrCornersSquareType },
  qrOptions: { errorCorrectionLevel: "M" },
  backgroundOptions: { color: "#ffffff" },
};

const bg_pattern_define = `<defs>
<pattern id="BG_Pattern" x="0" y="0" width=".22" height=".21" >
  ${bgPatterns[state.bgPattern]}
</pattern></defs>`;

const srcData = `<script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
<script type="text/javascript">
console.log(window.location)
console.log(document.URL)
  const canvas = document.createElement('canvas');
  const qrCode = new QRCodeStyling(${JSON.stringify(qrCodeParams)});
  qrCode.append(canvas);
  const rawSvg = canvas.firstChild.outerHTML
  window.top.postMessage(rawSvg, "*")
</script>`;

const svgTemplate = `<?xml version="1.0" standalone="yes"?>
<svg width="450" height="450" version="1.1" xmlns = 'http://www.w3.org/2000/svg'>
    ${state.bgPattern ? bg_pattern_define : ""}
    <a href="${qrPayload}">
    <rect width="100%" height="100%" rx="6" fill="${state.bgColor}" />
    ${
      state.bgPattern
        ? `<rect width="100%" height="100%" rx="6" fill="url(#BG_Pattern)" />`
        : ""
    }
    <rect x="50%" y="230" width="300" height="300" rx="10" transform="translate(-150,-110)" fill="#ffffff" />

    <text x="50%" y="60" text-anchor="middle" fill="${state.titleColor}"
        style="font-family: ${state.titleFont.value};
        font-size: ${Number(state.titleSize) || 60};">
        ${state.title}
    </text>
    ${state.showNearSocialLogo ? NEAR_SOCIAL_LOGO : ""}
    <text x="50%"  y="180"  text-anchor="middle" 
        style="font-family: 'Gill Sans', sans-serif; font-size: 34;" >
        <tspan fill="${PRIMARY_COLOR}" font-weight="bold">@</tspan>
        <tspan>${accountId}</tspan>
    </text>
    <g transform="translate(-100,-30)">
    <svg x="50%" y="230" width="200" height="200">
    ${state.qrCodeData}
    </svg>
    </g>
  </a>

</svg>`;

const mainSvgImage = imageToBase64(svgTemplate, SVG_CONTENT_TYPE);

const pictureBlob = new Blob([svgTemplate], { type: SVG_CONTENT_TYPE });
const pictureUrl = URL.createObjectURL(pictureBlob);

const mintNFT = () => {
  const body = new File([pictureBlob], fileName, { type: SVG_CONTENT_TYPE });
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const { cid } = res.body;
    const GAS = 300000000000000;
    const MINT_DEPOSIT = "100000000000000000000000";

    Near.call(
      NFT_CONTRACT,
      "nft_mint",
      {
        receiver_id: accountId,
        token_metadata: {
          title: `@${accountId} on Near Social`,
          media: getNftUrl(cid),
          copies: 1,
        },
      },
      GAS,
      MINT_DEPOSIT
    );
  });
};

return (
  <div className="container row mt-3 mb-3">
    {!isKnownUser && (
      <h5 className="text-center mb-3">
        Sign In to create card for your personal page
      </h5>
    )}
    <div className="col col-lg-6">
      <div className="card border-0">
        <img src={mainSvgImage} className="rounded" />
        <div className="card-body d-flex justify-content-around">
          <button
            disabled={!isKnownUser}
            type="button"
            className="btn btn-success btn-lg m-3"
            onClick={mintNFT}
          >
            Mint NFT 0.1Ⓝ
          </button>

          <a href={pictureUrl} download={fileName}>
            <button
              type="button"
              className="btn btn-primary btn-lg m-3"
              onClick={downloadFile}
            >
              <i class="bi bi-filetype-svg"></i>
              Download Picture
            </button>
          </a>
        </div>
      </div>
    </div>
    <div className="col col-lg-6">
      <div className="card p-3 mb-3">
        <div className="row">
          <label for="titleColorInput" className="col-sm-6 col-form-label">
            <h4>Title</h4>
          </label>
          <div className="col-sm-6">
            <div className="d-flex flex-direction-row">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-palette"></i>
                </span>
                <input
                  style={{ width: 30 }}
                  type="color"
                  className="form-control form-control-color"
                  id="titleColorInput"
                  value={state.titleColor}
                  onChange={({ target }) =>
                    State.update({ titleColor: target.value })
                  }
                />
                <span className="input-group-text">
                  <i className="bi bi-type"></i>
                </span>
                <input
                  style={{ width: 40, padding: 5 }}
                  type="number"
                  value={state.titleSize}
                  onChange={({ target }) =>
                    State.update({ titleSize: target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-direction-row gap-3">
          <div className="form-floating" style={{ width: "50%" }}>
            <input
              className="form-control form-floating"
              id="titleInput"
              placeholder="Follow me on"
              value={state.title}
              onChange={({ target }) => State.update({ title: target.value })}
            />
            <label for="titleInput">Text</label>
          </div>
          <div className="form-floating" style={{ width: "50%" }}>
            <select
              id="fontSelect"
              className="form-select"
              onChange={({ target }) =>
                State.update({
                  titleFont: titleFonts.find(
                    ({ value }) => target.value === value
                  ),
                })
              }
            >
              {titleFonts.map((font) => (
                <option
                  value={font.value}
                  selected={font.value === state.titleFont.value}
                >
                  {font.description}
                </option>
              ))}
            </select>
            <label for="fontSelect">Font</label>
          </div>
        </div>
        <div className="row mt-3">
          <label class="col-sm-6 form-check-label" for="addNearSocialCheck">
            <span class="badge bg-dark">
              <img
                src={nearSocialLogoData}
                style={{ height: "auto", width: "100%" }}
              />
            </span>
          </label>
          <div class="col-sm-2 form-check form-switch ms-4">
            <input
              checked={state.showNearSocialLogo}
              className="form-check-input"
              type="checkbox"
              id="addNearSocialCheck"
              onClick={() =>
                State.update({ showNearSocialLogo: !state.showNearSocialLogo })
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <label for="qrColorInput" className="col-sm-6 col-form-label">
            <h4>QR code</h4>
          </label>
          <div className="col-sm-6">
            <div className="input-group" style={{ width: "50%" }}>
              <span className="input-group-text">
                <i className="bi bi-palette"></i>
              </span>
              <input
                type="color"
                className="form-control form-control-color"
                id="qrColorInput"
                value={state.qrColor}
                onChange={({ target }) =>
                  State.update({ qrColor: target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="col d-flex flex-direction-row gap-3">
          <div className="form-floating" style={{ width: "50%" }}>
            <select
              id="dotTypeSelect"
              className="form-select"
              onChange={({ target }) =>
                State.update({ qrDotsType: target.value })
              }
            >
              {dotsType.map((type) => (
                <option value={type} selected={type === state.qrDotsType}>
                  {type}
                </option>
              ))}
            </select>
            <label for="dotTypeSelect">Dots type</label>
          </div>
          <div className="form-floating" style={{ width: "50%" }}>
            <select
              id="cornersTypeSelect"
              className="form-select"
              onChange={({ target }) =>
                State.update({
                  qrCornersSquareType: target.value,
                })
              }
            >
              {cornersSquareTypes.map((type) => (
                <option
                  value={type}
                  selected={type === state.qrCornersSquareType}
                >
                  {type}
                </option>
              ))}
            </select>
            <label for="cornersTypeSelect">Corner square types</label>
          </div>
        </div>

        <div className="row mt-3 align-items-center">
          <label for="bgColorInput" className="col-sm-6 col-form-label">
            <h4>Background</h4>
          </label>

          <div className="col-sm-6">
            <div className="input-group" style={{ width: "50%" }}>
              <span className="input-group-text">
                <i className="bi bi-palette"></i>
              </span>
              <input
                type="color"
                className="form-control form-control-color"
                id="bgColorInput"
                value={state.bgColor}
                onChange={({ target }) =>
                  State.update({ bgColor: target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-direction-row gap-3 justify-content-around flex-wrap">
          {Object.keys(bgPatterns).map((key) => (
            <div key={key} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-btn-${key}`}
                checked={state.bgPattern === key}
                onChange={() => State.update({ bgPattern: key })}
              />
              <div>
                <label className="form-check-label" for={`radio-btn-${key}`}>
                  {key}
                </label>
              </div>
              {bgPatterns[key] && (
                <img
                  src={imageToBase64(bgPatterns[key], SVG_CONTENT_TYPE)}
                  style={{ height: "auto", width: "100%" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {isKnownUser && (
        <Widget
          src="mob.near/widget/NftCollection"
          props={{
            contractId: NFT_CONTRACT,
          }}
        />
      )}
    </div>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => State.update({ qrCodeData: data })}
      style={{ width: 0, height: 0 }}
    />
  </div>
);

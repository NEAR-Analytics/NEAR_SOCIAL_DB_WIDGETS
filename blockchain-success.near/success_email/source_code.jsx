if (!props.accountId) {
  console.log("No accountId props specified");
  props.accountId = context.accountId;
}

const address = `${props.accountId}@near.mailchain.com`;

let mailchainUrl = `https://app.mailchain.com/mailto:${address}`;

if (props.subject) {
  mailchainUrl = `${mailchainUrl}?subject=${props.subject}`;
}

const res = fetch(
  `https://api.mailchain.com/addresses/${address}/resolved-messaging-key`
);
console.log(address, res);
const linkunderline = props.linkunderline === "yes";
// const showRegisteredAddressIndicator = props.showRegisteredAddressIndicator === "yes";
const showRegisteredAddressIndicator = false; // Coming soon
const showExternalLinkIcon = props.showExternalLinkIcon === "yes";
const color = props.color;

const LogoBlack = (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="33" height="33" rx="6" fill="url(#paint0_radial_4492_41106)" />
    <rect width="33" height="33" rx="6" fill="black" />
    <g>
      <path
        d="M21.4957 17.9189C21.2946 17.9189 21.1065 17.9962 20.9662 18.1366L18.1362 20.9666C17.8442 21.2585 17.8442 21.7337 18.1361 22.0257L19.5801 23.4699C19.7203 23.6103 19.9084 23.6875 20.1095 23.6875C20.3106 23.6875 20.4987 23.6103 20.6389 23.4699L23.4694 20.6394C23.6096 20.4989 23.687 20.3109 23.687 20.1097C23.687 19.9086 23.6096 19.7206 23.4694 19.5803L22.0253 18.1365C21.8849 17.9962 21.6969 17.9189 21.4957 17.9189ZM20.1095 24.9999C19.5578 24.9999 19.0401 24.7861 18.652 24.3978L17.208 22.9536C16.4046 22.1499 16.4046 20.8422 17.2083 20.0385L20.0382 17.2085C20.4263 16.8204 20.9441 16.6065 21.4957 16.6065C22.0473 16.6065 22.5649 16.8203 22.9531 17.2084L24.3973 18.6523C24.7856 19.0404 24.9993 19.558 24.9993 20.1097C24.9993 20.6614 24.7857 21.179 24.3975 21.5672L21.5669 24.3978C21.1787 24.7861 20.6611 24.9999 20.1095 24.9999Z"
        fill="#F9F9F9"
      />
      <path
        d="M11.5034 17.9189C11.3022 17.9189 11.1141 17.9962 10.9738 18.1365L9.52996 19.5803C9.38955 19.7206 9.31234 19.9086 9.31234 20.1097C9.31226 20.3109 9.38955 20.4989 9.52996 20.6394L12.3603 23.4699C12.5007 23.6103 12.6887 23.6875 12.8898 23.6875C13.0909 23.6875 13.279 23.6103 13.4194 23.4698L14.8638 22.0256C15.004 21.8853 15.0814 21.6972 15.0814 21.4961C15.0814 21.2951 15.004 21.107 14.8637 20.9667L12.0331 18.1365C11.8926 17.9962 11.7046 17.9189 11.5034 17.9189ZM12.8898 24.9999C12.3382 24.9999 11.8205 24.7861 11.4324 24.3978L8.60191 21.5672C8.21375 21.179 8 20.6614 8 20.1097C8 19.558 8.21387 19.0404 8.60212 18.6523L10.0458 17.2084C10.4341 16.8203 10.9517 16.6065 11.5034 16.6065C12.055 16.6065 12.5726 16.8203 12.9608 17.2084L15.7915 20.0386C16.1798 20.4269 16.3937 20.9444 16.3938 21.4961C16.3938 22.0478 16.1799 22.5654 15.7918 22.9537L14.3472 24.3978C13.9591 24.7861 13.4415 24.9999 12.8898 24.9999Z"
        fill="#F9F9F9"
      />
      <path
        d="M12.8898 9.31245C12.6887 9.31245 12.5007 9.38971 12.3604 9.53005L9.52984 12.3607C9.38955 12.5011 9.31226 12.689 9.31226 12.8902C9.31226 13.0914 9.38955 13.2794 9.52996 13.4198L10.9738 14.8637C11.1141 15.004 11.3022 15.0813 11.5034 15.0813C11.7045 15.0813 11.8925 15.0039 12.0328 14.8637L14.8632 12.0329C15.1552 11.741 15.1551 11.2659 14.8632 10.9739L13.4194 9.53005C13.279 9.38971 13.0909 9.31245 12.8898 9.31245ZM11.5034 16.3937C10.9517 16.3937 10.4341 16.1799 10.0459 15.7918L8.60199 14.3477C8.21375 13.9595 8 13.4419 8 12.8902C7.99988 12.3386 8.21375 11.821 8.60191 11.4328L11.4324 8.60209C11.8205 8.21387 12.3382 8 12.8898 8C13.4415 8 13.9591 8.21387 14.3473 8.60209L15.7911 10.0459C16.5947 10.8496 16.5948 12.1572 15.7912 12.9609L12.9608 15.7917C12.5726 16.1798 12.055 16.3937 11.5034 16.3937Z"
        fill="#F9F9F9"
      />
      <path
        d="M20.1096 9.31245C19.9084 9.31245 19.7203 9.38971 19.5801 9.53005L18.1362 10.9742C17.9958 11.1146 17.9185 11.3026 17.9185 11.5037C17.9185 11.7048 17.9958 11.8929 18.1362 12.0331L20.9665 14.8634C21.1068 15.0037 21.2949 15.0811 21.496 15.0811C21.6971 15.0811 21.8854 15.0037 22.0256 14.8635L23.4698 13.4196C23.6102 13.2792 23.6875 13.0913 23.6875 12.8902C23.6875 12.689 23.6102 12.5012 23.4699 12.3608L20.639 9.53005C20.4986 9.3896 20.3105 9.31245 20.1096 9.31245ZM21.496 16.3933C20.9444 16.3933 20.4267 16.1796 20.0385 15.7914L17.2082 12.9612C16.82 12.573 16.6062 12.0554 16.6062 11.5037C16.6061 10.952 16.82 10.4345 17.2081 10.0463L18.652 8.60209C19.0401 8.21387 19.5578 8 20.1096 8C20.661 8 21.1787 8.21377 21.5669 8.60198L24.3979 11.4328C24.786 11.821 24.9999 12.3386 24.9999 12.8902C24.9997 13.4419 24.7858 13.9595 24.3977 14.3477L22.9534 15.7916C22.5653 16.1796 22.0476 16.3933 21.496 16.3933Z"
        fill="#F9F9F9"
      />
      <path
        d="M12.9958 12.1599C12.5348 12.1599 12.1598 12.535 12.1598 12.9961V20.0038C12.1598 20.4648 12.5348 20.8401 12.9958 20.8401H20.0037C20.4648 20.8401 20.8398 20.4648 20.8398 20.0038V12.9961C20.8398 12.535 20.4648 12.1599 20.0037 12.1599H12.9958ZM20.0037 22.1523H12.9958C11.8112 22.1523 10.8474 21.1885 10.8474 20.0038V12.9961C10.8474 11.8114 11.8112 10.8475 12.9958 10.8475H20.0037C21.1884 10.8475 22.1522 11.8114 22.1522 12.9961V20.0038C22.1522 21.1885 21.1884 22.1523 20.0037 22.1523Z"
        fill="#F9F9F9"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_4492_41106"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(3.10396 31.203) rotate(-10.568) scale(44.5376)"
      >
        <stop stop-color="#F18337" />
        <stop offset="1" stop-color="#3252EB" />
      </radialGradient>
    </defs>
  </svg>
);

const GRAY_COLOR = "hsla(0, 0%, 88%, 1)";
const GREEN_COLOR = "hsla(131, 54%, 40%, 1)";

return (
  <div
    id="mailchain"
    style={{
      padding: props.padding,
      margin: props.margin,
      float: "left",
    }}
  >
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          <strong>Mailchain</strong> is the web3 communication layer. Send and
          receive messages directly between wallets.
        </Tooltip>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
          height: "16px",
        }}
      >
        {props.symbol !== "none" && (
          <div
            style={{
              height: "34px",
              width: "34px",
              position: "relative",
            }}
          >
            {!["bw", "icon"].includes(props.symbol) && LogoColor}

            {props.symbol === "bw" && LogoBlack}
            {props.symbol === "icon" && WhiteLogo}

            {showRegisteredAddressIndicator && props.symbol && res && (
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  background:
                    res.body.status === "registered" ? GREEN_COLOR : GRAY_COLOR,
                  position: "absolute",
                  right: props.symbol === "icon" ? "2px" : "-4px",
                  bottom: props.symbol === "icon" ? "2px" : "-4px",
                  borderRadius: "12px",
                  border: "white solid 2px",
                }}
              />
            )}
          </div>
        )}
        {props.symbol !== "icon" && <>&nbsp; &nbsp;</>}
        <a
          href={mailchainUrl}
          style={{
            textDecoration: linkunderline ? "underline" : "none",
            color,
          }}
          target="_blank"
        >
          email {props.accountId}
          {showExternalLinkIcon && ExtenalLinkIcon}
        </a>
      </div>
    </OverlayTrigger>
  </div>
);

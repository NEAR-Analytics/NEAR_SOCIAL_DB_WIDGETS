const styles = {
  container: {
    with: "1110px",
    "min-height": "950px",
    background: "linear-gradient(127.48deg, #EDF1F5 -11.92%, #FFFFFF 114.99%)",
    border: "1px solid #E9E9E9",
    "border-radius": "16px",
  },
  header: {
    color: "#040109",
  },
  info: {
    gap: "25px",

    item: {
      display: "grid",
      "grid-template-columns": "max-content 1fr",
      "font-weight": "500",
      color: "#3D3D3D",

      icon: {
        display: "block",
        width: "24px",
        height: "24px",
        "margin-right": "5px",
        "background-image":
          "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNDEgNkw1IDcuNDFMOS41OCAxMkw1IDE2LjU5TDYuNDEgMThMMTIuNDEgMTJMNi40MSA2WiIgZmlsbD0iIzY3N0NFNyIvPgo8cGF0aCBkPSJNMTMgNkwxMS41OSA3LjQxTDE2LjE3IDEyTDExLjU5IDE2LjU5TDEzIDE4TDE5IDEyTDEzIDZaIiBmaWxsPSIjNjc3Q0U3Ii8+Cjwvc3ZnPgo=)",
      },
    },
    mobile: {
      gap: "15px",
      "margin-bottom": "15px",
    },
  },
  logo: {
    image: {
      width: "350px",
      height: "300px",
    },
  },
  screens: {
    position: "relative",
    overflow: "hidden",
    height: "480px",

    mobile: {
      gap: "30px",
      "overflow-x": "scroll",
      "margin-top": "40px",
      screen: {
        height: "304px",
      },
    },

    screen: {
      height: "304px",
      position: "absolute",
    },

    screen1: {
      left: "-32px",
      top: "120px",
    },
    screen2: {
      left: "155px",
      top: "0px",
    },
    screen3: {
      left: "345px",
      top: "55px",
    },
    screen4: {
      left: "155px",
      top: "325px",
    },
    screen5: {
      left: "345px",
      top: "375px",
    },
  },
  cta: {
    description: {
      "margin-bottom": "40px",
    },
    launch: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      "text-decoration": "none",
      width: "225px",
      height: "53px",
      background: "linear-gradient(96.86deg, #667EEA 4.34%, #764BA2 124.62%)",
      "border-radius": "53px",
      color: "white",

      mobile: {
        width: "100%",
      },
    },
  },
  textSizeLg: {
    "font-size": "18px",
  },
  textSize: {
    "font-size": "14px",
  },
};

const BOT_URL = "https://t.me/near_crypto_concierge_bot";
const HEADER_TEXT = "NEAR Crypto Concierge";
const INFO_BLOCKS = (
  <>
    <span style={styles.info.item}>
      <div style={styles.info.item.icon}></div>If you find it hard catching up
      on the latest events in crypto.
    </span>
    <span style={styles.info.item}>
      <div style={styles.info.item.icon}></div>If you happen to lose track of
      your assets and the best way of their allocation.
    </span>
    <span style={styles.info.item}>
      <div style={styles.info.item.icon}></div>If your asset management pace
      can’t keep up with the rapidly evolving and aggressively fluctuating
      market
    </span>
  </>
);

const CTA_BLOCK = (
  <>
    <b>NEAR Crypto Concierge</b> is a centralized one-stop shop for asset
    management of the fastest and most reliable decentralized ecosystem that
    NEAR Protocol offers.
    <br /> <br />
    Launch our <b>telegram bot</b>, connect your wallet, choose the needed
    option and enjoy NEAR at its best.
  </>
);

function renderImages(isMobile) {
  const images = [
    "https://bafkreiglngkkzbp7vfvyqscnpguzfwv3lirzqdh4s6dhduzje2ctlkwi2i.ipfs.nftstorage.link",
    "https://bafkreihfom4cd55fqt2a4ymrhuwb6fpspyrs67tscqu65vw3vhkckq2lym.ipfs.nftstorage.link",
    "https://bafkreiebo3l62zpwg2cudqtcxqlwdrumf4cihk3z4sfgx73kdofki5fzke.ipfs.nftstorage.link",
    "https://bafkreigo6fmfhsczgovaxxlzv3exx4qkt3rjklh6yvyxulcjvry266v2ym.ipfs.nftstorage.link",
    "https://bafkreifoy5pvrnxa6kz6wtblhb3zj4n22wby2mqjhahma7ukbcrvwvh5z4.ipfs.nftstorage.link",
  ];

  return images.map((image, idx) => {
    const style = !isMobile
      ? { ...styles.screens.screen, ...styles.screens["screen" + (idx + 1)] }
      : styles.screens.mobile.screen;
    return (
      <img src={image} alt="Example Bot Screen" style={style} key={idx}></img>
    );
  });
}

return (
  <>
    <div style={styles.container} className="container">
      <div className="row">
        <div
          style={styles.header}
          className="col-12 pt-lg-4 pt-3 pb-3 d-flex justify-content-center"
        >
          <span className="fs-1 d-none d-lg-block">{HEADER_TEXT}</span>
          <span className="fs-3 d-block d-lg-none">{HEADER_TEXT}</span>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-6 ps-lg-5 d-flex align-items-center">
          <div
            className="d-none d-lg-flex flex-column justify-content-center"
            style={{ ...styles.info, ...styles.textSizeLg }}
          >
            {INFO_BLOCKS}
          </div>
          <div
            className="d-flex d-lg-none flex-column justify-content-center"
            style={{
              ...styles.info,
              ...styles.info.mobile,
              ...styles.textSize,
            }}
          >
            {INFO_BLOCKS}
          </div>
        </div>
        <div
          style={styles.logo}
          className="col-lg-6 d-flex justify-content-center align-items-center"
        >
          <img
            src="https://bafkreictzigkibl6hjgfcwjzwcshlvkjmke3qjcvpww52ebte4v5inxgk4.ipfs.nftstorage.link"
            style={styles.logo.image}
            alt="Logo"
          ></img>
        </div>
      </div>
      <div className="row flex-column-reverse flex-lg-row">
        <div style={styles.screens} className="col-lg-6">
          <div className="d-none d-lg-block">{renderImages(false)}</div>
          <div className="d-flex d-lg-none" style={styles.screens.mobile}>
            {renderImages(true)}
          </div>
        </div>
        <div style={styles.cta} className="col-lg-6">
          <div style={styles.cta.description} className="pe-lg-5 pt-3 pt-lg-5">
            <span className="d-none d-lg-block" style={styles.textSizeLg}>
              {CTA_BLOCK}
            </span>
            <span className="d-block d-lg-none" style={styles.textSize}>
              {CTA_BLOCK}
            </span>
          </div>
          <a
            className="d-none d-lg-flex"
            href={BOT_URL}
            target="_blank"
            style={styles.cta.launch}
          >
            Launch Telegram
          </a>
          <a
            className="d-flex d-lg-none"
            href={BOT_URL}
            target="_blank"
            style={{ ...styles.cta.launch, ...styles.cta.launch.mobile }}
          >
            Launch Telegram
          </a>
        </div>
      </div>
    </div>
  </>
);

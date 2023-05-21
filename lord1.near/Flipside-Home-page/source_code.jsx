const main = {};
const linkStyle = {
  "text-decoration": "none",
};
const time = {
  float: "right",
};
const like = {
  border: "2px solid  lightgray",
  "border-radius": "1000px",
};
const toptip = {
  "font-size": "15px",
  padding: "1.8%",
  float: "right",
  color: "#e7ad06",
  "box-shadow": "0 0px 20px rgba(36, 6, 231, 0.2)",
  "border-radius": "1000px",
  border: "2px outset  #e7d106",
};
const avatar = {
  "border-radius": "13px",
  border: "2px solid lightgray",
  width: "20%",
  height: "30%",

  "@media (min-width: 400px)": {
    width: "25%",
    height: "35%",
  },
  "@media (min-width: 1000px)": {
    width: "30%",
    height: "40%",
  },
};

const screen = {
  "border-radius": "13px",
  border: "2px solid lightgray",
  width: "100%",
  height: "10%",
  "box-shadow": "0 20px 20px rgba(128, 117, 226, 0.2)",
  minHeight: "10%",
};
const box = {
  height: "280px",
  "margin-top": "3.5%",
  float: "left",
  padding: "0.5%",
  "@media (min-width: 1000px)": {
    height: "380px",
  },
};
const innerbox = {
  "box-shadow": "0 20px 20px rgba(128, 117, 226, 0.15)",
  "font-size": "12px",
  "border-top": "1px solid  lightgray",
  "border-left": "1px solid  lightgray",
  "border-right": "1px solid  lightgray",

  height: "280px",
  padding: "2%",
  "border-radius": "13px",
  "@media (min-width: 1000px)": {
    height: "380px",
  },
};

const insidebox = {
  "font-size": "15px",
  "padding-bottom": "10px",
  "border-radius": "13px",
  width: "100%",
  "max-height": "50%",
  "margin-bottom": "10px",
};
const middlebox = {
  "font-size": "13px",
  "border-radius": "13px",
  width: "100%",
  "max-height": "35%",
  "margin-top": "10px",
  float: "left",
  "padding-top": "2.5%",
  "padding-bottom": "0.5%",
};
const middownbox = {
  "font-size": "10px",
  color: "lightgray",
  "border-radius": "13px",
  width: "100%",
  height: "35px",
  "margin-top": "0.5%",
  float: "left",
  "margin-bottom": "3%",
};
const downbox = {
  "font-size": "10px",
  width: "100%",
  "max-height": "5%",
  float: "right",
};
// header ------------------------------------------------------------------------------------------
const Gradient = styled.div`
   {
    margin-top: -25px;
    margin-bottom: 25px;
    height: 250px;
    text-align: center;
    background: radial-gradient(
      circle,
      rgba(29, 55, 57, 1) 30%,
      rgba(24, 24, 24, 1) 80%
    );

    font-family: Arial, sans-serif;
  }

  .text-primary-gradient {
    color: #53fdca;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(#fc3fff, #789efb);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .subtitle-above {
    font-size: 18px;
    letter-spacing: 1px;
    font-family: Courier, monospace;
  }

  .subtitle-below {
    font-size: 16px;
  }

  .slogan {
    font-weight: 600;
    font-size: 60px;
  }
`;
let header = (
  <Gradient
    className="d-flex flex-column justify-content-center"
    style={{ "border-radius": "15px", "margin-top": "10px" }}
  >
    <h1 class="mb-3 text-white slogan">
      <span>
        <img
          src="https://yt3.googleusercontent.com/zkArEwljuLKjF7S1rbXoyQWW1VC8QzgVzrFP7KKqOypFtSv0cKgIXbfOBdIFO3ZoBD_wJJUyyw=s900-c-k-c0x00ffffff-no-rj"
          style={{
            width: "80px",
            height: "80px",
            "box-shadow": "0 0px 20px rgba(1300, 60, 231, 20)",
            "border-radius": "1000px",
          }}
        ></img>
      </span>
      <span class="text-primary-gradient">Flipside </span>Crypto
    </h1>
    <div class="subtitle-below text-white opacity-75">
      Access the most reliable blockchain data, for free. Discover analyses on
      leading protocols from expert analysts.
    </div>
  </Gradient>
);
// header ------------------------------------------------------------------------------------------

// button ------------------------------------------------------------------------------------------

const Container = styled.div`
  .tabContent{
    display:inline-flex;
    align-items:center;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding:3px 4px;
    list-style-type:none;
  }
  .tab-item .active{
    background: #052119;
  }
  .tab-item button{
    background-color:transparent;
    border-radius: 50px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    height:45px;
    padding:0px 22px;
    border:none;
              

  }
  .uploadButton .btn{
    background: #052119;
    border-radius: 50px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    border:none;

  }
  .title{
     font-weight: 500;
     font-size: 16px;
     color: #FFFFFF;
     margin-bottom:10px;

   }
   .form-input{
     display:block;
     background:  #052119;
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 50px;
     height: 47px;
     width:100%;
     color: white;
     padding:0 20px
     
   }
   .form-input:focus-visible{
    outline:none;

   }
`;

const Tab = {
  Trending: "trending",
  New: "new",
  Alltime: "greatest",
};

const origTab = () =>
  image.nft.contractId || image.nft.tokenId
    ? Tab.New
    : !image.ipfs_cid && image.url
    ? Tab.Alltime
    : Tab.Trending;

State.init({
  tab: origTab(),
});

const setTab = (tab) => State.update({ tab });

let buttonbar = (
  <Container>
    <ul className="tabContent">
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.Trending ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Trending)}
        >
          Trending
        </button>
      </li>
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.New ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.New)}
        >
          New
        </button>
      </li>

      <li className="tab-item">
        <button
          className={`${state.tab === Tab.Alltime ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Alltime)}
        >
          Alltime
        </button>
      </li>
      <input
        class="form-input"
        placeholder="Page Number"
        type="text"
        value={state.memo}
      />
    </ul>
  </Container>
);

// page finder (number)
initState({ memo });

const dats = {
  memo: parseInt(state.memo),
};
let page;
if (!dats.memo) {
  page = 1;
} else {
  page = dats.memo;
}

let pageto = page * 20 - 20;
//  apifetch

let type = state.tab;
const data = fetch(
  `https://flipsidecrypto.xyz/api/discover/get?d_sort=${type}&d_project=near&d_page=${page}`
);

let tableRows = [];
for (let i = 0; i < data.body.dashboards.length; i++) {
  const frank = data.body.dashboards[i];

  //some avatarUrl are Null , so replace Nulls with the avatar below
  let avatarUrl;
  if (frank.avatarUrl) {
    avatarUrl = frank.avatarUrl;
  } else {
    avatarUrl = "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png";
  }
  // shorten the title that are more than 28 char
  let title;
  if (frank.title.length > 28) {
    title = frank.title.substring(0, 28) + "...";
  } else {
    title = frank.title;
  }

  // shorten the descriptions that are more than 70 char
  let description;
  if (frank.description.length > 70) {
    description = frank.description.substring(0, 70) + "...";
  } else if (frank.description.length < 1) {
    description =
      "No description found, please open the dashboard to see more information.";
  } else {
    description = frank.description;
  }

  // some screenshotUrl are Null, so replace the image below with Null
  let screenshotUrl;
  if (frank.screenshotUrl) {
    screenshotUrl = frank.screenshotUrl;
  } else {
    screenshotUrl = "https://i.postimg.cc/GtQ9pFK3/sdsdad.png";
  }

  //some usernames are long, use this part to substring the first part and last part of usernames (4 first char+...+last 4 char)
  let username;
  if (frank.username.length > 15) {
    username =
      frank.username.substring(0, 4) + "..." + frank.username.substring(38, 42);
  } else if (frank.username.length < 1) {
    username =
      "No description found, please open the dashboard to see more information.";
  } else {
    username = frank.username;
  }

  //make the Single digit to double digit (just for number < 10 )
  let number;
  if (i + pageto + 1 <= 9) {
    number = "0" + (pageto + i + 1);
  } else {
    number = pageto + i + 1;
  }

  // turn data into (month + year) format
  let date = new Date(frank.createdAt);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let createdAt;
  createdAt = month + " " + year;

  tableRows.push(
    <div style={box} class="col-md-3">
      <div style={innerbox}>
        <div class="col">
          <div class="col-md-12">
            <th class="col-md-4">
              <tr scope="col" style={{ height: "50px" }}>
                <a
                  style={linkStyle}
                  href={`https://flipsidecrypto.xyz/${frank.username}`}
                  target="_blank"
                >
                  <span>
                    <img style={avatar} src={`${avatarUrl}`}></img>
                  </span>

                  {username}
                </a>
                <span></span>
                <span style={toptip}> {number}</span>
              </tr>
              <tr scope="col" class="col-md-12">
                <img style={screen} src={`${screenshotUrl}`}></img>
              </tr>
            </th>
          </div>
          <th>
            <tr scope="col" style={middlebox}>
              <a style={linkStyle} href={`${frank.url}`} target="_blank">
                {title}
              </a>
            </tr>
          </th>
          <th style={middownbox}>
            <tr style={discription} scope="col">
              {description}
            </tr>
          </th>
          <div style={downbox} class="container">
            <div class="row">
              <div class="col-md-4 " style={like}>
                <i>💗 {parseInt(frank.totalLikes)}</i>
              </div>

              <div class="col-md-8">
                <i style={time}>{createdAt}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let tbl = (
  <div class="table-responsive-sm">
    {pageNumber}
    <tr>
      <th>{tableRows}</th>
    </tr>
  </div>
);

return (
  <div>
    <div>{header}</div>
    <div>{buttonbar}</div>
    <div>{tbl}</div>
    <div style={{ "margin-top": "50px", "border-raduis-top": "15px" }}>
      <Widget src="lord1.near/widget/footer" props={{}} />
    </div>
  </div>
);

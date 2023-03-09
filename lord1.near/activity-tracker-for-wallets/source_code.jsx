const nn = {
  "background-image": "linear-gradient(270deg, #ff0420, #d9029d)",
  "font-family": "Rubik, sans-serif",
  color: "transparent",
  "-webkit-background-clip": "text",
  "background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  float: "right",
};

const bb = {
  "background-image": "linear-gradient(270deg, #ff0420, #d9029d)",
  "font-family": "Rubik, sans-serif",
  color: "transparent",
  "-webkit-background-clip": "text",
  "background-clip": "text",
  "-webkit-text-fill-color": "transparent",
};

const cc = {
  background:
    "linear-gradient(90deg, rgba(209,139,255,1) 0%, rgba(234,207,251,1) 0%, rgba(246,246,246,1) 100%",
};

const styleStat = {
  display: "flex",
  "flex-direction": "column",
  "font-weight": 500,
  "font-size": "16px",
  "line-height": "24px",
  "padding-right": "20px",
  "padding-bottom": "10px",
};
const ss = {
  "font-size": "20px",
  "box-shadow": "0 20px 20px rgba(128, 117, 226, 0.15)",
  border: "2px solid lightgray",
  padding: "2%",
  "border-radius": "13px",
  width: "50%",
};
const dd = {
  "font-size": "15px",
  border: "2px solid lightgray",
  padding: "5%",
  "border-radius": "13px",
  width: "100%",
  margin: "2px",
};

State.init({
  is_stake_loading: false,
  is_born_date_loading: false,
  is_born_date_loadings: false,
  is_swap_loading: false,
  is_children_loading: false,
  is_ledger_loading: false,

  address: "",
  ledger_data: [],
  stake_data: [],
  social: [],
  children_data: [],
  born_data: [],
  born_datas: [],

  is_init: true,
});

const {
  is_stake_loading,
  is_born_date_loading,
  is_born_date_loadings,
  is_swap_loading,
  is_children_loading,
  is_ledger_loading,
  address,
  previous_address,
  social,
  stake_data,
  ledger_data,
  children_data,
  born_data,
  born_datas,
  is_init,
} = state;

const is_loading =
  is_stake_loading &&
  is_born_date_loading &&
  is_born_date_loadings &&
  is_swap_loading &&
  is_children_loading &&
  is_ledger_loading;

const is_any_loading =
  is_stake_loading ||
  is_born_date_loading ||
  is_born_date_loadings ||
  is_swap_loading ||
  is_children_loading ||
  is_ledger_loading;

const fetchData = (sql, whichState, whichLoadingState) => {
  //clear and reset data
  State.update({ [whichLoadingState]: true, [whichState]: [] });
  sql = sql.replace("{{address}}", address).replace(/\+/g, "%2B");
  var formBody = [];
  formBody.push(`statement=${sql}`);
  formBody = formBody.join("&");

  // doesn't work
  try {
    asyncFetch("https://flipside.leslug.com/execute", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    }).then((res) => {
      State.update({
        [whichState]: res.body,
        [whichLoadingState]: false,
      });

      //.catch doesn't work either
    });
  } catch {
    State.update({
      [whichLoadingState]: false,
      [whichState]: [],
    });
  }
};

const ellipsizeThis = (x, leftCharLength, rightCharLength) => {
  let totalLength = leftCharLength + rightCharLength;

  if (totalLength >= x.length) {
    return x;
  }

  return x.substring(0, leftCharLength) + "..." + x.substr(-rightCharLength);
};

function toTwoDecimals(x) {
  if (!x) {
    return "";
  }
  if (typeof x === "string") {
    x = parseFloat(x);
  }
  return x.toLocaleString("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

const getStakeData = () => {
  let sql = `
select 
count(distinct TX_HASH) as trx ,
monthname(date_trunc('month',BLOCK_TIMESTAMP) ) as date 
from near.social.fact_decoded_actions 
where SIGNER_ID = {{address}}
group by 2 order by date desc `;

  fetchData(sql, "stake_data", "is_stake_loading");
};

const getIsLedgerData = () => {
  let sql = `with a as 
(
select 
distinct  TX_HASH ,
BLOCK_TIMESTAMP ,
SIGNER_ID as sin,

case 
when parse_json(node_data:graph):key::string ='poke' then 'poke'
when parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='follow' then 'follow'
when parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='unfollow' then 'unfollow'
when parse_json(node_data:like):key:type::string ='social' then 'like'
when parse_json(node_data:comment):item:type::string ='social' then 'comment'
when parse_json(node_data:comment):key::string is not null  then null
when parse_json(node_data:post):key::string is not null  then null
when parse_json(node_data:follow)::string is not null then null 

else NODE end as action ,


NODE_DATA


from 
near.social.fact_decoded_actions 
)



select 
 count(distinct TX_HASH )as total_trxs ,
 (SUM (CASE when action ='post' THEN 1 ELSE 0 END)) as post ,
 (SUM (CASE when action ='like' THEN 1 ELSE 0 END)) as "like" ,
(SUM (CASE when action ='commenet' THEN 1 ELSE 0 END)) as commenets ,
(SUM (CASE when action ='poke' THEN 1 ELSE 0 END)) as poke ,
 (SUM (CASE when action ='widget' THEN 1 ELSE 0 END)) as widget ,
 (SUM (CASE when action ='profile' THEN 1 ELSE 0 END)) as profile ,
 (SUM (CASE when parse_json(NODE_DATA:graph):key::string ='follow'and parse_json(NODE_DATA:graph):value:type::string ='follow'  THEN 1 ELSE 0 END)) as follow ,
 (SUM (CASE when parse_json(NODE_DATA:graph):key::string ='follow'and parse_json(NODE_DATA:graph):value:type::string ='unfollow'  THEN 1 ELSE 0 END)) as unfollow , 
(post+commenets+poke+widget+profile+follow+unfollow+"like") as total_activity_trx ,
total_trxs - total_activity_trx as total_widget_trx 
from a 
where  action is not null
 AND sin = '{{address}}'`;
  fetchData(sql, "ledger_data", "is_ledger_loading");
};

const getBornDateData = () => {
  let sql = `with a as 
(
select 
distinct  TX_HASH  as tx_hashs,
BLOCK_TIMESTAMP as block_timestamp,
SIGNER_ID as singers ,
NODE  as action ,
case when  NODE ='profile' then SIGNER_ID else null end as target_account ,
case  when NODE ='profile' then parse_json(node_data):name::string else NODE_DATA end as profiles


from  near.social.fact_decoded_actions 
where target_account =singers
)



select *
from a  where  action is not null
AND singers = '{{address}}'
order by block_timestamp desc limit 1 `;
  fetchData(sql, "born_data", "is_born_date_loading");
};

const getBornDateDatas = () => {
  let sql = `
select 
count(distinct TX_HASH) as trx ,
monthname(date_trunc('month',BLOCK_TIMESTAMP) ) as date 
from near.social.fact_decoded_actions 
where SIGNER_ID = {{address}}
group by 2 order by date desc  `;
  fetchData(sql, "born_datas", "is_born_date_loadings");
};
let date = born_datas.map((items) => items.date);
let trx = born_datas.map((items) => items.trx);
let srcc = `
https://quickchart.io/chart?width=400&height=180&chart={type:'bar',data:{labels:${JSON.stringify(
  date
)}, datasets:[{label:'',data:${JSON.stringify(trx)}}]}}`;

const getSwapData = () => {
  let sql = `with a as 
(
select 
distinct  TX_HASH as tx_hash ,
BLOCK_TIMESTAMP as block_timestamp ,
SIGNER_ID as singer ,

case 
when parse_json(node_data:graph):key::string ='poke' then 'poke'
when parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='follow' then 'follow'
when parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='unfollow' then 'unfollow'
when parse_json(node_data:like):key:type::string ='social' then 'like'
when parse_json(node_data:comment):item:type::string ='social' then 'comment'
when parse_json(node_data:comment):key::string is not null  then null
when parse_json(node_data:post):key::string is not null  then null
when parse_json(node_data:follow)::string is not null then null 

else NODE end as action ,


case
 when  parse_json(node_data:graph):key::string ='poke' then parse_json(node_data:graph):value:accountId::string
 when  NODE ='profile' then SIGNER_ID
 when  parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='unfollow'  then parse_json(node_data:graph):value:accountId::string
 when  parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='follow'  then parse_json(node_data:graph):value:accountId::string
 when  NODE ='widget' then SIGNER_ID
 when  NODE ='post' then SIGNER_ID
when parse_json(node_data:comment):item:type::string ='social'  then split((parse_json(node_data:comment):item:path::string),'/')[0]
when parse_json(node_data:like):key:type::string ='social' then   split((parse_json(node_data:like):key:path::string),'/')[0]
when parse_json(node_data:moo)::string is not null then  SIGNER_ID
when parse_json(node_data:genie):answers::string is not null then  split(split(parse_json(node_data:genie):answers::string ,'--')[0] ,'"')[1]
when parse_json(node_data:sent)::string is not null then  split(split(parse_json(node_data:sent)::string ,':')[0] ,'"')[1]

else null end as target_account ,


case 
--when parse_json(node_data:like):key:type::string ='social' then   null
when parse_json(node_data:graph):value:type::string ='unfollow'  then null 
 when  parse_json(node_data:graph):key::string ='poke' then null 
when parse_json(node_data:follow)::string is not null then null 
when parse_json(node_data:graph):value:type::string ='follow'  then null 
when NODE ='profile' then NODE_DATA
when NODE ='widget' then null
when parse_json(node_data:comment):item:type::string ='social'  then parse_json(node_data:comment):text::string
when parse_json(node_data:comment):key::string is not null  then null
when parse_json(node_data:post):key::string is not null  then null
when parse_json(node_data:main):type::string ='md'  then parse_json(node_data:main):text::string
when parse_json(node_data:moo)::string is not null then  (parse_json(node_data:moo):value::string)
when parse_json(node_data:genie):answers::string is not null then  parse_json(node_data:genie):answers::string 
when parse_json(node_data:sent)::string is not null then  split(split(split(parse_json(node_data:sent)::string ,':')[1] ,'"')[1],'"')[0]
when parse_json(node_data:boo)::string is not null then  parse_json(node_data:boo):value::string
when parse_json(node_data:blunt)::string is not null then  parse_json(node_data:blunt):value::string
when parse_json(node_data:answer_poll)::string is not null then parse_json(node_data:answer_poll):key::string || parse_json(node_data:answer_poll):value:user_vote::string || parse_json(node_data:answer_poll):value:user_answer::string 

else NODE_DATA end as node_datas 


from 
near.social.fact_decoded_actions 
)



select *
 from a 
where  action is not null
 AND singer = '{{address}}'
order by block_timestamp desc`;
  fetchData(sql, "social", "is_swap_loading");
};

const getChildrenData = () => {
  let sql = `with a as 
(
select 
distinct  TX_HASH ,
SIGNER_ID ,

case 
when parse_json(node_data:graph):key::string ='poke' then 'poke'
when parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='follow' then 'follow'
when parse_json(node_data:graph):key::string ='follow'and parse_json(node_data:graph):value:type::string ='unfollow' then 'unfollow'
when parse_json(node_data:like):key:type::string ='social' then 'like'
when parse_json(node_data:comment):item:type::string ='social' then 'comment'
when parse_json(node_data:comment):key::string is not null  then null
when parse_json(node_data:post):key::string is not null  then null
when parse_json(node_data:follow)::string is not null then null 
 when NODE ='widget' then 'widget create'
 when NODE ='profile' then 'profile'
 when parse_json(node_data:main):type::string ='md' then 'post'
 else 'widget related' end as action 


from 
near.social.fact_decoded_actions 
where  action is not null

)


select 
count(distinct tx_hash) as trxs ,
 action 
 from a 
 where  SIGNER_ID = '{{address}}'
group by 2 order by 1 desc `;
  fetchData(sql, "children_data", "is_children_loading");
};

let action = children_data.map((item) => item.action);
let trxs = children_data.map((item) => item.trxs);
let src = `
https://quickchart.io/chart?width=200&height=180&chart={type:'bar',data:{labels:${JSON.stringify(
  action
)}, datasets:[{label:'',data:${JSON.stringify(trxs)}}]}}`;

const onAddressChange = ({ target }) => {
  State.update({ address: target.value });
};

const onSearch = () => {
  State.update({ is_init: false });
  getStakeData();
  getBornDateData();
  getBornDateDatas();
  getIsLedgerData();
  getChildrenData();
  getSwapData();
};

return (
  <div>
    <strong style={bb}>
      Put your near address in the box and click on the search button
    </strong>
    <i>
      {" "}
      credit : antonyip bar chart widget , mob.near widgets and reallyveryy.near
      widget
    </i>
    <div class="d-flex flex-row align-items-center mt-4">
      <div class="w-100">
        <input
          onChange={onAddressChange}
          class="form-control"
          placeholder="Near Address : chefsale.near"
        />
      </div>
      <div class="d-flex">
        <button
          class="btn btn-info btn-sm d-flex flex-row ms-3"
          onClick={() => {
            onSearch();
          }}
          disabled={is_any_loading}
        >
          {!is_any_loading && <i class="bi bi-search me-2"></i>}
          {is_any_loading && (
            <div class="spinner-grow spinner-grow-sm me-2" role="status"></div>
          )}
          Search
        </button>
      </div>
    </div>
    <div class="d-flex w-100" style={{ minHeight: 500 }}>
      {is_loading && (
        <div
          class="spinner-border spinner-border-lg m-auto"
          role="status"
        ></div>
      )}
      {!is_loading && !is_init && (
        <div class="d-flex flex-column w-100 h-100 p-3  mt-5">
          <div class="col-12 row">
            <Widget
              src="mob.near/widget/ProfileLarge"
              props={{ accountId: address }}
            />
          </div>
          <div
            class="container mt-3"
            style={{
              color: " #000",
              background:
                "linear-gradient(90deg, rgba(209,139,255,1) 0%, rgba(234,207,251,1) 0%, rgba(246,246,246,1) 100%",
              padding: "20px",
              border: "2px solid #282828",
              "border-radius": "13px",
              heigth: "100vh",
              "min-width": "300px",
            }}
          >
            <h3 class="mb-5 mt-2" style={bb}>
              Near Social Transactions
            </h3>

            <div class="row">
              <div class="col-md-6 mt-3">
                <div>
                  <img src={src} />
                </div>
              </div>
              <div class="col-md-6 mt-4">
                {ledger_data.map((xx) => (
                  <div class="row ">
                    <span class="col-md-3 mt-2 " style={ss}>
                      <div style={dd}>
                        <i>Total Transaction</i> :
                        <i style={nn}> {xx.total_trxs}</i>
                      </div>
                      <div style={dd}>
                        <i>Follow</i>:<i style={nn}> {xx.follow}</i>
                      </div>
                      <div style={dd}>
                        <i>UnFollow</i> :<i style={nn}> {xx.unfollow}</i>
                      </div>
                      <div style={dd}>
                        <i>Post </i>:<i style={nn}> {xx.post}</i>
                      </div>
                      <div style={dd}>
                        <i>Profile </i>:<i style={nn}> {xx.profile}</i>
                      </div>
                    </span>
                    <span class="col-md-3 mt-2 " style={ss}>
                      <div style={dd}>
                        <i> Poke </i> : <i style={nn}>{xx.poke}</i>{" "}
                      </div>
                      <div style={dd}>
                        <i>Like </i> : <i style={nn}>{xx.like}</i>{" "}
                      </div>
                      <div style={dd}>
                        <i>Comment </i> : <i style={nn}>{xx.commenets}</i>{" "}
                      </div>
                      <div style={dd}>
                        <i> Widget Create </i> :<i style={nn}>{xx.widget}</i>
                      </div>
                      <div style={dd}>
                        <i>Widget Related </i> :
                        <i style={nn}> {xx.total_widget_trx}</i>
                      </div>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 "></div>
            </div>
          </div>

          <h3 class="text-lg mt-5 " style={bb}>
            Transaction's History in near social
          </h3>
          <div class="row"></div>
          <div class="table-responsive mt-3">
            <table class="table-striped table" style={{ minHeight: 100 }}>
              <thead>
                <tr style={cc}>
                  <th>Block Timestamp</th>
                  <th>Tx Hash</th>
                  <th>Account</th>
                  <th>Action</th>
                  <th>Target Account</th>
                  <th>About</th>
                </tr>
              </thead>
              <tbody>
                {social.map((x) => (
                  <tr>
                    <td>{x.block_timestamp}</td>
                    <td>
                      <a
                        href={`https://nearblocks.io/txns/${x.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ellipsizeThis(x.tx_hash ?? "N/A", 4, 3)}
                      </a>
                    </td>
                    <td>
                      <Widget
                        src="mob.near/widget/ProfileLine"
                        props={{ accountId: address }}
                      />
                    </td>
                    <td style={bb}>{x.action}</td>
                    <td class="width:10%">
                      <Widget
                        src="mob.near/widget/ProfileLine"
                        props={{ accountId: x.target_account }}
                      />
                    </td>
                    <td>{x.node_datas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);

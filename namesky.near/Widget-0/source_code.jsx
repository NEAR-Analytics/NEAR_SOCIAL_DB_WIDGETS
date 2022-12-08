const namesky_url = "https://testnet.namesky.app";

let data = fetch("https://api.thegraph.com/subgraphs/name/hsxyl/nnn", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
    query GetUserActions($user_id: String) {
  userActions(
    first: 50
    orderBy: timestamp
    orderDirection: desc
    where: {action_type_in: [update_listing_action,create_listing_action,nft_mint_action]}
  ) {
    id
    timestamp
    action_type
    user_id
    create_listing_action {
      price
      listing {
        seller_id
        price
        token_id
      }
    }
    update_listing_action {
	  old_price
	  new_price
	  listing_id
      listing {
        seller_id
        token_id
      }
    }
	nft_mint_action {
		owner_id
		token_id
	}
  }
}
      `,
    variables: {
      user_id: "xsb.testnet",
    },
  }),
});

if (!data) {
  return "Loading1";
}

let transfer_to_readable = (amount) => {
  let decimals = 24;
  if (amount === undefined || amount === null) return "";
  let wholeStr = amount.substring(0, amount.length - decimals) || "0";
  let fractionStr = amount
    .substring(amount.length - decimals)
    .padStart(decimals, "0")
    .substring(0, decimals);
  return `${wholeStr}.${fractionStr}`.replace(/\.?0+$/, "");
};

let wrap_url_by_token_id = (token_id, text) => (
  <a href={`${namesky_url}/${token_id}`}>{text}</a>
);

// -------------------------

/**
 *  create_listing_action {
      price
      listing {
        seller_id
        token_id
      }
    }
 * @param e 
 */
let create_listing_action = (e) => (
  <span style={{ fontFamily: sans - serif, color: "#333" }}>
    {wrap_url_by_token_id(e.listing.token_id, e.listing.token_id)}
    is listing on ${transfer_to_readable(e.price)} Ⓝ.
    <a href={`${namesky_url}/${e.listing.token_id}`}>Buy it now!</a>
  </span>
);

/**
 *  update_listing_action {
      old_price
      new_price
	  listing_id
      listing {
        seller_id
		contract_id
        token_id
      }
    }
 * @param e 
 */
let update_listing_action = (e) => (
  <span>
    {wrap_url_by_token_id(e.listing.token_id, e.listing.token_id)}
    update price: {transfer_to_readable(e.old_price)} Ⓝ to
    {transfer_to_readable(e.new_price)} Ⓝ.
    {wrap_url_by_token_id(e.listing.token_id, "Buy it now!")}
  </span>
);

/**
 *  nft_mint_action {
      owner_id
	  token_id
    }
 * @param e 
 */
let nft_mint_action = (e) => (
  <span>
    {wrap_url_by_token_id(e.token_id, e.token_id)}
    have been mint as an NFT.
    {wrap_url_by_token_id(e.token_id, "Make offer to it!")}
  </span>
);

let userActions = data.body.data.userActions;
console.log(userActions);

let userActionComp = (e) => {
  if (e.action_type == "create_listing_action") {
    return create_listing_action(e.create_listing_action);
    // return <div>a</div>;
  } else if (e.action_type === "update_listing_action") {
    return update_listing_action(e.update_listing_action);
  } else if (e.action_type === "nft_mint_action") {
    return nft_mint_action(e.nft_mint_action);
  }
};

const timeAgo = (timestamp_nanosec) => {
  let timeMs = parseFloat(timestamp_nanosec) / 1e6;
  let diffSec = Date.now() - timeMs;
  return diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;
};

let view = userActions.map((e) => {
  return (
    <div>
      {userActionComp(e)}
      <span className="text-muted">{timeAgo(e.timestamp)}</span>
    </div>
  );
});

return <div>{view}</div>;

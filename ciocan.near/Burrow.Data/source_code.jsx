const assets = Near.view("contract.main.burrow.near", "get_assets_paged");

const data = {
  assets,
};

if (typeof props.onLoad === "function") {
  props.onLoad(data);
}

return <div />;

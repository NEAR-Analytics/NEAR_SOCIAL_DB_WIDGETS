const data = {
  assets: { near: 123 },
};

if (typeof props.onLoad === "function") {
  props.onLoad(data);
}

return <div>Burrow.Data</div>;

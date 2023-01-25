const data = {
  assets: { near: 123 },
};

if (typeof props.onLoad === "function") {
  console.log("Burrow.Data", props, typeof props.onLoad);
  // onLoad(data);
}

return <div>Burrow.Data</div>;

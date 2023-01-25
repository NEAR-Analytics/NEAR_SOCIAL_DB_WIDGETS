const data = {
  assets: { near: 123 },
};

if (props.onLoad) {
  console.log("Burrow.Data", props, typeof props.onLoad);
  // onLoad(data);
}

return <div>Burrow.Data</div>;

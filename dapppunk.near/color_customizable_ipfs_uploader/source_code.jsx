State.init({
  img: null,
  color: "green",
});

return (
  <div className="container row">
    <IpfsImageUpload
      image={state.img}
      style={{ color: state.color, borderColor: state.color }}
    />
  </div>
);

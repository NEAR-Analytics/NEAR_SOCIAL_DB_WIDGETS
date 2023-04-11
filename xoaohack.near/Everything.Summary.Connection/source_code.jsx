const object = props.data;
return (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img className="img-fluid" src={object.image} alt="" />
        <p>{object.caption}</p>
        <p>{object.name}</p>
      </div>
      <div className="col-md-6">
        <p>{object.location}</p>
        <p>{object.time}</p>
      </div>
    </div>
  </div>
);

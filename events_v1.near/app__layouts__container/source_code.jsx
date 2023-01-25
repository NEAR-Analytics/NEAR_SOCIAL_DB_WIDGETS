const title = props.title ?? '';

return (
  <>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Widget src={props.component.src} props={props.component.props} />
        </div>
      </div>
    </div>
  </>
);

const title = props.layoutProps.title ?? '';

return (
  <>
    <div
      className="container"
      style={{
        paddingTop: '1rem',
      }}
    >
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

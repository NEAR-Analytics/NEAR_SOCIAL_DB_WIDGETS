const title = props.layoutProps.title || null;

return (
  <>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          width: '80%',
          height: '80%',
          maxWidth: 600,
          maxHeight: 600,
          padding: 32,
          borderRadius: 16,
        }}
      >
        {title ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            {title}
          </div>
        ) : null}

        {/* container */}
        <div style={{ height: '100%' }}>
          {props.engine.renderComponent(props.component.src)}

          {/* <Widget src={props.component.src} props={props.component.props} /> */}

          {/* <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            
          </div> */}

          {/* <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'flex-end',

              // backgroundColor: 'red',
            }}
          >
            <button
              style={{
                // position: 'absolute',
                // bottom: 0,
                // right: 0,
                // backgroundColor: 'red',
              }}
              onClick={() => {
                props.routing.pop();
              }}
            >
              
            </button>
          </div> */}
        </div>
      </div>
    </div>
  </>
);

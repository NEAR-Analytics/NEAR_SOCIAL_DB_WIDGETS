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
        overflow: 'hidden',
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

          boxShadow: '0 0 10px 10px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'stretch',
            padding: 32,
            borderRadius: 16,
          }}
        >
          {/* close button */}
          <button
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: 16,
              cursor: 'pointer',
            }}
            onClick={() => {
              props.routing.pop();
            }}
          >
            &times;
          </button>

          {/* title */}
          {title ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
                fontSize: 24,
                fontWeight: 'bold',
                backgroundColor: 'white',
                borderBottom: '1px solid #ccc',
              }}
            >
              {title}
            </div>
          ) : null}

          {/* container */}
          <div style={{ height: '100%', overflow: 'scroll' }}>
            {props.component.name}
            {JSON.stringify(props.component.props)}
            {props.engine.renderComponent(
              props.component.name,
              props.component.props,
              props.component.layout,
              props.component.layoutProps
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);

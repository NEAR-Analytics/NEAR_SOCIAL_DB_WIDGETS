const PADDING_WITH_TITLE = 64;

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

        backdropFilter: 'blur(10px)',
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
          borderRadius: 16,
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
            borderRadius: 16,
          }}
        >
          {/* title */}
          {title ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 0,
                fontSize: 24,
                fontWeight: 'bold',
                backgroundColor: 'rgba(0,0,0,0.85)',
                borderBottom: '1px solid #ccc',
                width: '100%',
                minHeight: 48,
                padding: '12px 16px',
                boxShadow: '0 0 10px -3px rgba(0,0,0,0.2)',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
              }}
            >
              {title}
            </div>
          ) : null}

          {/* close button */}

          <button
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              top: 0,
              right: 0,
              width: 48,
              border: 'none',
              outline: 'none',
              padding: '0',
              cursor: 'pointer',
              color: 'black',
              fontSize: 32,
              borderRadius: '0 0 0 16px',
              textShadow: '0.5px -0.5px 0.5px #ccc, -0.5px 0.5px 0.5px #ccc',
              lineHeight: '40px',
              zIndex: 1000,
            }}
            onClick={() => {
              props.routing.pop();
            }}
          >
            &times;
          </button>

          {/* container */}
          <div
            style={{
              height: '100%',
              width: '100%',
              maxWidth: '100%',
              overflow: 'auto',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              paddingTop: title ? PADDING_WITH_TITLE : 0,
            }}
          >
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

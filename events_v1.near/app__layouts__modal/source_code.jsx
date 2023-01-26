const NAVBAR_HEIGHT = 64;

const title = props.layoutProps.title ?? null;

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
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          width: '100%',
          maxWidth: 600,
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

        <Widget src={props.component.src} props={props.component.props} />
      </div>
    </div>
  </>
);

const NAVBAR_HEIGHT = 64;
const NAVBAR_OFFSET_TOP = 0;

const title = props.layoutProps.title ?? null;
const 

return (
  <>

      {/* modal container */}
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
        {/* modal */}
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

              {props.layoutProps.back ? (
                <button
                  className=""
                  style={{
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: NAVBAR_HEIGHT,
                  }}
                  type="button"
                  onClick={() => {
                    console.log('back');
                    props.routing.pop();
                  }}
                >
                  &lt;
                </button>
              ) : null}

            </div>
          ) : null}
          

    </div>
    </div>
  </>
);

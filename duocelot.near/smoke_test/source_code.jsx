const accountId = context.accountId;

if (!accountId) {
  return (
    <div
      style={{
        width: "512px",
        height: "512px",
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        position: "flex",
        fontFamily: '"Press Start 2P", sans-serif',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://bafybeiep6yscx365ici64ce2o7ktr3vewuyk7rwj4kxpwrf4ugeloxgfri.ipfs.w3s.link/error-001.jpg"
        alt="ERROR 001"
        style={{
          width: "340px",
          margin: "50px 40px 10px 80px",
          position: "flex",
        }}
      />
      <h2
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "14px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ERROR 001: NO NEAR WALLET CONNECTED.{" "}
      </h2>{" "}
      <h3
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "12px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        Please connect with your near wallet or create one for free
      </h3>
      <a
        href="https://shard.dog/go?url=https://app.jumpdefi.xyz"
        style={{
          fontFamily: "Press Start 2P",
          fontSize: "14px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "40px 1opx 10px 10px",
        }}
      >
        HERE
      </a>
    </div>
  );
}

const Smoke = styled.div`
  position: relative;
  width: 100px;
  height: 90px;
  &:before,
  &:after {
    position: absolute;
    content: '';
    left: 70px;
    top: 0;
    width: 50px;
    height: 80px;
    background: grey;
    border-radius: 50px 50px 20px 50px;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }
  &:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
`;

const SmokeFade = styled.keyframes`
  0%{
        transform: rotate(0deg) translateX(100px);
        opacity: 1;
        filter:blur(1px);
    }
    100% {
      transform: rotate(35deg) translateY(-80px) translateX(-20px);
        opacity: 0;
        filter:blur(20px);
`;

const AnimatedSmoke = styled(Smoke)`
  animation: ${SmokeFade} 1200ms ease-out infinite;
  `;
const AnimatedSmoke2 = styled(Smoke)`
  animation: ${SmokeFade} 1200ms ease-out infinite;
   animation-delay: 500ms;`;

return (
  <div
    style={{
      width: "300px",
      height: "200px",
      backgroundSize: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "black",
      position: "relative",
      fontFamily: '"Press Start 2P", sans-serif',
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <a
      style={{
        fontFamily: "Press Start 2P",
        fontSize: "55px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "40px 1opx 10px 10px",
      }}
    >
      hello world
    </a>
    <div
      style={{
        width: "300px",
        height: "100px",
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        position: "relative",
        fontFamily: '"Press Start 2P", sans-serif',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedSmoke />
      <AnimatedSmoke2 />
    </div>
  </div>
);

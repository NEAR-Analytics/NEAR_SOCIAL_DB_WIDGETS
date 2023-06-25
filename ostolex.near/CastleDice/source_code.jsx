State.init({
  next: false,
});

const user = "ostolex.near";

const Background = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-frontend/main/public/assets/Menu%20and%20loading%20screen%20background.png");
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: calc(-98px + 100vh);
  top: 98px;
  left: 0;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigButton = styled.button`
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-frontend/main/public/assets/big%20button.png");
  color: #fff;
  font-family: Oldenburg;
  font-size: 60px;
  width: 600px;
  height: 120px;
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  font-weight: bold;
  background-size: contain;
`;
if (!state.next) {
  return (
    <Background>
      <BigButton onClick={() => State.update({ next: true })}>
        Play game
      </BigButton>
    </Background>
  );
}

return <Widget src={`${user}/widget/CastlediceWaitingRoom`} />;

const data = props.data;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: {data.container.backgroundColor};
  `;

const Header = styled.div`
  height: {data.header.height};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: {data.header.backgroundColor};
`;

const Logo = styled.img`
  height: 100%
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  background-color: #FFD50D;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function Content() {
  if (state.thingSrc) {
    return (
      <>
        <Widget
          src={"efiz.near/widget/Every.Thing.View"}
          props={{ path: state.thingSrc, ...state.p }}
        />
      </>
    );
  }
}

return (
  <Container>
    <Widget
      src="efiz.near/widget/marquee"
      props={{
        text: data.marquee.text,
        fontFamily: data.marquee.fontFamily,
        fontSize: data.marquee.fontSize,
        textColor: data.marquee.textColor,
        backgroundColor: data.marquee.backgroundColor,
        height: data.marquee.height,
        width: data.marquee.width,
      }}
    />
    <Header>
      <Logo src={data.logoSrc} />
    </Header>
    <Navigation>
      {data &&
        data.views?.map((view) => (
          <Button onClick={() => State.update({ thingSrc: view.src })}>
            {view.name}
          </Button>
        ))}
    </Navigation>
    <Content />
  </Container>
);

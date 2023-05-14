const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const Item = styled.div``;

return (
  <div>
    <Wrapper>
      <Header>
        <H1>Guide for Builders</H1>

        <Header>
          <a
            className="btn btn-success"
            href="#/edit/hack.near/widget/ForkThis"
          >
            Start Here
          </a>
          <a className="btn btn-outline-primary" href="https://docs.near.org">
            NEAR Documentation
          </a>
        </Header>

        <Text>
          <h3>Featured Tutorial</h3>
        </Text>

        <Items>
          <Item>
            <Widget
              src="adminalpha.near/widget/ComponentCard"
              props={{ src: "hack.near/widget/ForkThis" }}
            />
          </Item>
        </Items>
      </Header>
    </Wrapper>
  </div>
);

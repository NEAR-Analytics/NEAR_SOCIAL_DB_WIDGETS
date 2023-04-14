const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
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
  gap: 18px;
`;

const Item = styled.div``;

return (
  <div>
    <Wrapper>
      <Header>
        <H1>Guide for Builders</H1>

        <Text>
          <h4>Let's hack together!</h4>
          <h5>
            <b>Step 1:</b> Fork this
            <a href="/#/edit/hack.near/widget/ForkThis"> demo</a>.
          </h5>
          <h5>
            <b>Step 2:</b> Read instructions.
          </h5>
          <h5>
            <b>Step 3:</b> Save your work.
          </h5>
        </Text>

        <Header>
          <a
            className="btn btn-outline-success"
            href="#/hack.near/widget/Project.Page.Editor"
          >
            Submit Project
          </a>
        </Header>

        <Text>
          <h3>Featured</h3>
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

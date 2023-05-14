const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const defaultGuide = "hack.near/widget/ForkThis";
const defaultBuilder = "hack.near";

const guide = Social.get(`${accountId}/settings/dev/guide`);

if (guide === null) {
  return "Loading...";
}

State.init({
  guide: guide ?? defaultGuide,
  builder: builder ?? defaultBuilder,
});

const resetGuide = () => {
  state.guide = defaultGuide;
  State.update();
};

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

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

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
          <a
            className="btn btn-outline-primary"
            href="https://docs.near.org/discovery"
          >
            bOS Documentation
          </a>
        </Header>

        <Text>
          <h3>Featured Tutorial</h3>
        </Text>
        <Div>
          <div>
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{
                dep: true,
                authors: [state.builder],
              }}
            />
            {context.accountId && (
              <a
                key="edit"
                href={"#/hack.near/widget/dev.Guide.Editor"}
                className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
              >
                <i class="bi bi-patch-plus" /> Suggest New Tutorial
              </a>
            )}
          </div>
        </Div>
        <Items>
          <Item>
            <Widget
              src="adminalpha.near/widget/ComponentCard"
              props={{
                src: `${state.guide}`,
              }}
            />
          </Item>
        </Items>
      </Header>
    </Wrapper>
  </div>
);

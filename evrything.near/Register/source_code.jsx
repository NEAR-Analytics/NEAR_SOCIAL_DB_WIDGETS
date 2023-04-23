// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding-bottom: 16px;
// `;

// const Text = styled.p`
//   font-size: 1.2rem;
//   margin-bottom: 1rem;
//   font-family: ${font}, Times, serif;
// `;

const Link = styled.a`
  text-decoration: none;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const Post = styled.div`
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #ECEEF0;
  }
`;

const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body = styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
  padding-top: 4px;
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -6px -6px 6px;
`;

const Comments = styled.div`
  > div > div:first-child {
    padding-top: 12px;
  }
`;
const CommentWrapper = styled.div`
  > div:first-child {
    > a:first-child {
      display: inline-flex;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 20px;
      color: #687076;
      outline: none;
      font-weight: 600;

      &:hover,
      &:focus {
        color: #687076;
        text-decoration: underline;
      }
    }
  }
`;

return (
  <Post>
    <Header>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{
          accountId: "evrything.near",
          hideAccountId: false,
        }}
      />
    </Header>
    <Body>
      <Content>
        Welcome! In order to post, you'll need to create an account with
        <a href="https://near.org/">NEAR</a>.
        <br />
        <br />
        <Link href="https://shard.dog/go?url=https://near.social">
          <Button>click here to register</Button>
        </Link>
        <br />
        <br />
        <strong>everything</strong> was built using fully{" "}
        <a href="https://docs.near.org/discovery" target="_blank">
          decentralized technologies
        </a>
        , it's completely open source, it will always be free and open to the
        public, and we don't collect any of your information.
        <br />
        <br />
        It is a platform built for the people, by the people. And we mean that--
        tell us what you want us to build and help us build it!
        <br />
        <br />
        Because with <strong>everything</strong> we can do <i>anything</i>.
        <br />
        <br />
      </Content>
    </Body>
  </Post>
);

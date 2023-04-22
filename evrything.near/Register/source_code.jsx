const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: ${font}, Times, serif;
`;

const Link = styled.a`
  text-decoration: none;
`;

const Button = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #27ae60;
  }
`;

return (
  <Container>
    <Text>
      In order to post, you'll need to create an account with
      <a href="https://near.org/">NEAR</a>.<br />
      <br />
      <strong>everything</strong> was built using fully decentralized
      technologies, it's completely open source, and will always be free and
      open to the public.
      <br />
      <br />
      We take your privacy seriously, and we don't collect any of your
      information.
      <br />
      <br />
      It is a platform built for the people, by the people. And we mean that
      literally-- tell us what you want us to build and help us build it!
      <br />
      <br />
      Because with <strong>everything</strong> we can do <i>anything</i>
      .
      <br />
      <br />
      It's about time we had a platform like this.
    </Text>
    <Link href="https://shard.dog/go?url=https://near.social">
      <Button>register</Button>
    </Link>
  </Container>
);

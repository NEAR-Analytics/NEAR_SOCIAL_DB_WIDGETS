const StyledMainContent = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  text-align: center;
  > p {
    font-size: 18px;
    margin: 30px 0;
  }
  a {
    background-color: #000;
    color: #fff;
    height: 50px;
    line-height: 20px;
    padding: 16px;
    border-radius: 100px;
    font-size: 16px;
    margin-top: 20px;
    :hover {
      background-color: #282828;
      text-decoration: none;
    }
  };
`;

return (
  <StyledMainContent>
    <p>Want to start using the fastest way to onboard in Web3?</p>
    <a href="http://eepurl.com/hXyUnf" target="_blank">
      Register for Early Access
    </a>
  </StyledMainContent>
);

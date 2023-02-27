const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #F1F3F5;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  text-align: center;
  text-align: left;

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #687076;
    margin: 0;
  }

  a {
    display: block;
    background-color: #59E692;
    font-weight: 600;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    width: 100%;
    text-align: center;
    color: #11181C;
    border-radius: 100px;

    &:hover,
    &:focus {
      background: rgb(112 242 164);
      outline: none;
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

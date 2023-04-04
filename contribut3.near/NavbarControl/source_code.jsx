const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: .75em 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: sticky;
  top: 0;
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: .7em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  line-height: 1.5em;
  color: #11181c;
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 1em;
`;

const logo = (<LogoArea><></>NEAR Horizon</LogoArea>);

const Credits = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: .05em .55em;
  gap: 1em;
  background: #eceef0;
  border-radius: 100px;
  flex: none;
  order: 3;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1em;
  color: #11181c;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: .5em;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

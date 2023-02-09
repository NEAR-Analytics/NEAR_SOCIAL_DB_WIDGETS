const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
`;

const ButtonLink = styled.a`
  display: block;
  padding: 8px;
  height: 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #D7DBDF;
  background: #FBFCFD;
  color: #11181C !important;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

const IconButtonLink = styled.a`
  display: block;
  padding: 0;
  height: 32px;
  width: 32px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border: none;
  background: #F1F3F5;
  color: #006ADC !important;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

const PrimaryButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
`;

const IconButtons = styled.div`
  display: flex;
  gap: 8px;
`;

return (
  <>
    <H2>Get Involved</H2>

    <PrimaryButtons>
      <ButtonLink href="https://thewiki.near.page/PastPresentAndFutureOfNearSocial">
        What's Near Social?
      </ButtonLink>

      <ButtonLink href="https://thewiki.near.page/near.social_docs">
        Documentation
      </ButtonLink>
    </PrimaryButtons>

    <IconButtons>
      <IconButtonLink href="#/mob.near/widget/ProfilePage?accountId=self.social.near">
        <i className="bi bi-person-circle"></i>
      </IconButtonLink>
      <IconButtonLink href="https://t.me/NearSocial">
        <i className="bi bi-telegram"></i>
      </IconButtonLink>
      <IconButtonLink href="https://github.com/NearSocial">
        <i className="bi bi-github"></i>
      </IconButtonLink>
      <IconButtonLink href="https://twitter.com/NearSocial_">
        <i className="bi bi-twitter"></i>
      </IconButtonLink>
      <IconButtonLink href="https://thewiki.near.page/near.social">
        <i className="bi bi-wikipedia"></i>
      </IconButtonLink>
    </IconButtons>
  </>
);

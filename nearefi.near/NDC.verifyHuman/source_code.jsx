const currentUser = context.accountId;

const H4 = styled.h4`
  margin-bottom: 0;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

const Container = styled.div`
  position: relative:
  font-family: Avenir;
  font-size: 16px;
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StickyContainer = styled.div`
  position: "fixed",
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
`;

const PrimaryLink = styled.a`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const CastVotesSection = styled.div`
  background: #FDFEFF;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  h3, h4 {
    margin: 0 3px;
  }

  h3 {
    font-weight: 900;
  }

  .text-secondary {
    margin-left: 10px;
  }

  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }

    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

const isIAmHuman = () => {
  Near.view(registryContract, "is_human", { account: context.accountId });
};

const VerifyHuman = () => (
  <CastVotesSection className="not-verified d-flex align-items-center justify-content-between">
    <div>
      <h4>Want to participate on NEAR ReFi?</h4>
      <h5 className="text-secondary">
        Click on the button next to and Verify as a Human to proceed.
      </h5>
    </div>
    <PrimaryLink href="https://NEAReFI.org/human">Verify as Human</PrimaryLink>
  </CastVotesSection>
);

return (
  <Container>
    <div className="position-sticky">
      {isIAmHuman() ? <></> : <VerifyHuman />}
    </div>
  </Container>
);

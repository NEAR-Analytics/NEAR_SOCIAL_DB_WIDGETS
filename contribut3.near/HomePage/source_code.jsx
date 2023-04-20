const Row = styled.div`
  display: flex;
  flex-direction: row;

  &.reverse {
    flex-direction: row-reverse;
  }

  justify-content: space-between;
  align-items: center;
  gap: 1em;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const SectionHeader = styled.h3`
  text-align: center;
  font-family: 'FK Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 120%;
  color: #000000;

  &.black {
    font-size: 3em;
    color: #ffffff;
  }
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  text-align: left;

  h4 {
    font-family: 'FK Grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 120%;
    color: #000000;
  }

  p {
    font-family: 'FK Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 150%;
    color: #000000;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

console.log("here")

return (
  <div>
    <SectionHeader>
      Web3 Founders
    </SectionHeader>
    <Row>
      <SubSection>
        <h4>Join an acceleration program</h4>
        <p>
          Join an accelerator cohort where you will participate in live sessions focused on building, launching, and scaling a successful Web3 business.
        </p>
      </SubSection>
    </Row>
  </div>
);

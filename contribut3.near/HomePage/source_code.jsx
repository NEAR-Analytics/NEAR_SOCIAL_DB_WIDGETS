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
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.6932 30.1863C52.0726 30.1863 55.5813 26.3801 55.0826 21.9001C54.7019 18.492 51.9501 15.7401 48.5419 15.3595C44.0619 14.8607 40.2557 18.3695 40.2557 22.7488C40.2557 22.9632 40.2688 23.1732 40.2863 23.3832L34.6557 24.897C33.9732 23.2345 32.8751 21.7863 31.4969 20.6795L35.3688 14.3576C36.5676 14.8257 37.9107 15.0051 39.3238 14.7645C42.5701 14.2045 45.1207 11.5051 45.4619 8.22822C45.9651 3.43322 41.8701 -0.578654 37.0444 0.0688461C33.7632 0.506346 31.1251 3.1576 30.6963 6.43885C30.3551 9.04197 31.3744 11.422 33.1332 12.9882L29.2613 19.3101C27.9444 18.7107 26.4832 18.3782 24.9432 18.3782C22.8694 18.3782 20.9357 18.9863 19.3038 20.0276L13.5594 13.1063C14.8938 11.527 15.5894 9.38322 15.2176 7.08635C14.7013 3.8926 12.0851 1.36385 8.87818 0.943846C4.02193 0.305096 -0.0905683 4.39135 0.500057 9.24322C0.898182 12.5245 3.51006 15.1932 6.78256 15.6701C8.52381 15.9238 10.1688 15.5607 11.5426 14.7776L17.2869 21.6988C15.5282 23.5757 14.4432 26.1001 14.4432 28.8738C14.4432 31.0482 15.1082 33.0651 16.2413 34.7451L12.0807 38.3851C10.6019 37.1995 8.66381 36.5651 6.57693 36.8013C3.22131 37.182 0.491307 39.8638 0.0625567 43.2151C-0.558693 48.0713 3.53631 52.1751 8.38818 51.567C11.5819 51.1688 14.1938 48.6838 14.7538 45.5163C15.0907 43.6176 14.6838 41.8282 13.8001 40.3626L17.9651 36.7182C19.8201 38.3676 22.2613 39.3738 24.9344 39.3738C27.2269 39.3738 29.3488 38.6345 31.0769 37.3788L37.3594 44.112C36.1694 45.6957 35.5876 47.7651 35.9988 49.9701C36.5544 52.9276 38.9126 55.3032 41.8701 55.8588C46.9319 56.8126 51.3244 52.5951 50.6813 47.577C50.2657 44.3526 47.7282 41.732 44.5213 41.2157C42.5788 40.9051 40.7501 41.3601 39.2801 42.3138L26.5576 28.9001C26.1769 28.502 26.1551 27.9901 26.4351 27.7232L26.4657 27.6926C26.7719 27.3995 27.2269 27.3776 27.5507 27.5963L34.0563 32.807C34.2882 32.9951 34.6338 32.8945 34.7432 32.6145C35.1894 31.4507 35.4388 30.1907 35.4388 28.8695C35.4388 28.3795 35.4038 27.8982 35.3382 27.4301L40.9688 25.912C42.1632 28.432 44.7226 30.182 47.6888 30.182L47.6932 30.1863Z" fill="#66A0FF" />
      </svg>
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

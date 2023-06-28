const Logo = styled.img`
    width: 60px;
    margin: 0 20px 0 10px;
`;

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 0;
`;

const H6 = styled.h6`
  font-size: 12px;
  font-weight: 300;
  margin-right: 32px;
  margin-bottom: 0;
  line-height: 1.5;
  align-items: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Timer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 800;
    color: #FFD50D;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const TitleContainer = () => (
  <>
    <Logo src="https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg" />
    <H1>NDC</H1>
  </>
);

const TimerContent = () => {
  const TimeSlot = ({ time, title }) => (
    <div>
      <div className="time">{formatTime(time)}</div>
      <small>{title}</small>
    </div>
  );

  return (
    <>
      <H6>{state.title}</H6>
      <Timer className="d-flex">
        <TimeSlot title="days" time={state.days} />
        <TimeSlot title="hours" time={state.hours} />
        <TimeSlot title="minutes" time={state.minutes} />
        <TimeSlot title="seconds" time={state.seconds} />
      </Timer>
    </>
  );
};

return (
  <>
    <div className="p-4 bg-black text-white d-none d-lg-flex rounded justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <TitleContainer />
      </div>
    </div>
    <div className="d-md-flex row d-lg-none d-xl-none rounded bg-black">
      <div className="d-flex align-items-center justify-content-center rounded-top bg-black text-white">
        <TitleContainer />
      </div>
    </div>
  </>
);

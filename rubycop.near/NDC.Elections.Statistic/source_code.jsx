const { voted, total } = props;

const Chart = styled.div`
  width: 150px;
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  place-content: center;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: ${(props) =>
      `conic-gradient(#4F46E5, #9333EA, #9333EA, #4F46E5, calc(${props.voted}*1%), #d9d4f5 0)`};
    -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - 15px),#000 calc(100% - 15px));
            mask:radial-gradient(farthest-side,#0000 calc(99% - 15px),#000 calc(100% - 15px));
  }

  span {
    font-weight: 800;
    font-size: 32px;
    line-height: 120%;
    background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const H5 = styled.h5`
  margin-top: 10px;
  b {
    font-weight: 800;
  }
  small {
    font-weight: 400;
    font-size: 14px;
  }
`;

const percent = (voted / total) * 100;

return (
  <div>
    <Chart voted={percent}>
      <span>{percent}%</span>
    </Chart>
    <H5>
      <b>{voted}</b>/<small>{total} Humans Voted</small>
    </H5>
  </div>
);

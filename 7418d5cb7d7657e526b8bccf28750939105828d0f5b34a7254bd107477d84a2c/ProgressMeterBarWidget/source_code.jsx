const HalfArch = styled.div`
  position: relative;
  width: ${({ props }) => props.width}px;
  height: ${({ props }) => props.height}px;
  border-top-left-radius: ${({ props }) => props.border}px;
  border-top-right-radius: ${({ props }) => props.border}px;
  border-bottom: 0;
  background: #4498E0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  border-radius: 50%;
    background-image: ${({ percentage }) =>
      `conic-gradient(#FFD50D, #F29BC0 calc((${percentage}%, 0) / 2), #949191 0)`} ;

  transition: transform .5s ease-in-out;
  z-index: 1;
  transform: rotate(270deg);
}
&:after {
  content: "";
  position: absolute;
  display: block;
  background: white;
  z-index: 2;
  width: calc(100% - 32px);
  height: calc(200% - 32px);
  border-radius: 50%;
  top: 16px;
  left: 16px;
}

 `;

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 10;
    p {
      margin: 0;
      &:last-of-type {
        margin-top: 8px;
      }
    }

    
  `;

const sizes = {
  small: {
    width: 200,
    height: 100,
    border: 120,
  },
  medium: {
    width: 250,
    height: 125,
    border: 150,
  },
  large: {
    width: 300,
    height: 150,
    border: 180,
  },
};

const propsSize = props.size;
const registerUsersNum = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "gooddollar-v1.i-am-human.near",
});

console.log(propsSize);
const totalUsrNum = 1000;
const percentage = (registerUsersNum / 1000) * 100;
return (
  <HalfArch percentage={25} props={sizes[propsSize]}>
    <ContentBox>
      <p>
        {registerUsersNum}/{totalUsrNum}
      </p>
      <p>{percentage}%</p>
    </ContentBox>
  </HalfArch>
);

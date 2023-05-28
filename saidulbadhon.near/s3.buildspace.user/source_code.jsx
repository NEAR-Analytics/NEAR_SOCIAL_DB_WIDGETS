const theme = props.theme;

State.init({
  images: [],
  showBrowser: false,
});
const res = fetch(`http://localhost:8000/api/v1/buildspace/${props.name}`);

// if (!res.body?.list1)
//   return (
//     <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
//   );

// const handleBrowseButton = () => {
//   State.update({
//     showBrowser: !state.showBrowser,
//   });

console.log("XD:", res.body);
// };

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  min-height: 100vh;
  height: 100%;
`;

const ContentWrapper = styled.div`
  gap: 32px;
  // display: grid;
  // grid-template-columns: 1fr 524px;
  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: 1250px;
  padding-inline: 16px;

  @media screen and (max-width: 800px)  {
    // grid-template-columns: 1fr;
  }
`;

return (
  <ContainerWrapper>
    <ContentWrapper>
      <h1>ASDSDAS: {props.name}</h1>
    </ContentWrapper>
  </ContainerWrapper>
);

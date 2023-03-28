const user = "jgodwill.near";

const data = props.projectData;

const Cards = styled.div`
 display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: rgba(214, 214, 214, 0.2);
  border-radius: 10px;
  justify-content: center;
  padding-top: 3em;
  box-shadow: 0 0.05rem 0.05rem rgb(34 34 34 / 5%), 0 0.2rem 0.8rem rgb(34 34 34 / 8%);
`;
const componentList = data.map((projectData, key) => {
  return (
    <Widget
      src={`${user}/widget/nearprojectcard`}
      key={index}
      props={projectData}
    />
  );
});

return (
  <>
    <div class="container min-vw-100">
      <h3>Sample list of near projects </h3>
      <hr />
      <Cards>{componentList}</Cards>
    </div>
  </>
);

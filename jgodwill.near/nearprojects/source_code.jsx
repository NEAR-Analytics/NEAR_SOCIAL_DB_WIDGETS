const user = "jgodwill.near";

const data = props?.projectData;

// Define initial state

State.init({
  lastProject: 100,
});

// Define function to handle scrolling
const handleScroll = () => {
  if (
    window.innerHeight + document.scrollingElement.scrollTop >
    document.body.offsetHeight
  ) {
    State.update({
      lastProject: Math.min(lastProject + 100, data.length),
    });
  }
};

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: rgba(214, 214, 214, 0.2);
  border-radius: 10px;
  justify-content: space-evenly;
  padding-top: 3em;
  box-shadow: 0 0.05rem 0.05rem rgb(34 34 34 / 5%), 0 0.2rem 0.8rem rgb(34 34 34 / 8%);
`;
const componentList = data.slice(0, lastProject).map((projectData, i) => {
  if (projectData.ProjectName)
    return (
      <Widget
        src={`${user}/widget/nearprojectcard`}
        key={i}
        props={projectData}
      />
    );
});

return (
  <>
    <div class="container min-vw-100">
      <h3>Sample list of near projects </h3>
      <hr />
      <Cards onScroll={handleScroll}>
        {componentList || "Components Here"}
      </Cards>
    </div>
  </>
);

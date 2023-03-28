const user = "jgodwill.near";

const data = props?.projectData;

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

return (
  <div class="container-fluid">
    <h3 class="text-center">Sample list of near projects </h3>
    <hr />
    <Cards onScroll={handleScroll}>
      {data.map((projectData, i) => {
        if (projectData.ProjectName)
          return (
            <Widget
              src={`${user}/widget/nearprojectcard`}
              key={i}
              props={projectData}
            />
          );
      }) || "Components Here"}
    </Cards>
  </div>
);

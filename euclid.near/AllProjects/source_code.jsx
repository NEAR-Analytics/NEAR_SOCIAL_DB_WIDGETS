const data = Social.keys("*/project/*", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allProjects = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  const names = Object.keys(accounts[i][1].project);
  const projects = [];
  for (let j = 0; j < names.length; ++j) {
    const src = `${accountId}/project/${names[j]}`;
    projects.push(
      <div>
        <li>
          <a href={`#/${src}`}>{names[j] || <i>New Project</i>}</a>
        </li>
      </div>
    );
  }
  allProjects.push(
    <div className="col">
      <div className="card h-100">
        <div className="card-header">
          <Widget src="mob.near/widget/Profile" props={{ accountId }} />{" "}
        </div>
        <div className="card-body">{projects}</div>
      </div>
    </div>
  );
}

return (
  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xll-4 g-2">
    {allProjects}
  </div>
);

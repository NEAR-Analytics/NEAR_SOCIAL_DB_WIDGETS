const ownerId = "gov.near";
const tasks = Near.view(ownerId, "get_tasks").reverse();

return (
  <div>
    <div>
      <a
        class="btn btn-primary mb-2"
        data-bs-toggle="collapse"
        href="#collapseTaskEditor"
        role="button"
        aria-expanded="false"
        aria-controls="collapseTaskEditor"
      >
        Add Task
      </a>
    </div>
    <div class="collapse" id="collapseTaskEditor">
      <Widget src={`${ownerId}/widget/TaskEditor`} />
    </div>
    <hr />
    {tasks
      ? tasks.map((task) => {
          return <Widget src={`${ownerId}/widget/Task`} props={{ task }} />;
        })
      : ""}
  </div>
);

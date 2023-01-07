const ownerId = "devgovgigs.near";

const boards = props.boards ?? [
  {
    name: "near.social",
    id: "nearsocial",
    config: {
      requiredLabels: ["near-social"],
      columnLabels: ["widget", "integration", "feature-request"],
      excludedLabels: [],
    },
  },
  {
    name: "Gigs Board",
    id: "gigsboard",
    config: {
      requiredLabels: ["gigs-board"],
      columnLabels: ["nep", "badges", "feature-request"],
      excludedLabels: [],
    },
  },
];

initState({
  currentBoard: boards[0].config,
});

return (
  <div>
    <ul class="nav nav-tabs my-3" id="pills-tab" role="tablist">
      {boards.map((board) => {
        return (
          <li class="nav-item" role="presentation">
            <button
              class={`nav-link ${board.id == boards[0].id ? "active" : ""}`}
              data-bs-toggle="pill"
              data-bs-target={`#board${board.id}`}
              type="button"
              role="tab"
              aria-controls={`board${board.id}`}
              aria-selected={board.id == boards[0].id ? "true" : "false"}
            >
              {board.name}
            </button>
          </li>
        );
      })}
    </ul>
    <div class="tab-content" id="pills-tabContent">
      {boards.map((board) => {
        return (
          <div
            class={`tab-pane fade ${
              board.id == boards[0].id ? "show active" : ""
            }`}
            id={`board${board.id}`}
            role="tabpanel"
            aria-labelledby={`${board.id}-tab`}
            tabindex="0"
          >
            <Widget
              src={`${ownerId}/widget/KanbanBoard`}
              props={{
                requiredLabels: board.config.requiredLabels,
                excludedLabels: board.config.excludedLabels,
                columnLabels: board.config.columnLabels,
              }}
            />
          </div>
        );
      })}
    </div>
  </div>
);

const ownerId = "devgovgigs.near";

const selectedBoardId = props.selectedBoardId ?? "nearsocial";

console.log("selectedBoardId", selectedBoardId);
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
  {
    name: "Funding",
    id: "funding",
    config: {
      requiredLabels: ["wg-funding-requested"],
      columnLabels: [
        "wg-funding-requested",
        "funding-info-received",
        "funding-info-approved",
        "funding-transfer-received",
      ],
      excludedLabels: [],
    },
  },
];

return (
  <div>
    <ul class="nav nav-tabs my-3" id="pills-tab" role="tablist">
      {boards.map((board) => {
        return (
          <li class="nav-item" role="presentation">
            <button
              class={`nav-link ${board.id == selectedBoardId ? "active" : ""}`}
              data-bs-toggle="pill"
              data-bs-target={`#board${board.id}`}
              type="button"
              role="tab"
              aria-controls={`board${board.id}`}
              aria-selected={board.id == selectedBoardId ? "true" : "false"}
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
              board.id == selectedBoardId ? "show active" : ""
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
                boardId: board.id,
              }}
            />
          </div>
        );
      })}
    </div>
  </div>
);

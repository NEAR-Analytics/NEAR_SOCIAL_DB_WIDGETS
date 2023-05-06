const externalAppUrl = "https://gigs-board.vercel.app";

/**
 * Initial Path (optional but recommended)
 */
const path = props.path;
/**
 * Initial view height (optional but recommended)
 */
const initialViewHeight = 500;
const initialPayload = {
  lanes: [
    {
      currentPage: 1,
      id: "proposed",
      style: {
        width: 280,
      },
      title: "Proposed",
      cards: [
        {
          description: "Sort out recyclable and waste as needed",
          id: "Plan2",
          label: "10 mins",
          laneId: "PLANNED",
          title: "Dispose Garbage",
        },
        {
          description: "Can AI make memes?",
          id: "Plan3",
          label: "30 mins",
          laneId: "PLANNED",
          title: "Write Blog",
        },
        {
          description: "Transfer to bank account",
          id: "Plan4",
          label: "5 mins",
          laneId: "PLANNED",
          title: "Pay Rent",
        },
      ],
    },
    {
      currentPage: 1,
      id: "in-progress",
      label: "10/20",
      style: {
        width: 280,
      },
      title: "In Progress",
      disallowAddingCard: true,
      cards: [
        {
          description:
            "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
          id: "Wip1",
          label: "30 mins",
          laneId: "WIP",
          title: "Clean House",
        },
      ],
    },
    {
      currentPage: 1,
      id: "completed",
      style: {
        width: 280,
      },
      title: "Completed",
      disallowAddingCard: true,
      cards: [],
    },
  ],
};

const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "add-card":
      handleAddCard(request, response);
      break;
    case "delete-card":
      handleDeleteCard(request, response);
      break;
    case "get-cards":
      handleGetCards(request, response);
      break;
  }
};

const handleAddCard = (request, response) => {
  const { payload } = request;
  if (payload) {
    console.log(payload);
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

const handleDeleteCard = (request, response) => {
  const { payload } = request;
  if (payload) {
    console.log(payload);
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

const handleGetCards = (request, response) => {
  const { payload } = request;
  if (payload) {
    //      asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Everything": "simple",
    //     },
    //     body: JSON.stringify({
    //       query:
    //         "mutation createEvent($allDay: Boolean = false, $startStr: String, $endStr: String, $source: String, $title: String, $url: String) { events { create(allDay: $allDay, endStr: $endStr, source: $source, startStr: $startStr, title: $title, url: $url) { entities { id } } } }",
    //       variables: {
    //         source: context.accountId,
    //         ...request.payload,
    //       },
    //     }),
    //   }).then((resp) => {
    //     if (resp.body.errors) {
    //       response(request).send({ error: resp.body.errors[0].message });
    //     } else {
    //       response(request).send({ success: true });
    //     }
    //   });
    //     response(request).send({ cards: })
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

return (
  <Widget
    src={"wendersonpires.near/widget/NearSocialBridgeCore"}
    props={{
      externalAppUrl,
      path,
      initialViewHeight,
      initialPayload,
      requestHandler,
    }}
  />
);

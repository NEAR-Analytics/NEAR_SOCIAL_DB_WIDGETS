const eventsFilter = {
  status: "SUCCESS",
  account_id: "contract.main.burrow.near",
  event: {
    standard: "burrow",
  },
};

function startWebSocket(processEvents) {
  const scheduleReconnect = (timeOut) => {
    if (state.reconnectTimeout) {
      clearTimeout(state.reconnectTimeout);
      state.reconnectTimeout = null;
    }
    state.reconnectTimeout = setTimeout(() => {
      startWebSocket(processEvents);
    }, timeOut);
    State.update();
  };

  let ws = state.ws;

  if (ws) {
    ws.close();
    return;
  }

  ws = new WebSocket("wss://events.near.stream/ws");

  ws.onopen = () => {
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        secret: "near-social-events",
        filter: eventsFilter,
        fetch_past_events: 100,
      })
    );
  };
  ws.onclose = () => {
    State.update({ ws: null });
    console.log(`WS Connection has been closed`);
    scheduleReconnect(1);
  };
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    processEvents(data.events);
  };
  ws.onerror = (err) => {
    State.update({ ws: null });
    console.log("WebSocket error", err);
  };

  State.update({ ws });
}

function processEvent(event) {
  return {
    time: new Date(parseFloat(event.block_timestamp) / 1e6),
    accountId: event.event.data[0].account_id,
    event: event.event.event,
    data: event.event.data[0],
  };
}

function processEvents(events) {
  events = events.flatMap(processEvent);
  events.reverse();

  State.update((prevState) => {
    const prevActions = prevState.actions || [];
    const actions = [
      ...events.filter(
        (event) =>
          prevState.length === 0 ||
          event.time.getTime() > prevActions[0].time.getTime()
      ),
      ...prevActions,
    ];
    Object.assign(prevState, { actions: actions.slice(0, 500) });
  });
}

if (state.ws === undefined) {
  startWebSocket(processEvents);
}

return <div>Hello World</div>;

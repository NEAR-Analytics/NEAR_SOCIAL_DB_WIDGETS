let event_list = props.event_list || null;

// return data;
if (!event_list) {
  return '';
}

const BG_CARD = '#ffffff';

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

return (
  <div
    onClick={() => {
      showEventList();
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        showEventList();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <div>
      <div>{event_list.name}</div>
    </div>
  </div>
);

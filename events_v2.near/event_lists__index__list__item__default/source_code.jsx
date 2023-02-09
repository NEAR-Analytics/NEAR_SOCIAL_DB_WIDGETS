const event_list = props.event_list || null;
if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

const TextButton = props.__engine.Components.TextButton;

return (
  <>
    <TextButton
      onClick={() => {
        props.__engine.navigate(`/event_lists/${event_list.event_list_id}`);
      }}
      role="link"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props.__engine.navigate(`/event_lists/${event_list.event_list_id}`);
        }
      }}
      tabIndex={0}
    >
      {event_list.name}
    </TextButton>
  </>
);

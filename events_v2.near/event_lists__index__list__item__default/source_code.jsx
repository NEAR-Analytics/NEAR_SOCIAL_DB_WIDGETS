const event_list = props.event_list || null;
if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

const TextButton = props.__engine.Components.TextButton;

return (
  <>
    <TextButton
      onClick={() => {
        props.__engine.push('show', { event_list_id: event_list.id });
      }}
      role="link"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props.__engine.push('show', { event_list_id: event_list.id });
        }
      }}
      tabIndex={0}
    >
      {event_list.name}
    </TextButton>
    <br />
  </>
);

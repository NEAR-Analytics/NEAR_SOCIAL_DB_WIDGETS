const icons = ['house', 'award', 'bank', 'basket', 'bell', 'book', 'briefcase', 'calendar', 'camera', 'cart', 'chat', 'check', 'clock', 'cloud', 'code', 'compass', 'credit-card', 'cup', 'diamond', 'envelope', 'eye', 'flag', 'folder', 'gear', 'gift', 'globe', 'heart', 'image', 'inbox', 'key', 'layers', 'lightning', 'link', 'lock', 'map', 'megaphone', 'pencil', 'people', 'phone', 'pie-chart', 'pin', 'play', 'plus', 'power', 'printer', 'question', 'repeat', 'rocket', 'search', 'share', 'shield', 'star', 'tag', 'trash', 'trophy', 'upload', 'wallet', 'watch']

const selected = 'trophy';

State.init({ selected })

function onIconPick(event) {
  const selected = event.target.id
  State.update({ selected })
  props.onIconPick(selected)
}

return (
  <>
    <button class="btn btn-secondary dropdown-toggle"
      type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      <i class={`bi bi-${state.selected}`}></i>
    </button>
    <div class="dropdown-menu" >
      <div class="row">
        {icons.map(icon => (
          <div class="col-2" onClick={onIconPick}>
            <button class="dropdown-item" id={icon} type="button">
              <i class={`bi bi-${icon}`} id={icon}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
);
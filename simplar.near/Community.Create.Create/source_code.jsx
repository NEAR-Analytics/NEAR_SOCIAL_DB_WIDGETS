const profile = Social.get(`${context.accountId}/profile/**`)
const community = Social.get(`${context.accountId}/community/**`)

if (context.loading || !profile) return <div> Loading... </div>

const defaultMenu = [
  { label: "Home", icon: "house", component: "simplar.near/widget/HomePage" },
  { label: "Events", icon: "calendar-date", component: "simplar.near/widget/Events" },
]

State.init({
  profile: {
    name: profile.name || "", description: profile.description || "", tags: profile.tags || ["community"]
  },
  community: {
    widgets: JSON.parse(community.widgets) || [], menu: JSON.parse(community.menu) || defaultMenu, channels: community.channels || []
  },
  UI: {
    discussions: !!community.channels,
    channels: [],
    personalizedPage: { icon: "trophy", label: "", component: "" }
  }
})

const options = ["General", "News", "Q&A", "Help", "Off-Topic", "Meta"];

const onIconPick = (s) => State.update(state.UI.personalizedPage.icon = s)

function toggleDiscussions() {
  state.UI.discussions = !state.UI.discussions
  state.community.channels = state.UI.discussions ? state.UI.channels : []
  State.update()
}

function removePage(label) {
  state.community.menu = state.community.menu.filter(p => p.label !== label)
  State.update()
}

function onAddChannel(selected) {
  state.UI.channels = selected
  state.community.channels = selected
  State.update()
}

function menuElement(label, icon, component) {
  if (!component && !icon) return " "

  return <div class="input-group mt-2 mb-3" key={label}>
    <span class="input-group-text"><i class={`bi bi-${icon}`}></i></span>
    <span class="input-group-text"> {label} </span>
    <span class="input-group-text">{"->"}</span>
    <span class="input-group-text"> {component} </span>
    <span class="input-group-text pointer text-danger" onClick={() => removePage(label)}> x </span>
  </div>
}

function onWidgetChange(selected) {
  const selectedLabels = []
  for (const widget of selected) {
    if (typeof (widget) == "string") {
      selectedLabels.push(widget)
    } else {
      selectedLabels.push(widget.label)
    }
  }
  State.update(state.community.widgets = selectedLabels)
}

function addMenuLink() {
  state.community.menu.push(state.UI.personalizedPage)
  State.update()
}

function submit() {
  Social.set(
    {
      profile: state.profile,
      community: state.community
    }
  )
}

return (
  <>
    <h3 class="mb-3 text-center"> Create Your Community </h3>

    <h5 class="mb-3"> Basic Info </h5>
    <div class="input-group mb-3">
      <span class="input-group-text">Community's Name</span>
      <input type="text" class="form-control" placeholder="Barcelona Dance Lovers" value={state.profile.name} onChange={(e) => { State.update(state.profile.name = e.target.value) }} />
    </div>
    <div class="mb-3">
      <label class="form-label">Brief Description ({state.profile.description.length}/250)</label>
      <textarea class="form-control" rows={3}
        value={state.profile.description}
        maxLength={250}
        onChange={(e) => { State.update(state.profile.description = e.target.value) }}>
      </textarea>
    </div>

    <hr />

    <h5 class="my-3"> Menu </h5>

    {state.community.menu.map(({ label, icon, component }) => menuElement(label, icon, component))}
    <div class="input-group mt-2 mb-3">
      <Widget src="simplar.near/widget/Community.Create.IconPicker" props={{ onIconPick }} />
      <input type="text" onChange={e => { State.update(State.update(state.UI.personalizedPage.label = e.target.value)) }} />
      <span class="input-group-text">{"->"}</span>
      <input type="text" onChange={e => { State.update(state.UI.personalizedPage.component = e.target.value) }} />

      <button onClick={addMenuLink}> Add </button>
    </div>

    <div class="mt-2">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox"
          checked={state.UI.discussions} onClick={toggleDiscussions} /> Discussions
      </div>
      {state.UI.discussions &&
        <div class="mt-2 mb-3">
          <Typeahead
            multiple
            allowNew
            newSelectionPrefix="Add a new channel: "
            options={options}
            defaultSelected={JSON.parse(state.community.channels)}
            onChange={onAddChannel}
            placeholder='Discussion Channels'
          />
        </div>
      }
    </div>

    <hr />

    <h5 class="mt-3"> Community Widgets </h5>

    <div class="input-group mb-3">
      <Typeahead
        multiple
        allowNew
        options={["r"]}
        newSelectionPrefix="Widget: "
        defaultSelected={state.community.widgets}
        onChange={onWidgetChange}
        placeholder='Community Widgets'
      />
    </div>

    <hr />

    <button onClick={submit}> Create </button>
  </>
)
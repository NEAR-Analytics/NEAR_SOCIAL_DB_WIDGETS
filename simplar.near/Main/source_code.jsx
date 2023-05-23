if (context.loading) { return }

const widgetList = [
  "mob.near/widget/Explorer",
  "microchipgnu.near/widget/Game.FlappyBOS"
]

const homePage = "near/widget/NearOrg.HomePage"
const topics = ["overview", "updates", "reports"]

State.init({ src: homePage, props: {} });

function onSelect(src, prs) {
  State.update({ src, props: prs });
}

return (
  <div class="row">
    <div class="col-auto">
      <Widget src="simplar.near/widget/Menu"
        props={{
          identifier,
          homePage,
          topics,
          onSelect
        }}
      />
    </div>
    <div class="col-7 mx-auto">
      <Widget src={state.src} props={state.props} />
    </div>
    <div class="col-3">
      <Widget src="simplar.near/widget/CommunityWidgets" props={{ widgetList }} />
    </div>
  </div>
)
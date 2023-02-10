const limit = 5;

const widgetMetadata = Social.get(`*/widget/*/metadata/**`, "final");
const widgetBlockheightData = Social.keys("*/widget/*/metadata", "final", {
  return_type: "BlockHeight",
});
let apps = [];
const totalApps = Object.keys(widgetMetadata || {}).length;

if (widgetMetadata && widgetBlockheightData) {
  const widgets = [];

  Object.keys(widgetBlockheightData).forEach((accountId) => {
    return Object.keys(widgetBlockheightData[accountId].widget).forEach(
      (widgetName) => {
        widgets.push({
          accountId,
          widgetName,
          blockHeight: widgetBlockheightData[accountId].widget[widgetName],
        });
      }
    );
  });

  widgets.sort((a, b) => b.blockHeight - a.blockHeight);

  apps = widgets.slice(0, limit).map((widget) => {
    return {
      ...widget,
      metadata:
        widgetMetadata[widget.accountId].widget[widget.widgetName].metadata,
    };
  });
}

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
`;

const CardWrapper = styled.div`
  margin: 0 0 16px;
`;

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;
  margin-top: 24px;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

return (
  <>
    <H2>Latest Applications</H2>

    {apps.map((app, i) => (
      <CardWrapper key={i}>
        <Widget src="calebjacob.near/widget/AppCard" props={{ app }} />
      </CardWrapper>
    ))}

    <ButtonLink href="/#/mob.near/widget/Applications">
      View All <span>({totalApps})</span>
    </ButtonLink>
  </>
);

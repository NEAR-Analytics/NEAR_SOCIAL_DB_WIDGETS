const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const isOwnAccountId = props.isOwnAccountId;
const tabs = props.tabs;
const prevTab = props.prevTab;
const handlerStateUpdate = props.handlerStateUpdate;
const navegateTo = props.navegateTo;

const headerWidgetName = props.headerWidgetName ?? "minimalistQuestionHeader";
const contentWidgetName =
  props.contentWidgetName ?? "minimalistQuestionGeneralInfo";

const cardsData = props.cardsData;
const sectionTtext = props.sectionTtext ?? "All Schedules";

if (isOwnAccountId) {
  cardsData = cardsData.filter(
    (cardData) => cardData.accountId == context.accountId
  );
}

return (
  <div className="row card-group py-3">
    {sectionTtext && <h5>{sectionTtext}</h5>}
    {cardsData.map((cardData) => {
      return (
        <div className="col-sm-12 col-lg-6 col-2xl-4 gy-3">
          <div
            className="card h-100"
            onClick={
              navegateTo
                ? () =>
                    handlerStateUpdate({
                      tab: navegateTo,
                      postBlockHeight: cardData.blockHeight,
                    })
                : () => {}
            }
            style={navegateTo ? { cursor: "pointer" } : {}}
          >
            <Widget
              src={`${widgetOwner}/widget/${headerWidgetName}`}
              props={{ ...cardData }}
            />
            <Widget
              src={`${widgetOwner}/widget/${contentWidgetName}`}
              props={{ ...cardData }}
            />
          </div>

          {
            // Example how should card container be like
            //
            //     <div className="card-body">
            //       <div className="row d-flex justify-content-center">
            //         <h5 className="card-title text-center pb-2 border-bottom">
            //           {article.articleId}
            //         </h5>
            //         <div className="col flex-grow-1">
            //           <Widget
            //             src="mob.near/widget/Profile.ShortInlineBlock"
            //             props={{ accountId: article.author, tooltip: true }}
            //           />
            //         </div>
            //         <div className="col flex-grow-0">
            //           <p className="card-subtitle text-muted text-end">
            //             {getDateLastEdit(article.timeCreate).date}
            //           </p>
            //           <p className="card-subtitle text-muted text-end">
            //             {getDateLastEdit(article.timeCreate).time}
            //           </p>
            //         </div>
            //       </div>
            //       <div
            //         className="mt-3 alert alert-secondary"
            //         style={{ backgroundColor: "white" }}
            //       >
            //         <div>
            //           Last edit by
            //           <a
            //             href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
            //             style={{ textDecoration: "underline" }}
            //           >
            //             {article.lastEditor}
            //           </a>
            //           <br />
            //           Edited on {getDateLastEdit(article.timeLastEdit).date}
            //           <br />
            //           Edit versions: {article.version}
            //         </div>
            //       </div>
            //     </div>
          }
        </div>
      );
    })}
  </div>
);

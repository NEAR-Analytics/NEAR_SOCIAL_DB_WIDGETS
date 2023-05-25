/*----------------------------------------------Start get props----------------------------------------------*/
const dataCallInfo = props.dataCallInfo ?? ["poll_question", "question-v3.1.1"];

const data = Social.index(dataCallInfo[0], dataCallInfo[1]);
if (!data) {
  return "Loading datas";
}

const abortModalWidgetName =
  props.abortModalWidgetName ??
  "general_neardigitalcollective_standard-abort-popup";

const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const tabs = props.tabs ?? {
  MY_POLL: {
    id: 1,
    text: "My Polls",
    isTab: true,
    widgetName: "general_neardigitalcollective_cards-container",
    props: { isOwnAccountId: true, isTab: true },
  },
  ALL_POLLS: {
    id: 2,
    text: "All Polls",
    isTab: true,
    widgetName: "general_neardigitalcollective_cards-container",
    props: {
      isOwnAccountId: false,
      isTab: true,
    },
  },
  NEW_POLL: {
    id: 3,
    text: finalData ? "Edit Poll" : "Create Poll",
    isButtonInNavegation: true,
    widgetName: "newPollQuestionInterface",
    props: { isButtonInNavegation: true },
  },
  OPEN_POLL: {
    id: 4,
    text: "",
    isCardNavigate: true,
    widgetName: "newVotingInterface",
    props: { isCardNavigate: true },
  },
};

const cardHeaderWidgetName =
  props.cardHeaderWidgetName ?? "minimalistQuestionHeader";
const cardContentWidgetName =
  props.cardContentWidgetName ?? "minimalistQuestionGeneralInfo";

const homePageId = props.homePageId ?? 1;

const abortPopupTexts = props.abortPopupTexts ?? {
  abortInfoText: "If you leave now, you will lose all your changes",
  confirmAbortText: "Discard changes",
  cancelAbortText: "Continue editing",
};

const bootstrapIcons = props.bootstrapIcons ?? {
  closeIcon: "bi bi-x-lg",
  logoIcon: "bi bi-calendar-week-fill",
  addIcon: "bi bi-plus-lg",
};

const logoIconText = props.logoIconText ?? "WeeklySchedule";
/*-----------------------------------------------End get props-----------------------------------------------*/

/*----------------------------------------------Start styles----------------------------------------------*/
const colors = props.siteColors ?? {
  color1: "#010A2D",
  color2: "white",
  color3: "rgb(1, 10, 45)",
  green1: "rgb(217, 252, 239)",
  green2: "rgb(0, 179, 125)",
  green3: "#7e7e7e70",
  red1: "rgb(255, 229, 229)",
  red2: "rgb(255, 71, 71)",
  red3: "#FF4747",
  red4: "#FFE5E5",
  grey1: "#353A40",
  grey2: "#767B8E",
  grey3: "#4B516A",
  grey4: "#B0B3BE",
  grey5: "rgb(230, 230, 230)",
  grey6: "#474D55",
  grey7: "rgb(53, 58, 64)",
  grey8: "rgb(225, 233, 240)",
  grey9: "rgb(71, 77, 85)",
  grey10: "rgb(118, 123, 142)",
  lightBlue: "#AAC8F7",
  lightBlue2: "#E1E9F0",
};

const standardButtonStyles = props.standardButtonStyles ?? {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: "1rem",
  margin: "0",
  padding: "0.3rem 1.5rem",
  backgroundColor: colors.color1,
  borderRadius: "12px",
  color: colors.color2,
};

const standardButtonHoveringStyles = props.standardButtonHoveringStyles ?? {
  border: "2px solid black",
  color: "black",
  backgroundColor: colors.color2,
  fontWeight: "500",
  fontSize: "1rem",
  margin: "0",
  padding: "0.3rem 1.5rem",
  borderRadius: "12px",
};

const thisWidgetInlineStyles = {
  generalContainer: {
    backgroundColor: colors.grey5,
    fontFamily: "Onest",
    fontStyle: "normal",
    borderRadius: "20px",
  },
  siteHeader: {
    backgroundColor: colors.color2,
    boxShadow: "rgba(43, 68, 106, 0.04) 0px 4px 28px",
    paddingBottom: "1.5rem",
  },
  logoTitle: {
    cursor: "pointer",
    margin: "0px 0.5rem",
    fontWeight: "700",
    fontSize: "1.3rem",
    letterSpacing: "0.1px",
  },
  openScheduleGeneralContainer: { margin: "0px 4rem" },
  openScheduleContainer: { marginTop: "0.6rem" },
  tabContainer: {
    marginRight: "1.5rem",
    position: "relative",
    cursor: "pointer",
    userSelect: "none",
  },
  tabText: {
    fontWeight: "500",
    fontSize: "1rem",
    margin: "0",
  },
  decorativeTabUnderline: {
    height: "0.2rem",
    width: "50%",
    position: "absolute",
    bottom: "-55%",
    left: "25%",
    backgroundColor: colors.color1,
    borderRadius: "8px",
  },
  newScheduleButton: standardButtonStyles,
  newScheduleButtonHovering: standardButtonHoveringStyles,
  addIcon: { color: colors.color2 },
  addIconHovered: { color: "black" },
  showUserInfoInHeaderText: { margin: "0px", fontSize: "0.8rem" },
};

/*-----------------------------------------------End styles-----------------------------------------------*/

/*----------------------------------------------Start functions----------------------------------------------*/

State.init({
  tab: homePageId,
  prevTab: homePageId,
  hoveringElement: "",
  showAbort: false,
  abortThroughPage: homePageId,
});

let sortedData =
  data && data.length
    ? data.sort((d1, d2) => d2.blockHeight - d1.blockHeight)
    : [];

const profile = Social.getr(`${context.accountId}/profile`);
if (!profile) {
  return "Loading profile";
}

let accountIds = ["All"];
let finalData = undefined;
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    if (sortedData[i].accountId == context.accountId) {
      finalData = sortedData[i];
    }
  }
}

function handlerStateUpdate(obj) {
  State.update(obj);
}

let prevTab = state.prevTab;

function isCardNavigate() {
  let isCardNavigate;
  Object.keys(tabs).forEach((tabKey) => {
    const tab = tabs[tabKey];

    if (state.tab == tab.id) {
      isCardNavigate = tab.isCardNavigate;
    }
  });

  return isCardNavigate;
}

function isOnNavTab() {
  let isOnNavTab = false;
  Object.keys(tabs).forEach((tabKey) => {
    if (!isOnNavTab) {
      const tab = tabs[tabKey];
      if (tab.isTab && state.tab == tab.id) {
        isOnNavTab = true;
      }
    }
  });

  return isOnNavTab;
}

/*-----------------------------------------------End functions-----------------------------------------------*/

/*----------------------------------------------Start render components----------------------------------------------*/
console.log("state.showAbort: ", state.showAbort);
console.log("state.tab: ", state.tab);
const renderAbortModal = () => {
  return (
    <Widget
      src={`${widgetOwner}/widget/${abortModalWidgetName}`}
      props={{
        showAbort: state.showAbort,
        handlerStateUpdate,
        abortThroughPage: state.abortThroughPage,
        abortInfoText: abortPopupTexts.abortInfoText,
        confirmAbortText: abortPopupTexts.confirmAbortText,
        cancelAbortText: abortPopupTexts.cancelAbortText,
        closeIcon: bootstrapIcons.closeIcon,
        colors,
      }}
    />
  );
};

const renderNavigationButton = (tab, isMobile) => {
  return (
    <button
      className={isMobile ? "d-md-none d-block mb-3" : ""}
      onMouseEnter={() => {
        State.update({ hoveringElement: tab.text });
      }}
      onMouseLeave={() => {
        State.update({ hoveringElement: "" });
      }}
      onClick={() => {
        State.update({ tab: tab.id, abortThroughPage: tab.id });
      }}
      style={
        state.hoveringElement == tab.text || state.tab == tab.id
          ? thisWidgetInlineStyles.newScheduleButtonHovering
          : thisWidgetInlineStyles.newScheduleButton
      }
    >
      <i
        className={bootstrapIcons.addIcon}
        style={
          state.hoveringElement == tab.text || state.tab == tab.id
            ? thisWidgetInlineStyles.addIconIconHovered
            : thisWidgetInlineStyles.addIcon
        }
      ></i>
      {tab.text}
    </button>
  );
};

const renderTabContent = (tab) => {
  return (
    <>
      <Widget
        src={`${widgetOwner}/widget/${tab.widgetName}`}
        props={{
          ...tab.props,
          widgetOwner,
          tabs,
          prevTab,
          handlerStateUpdate,
          cardsData: data,
          headerWidgetName,
          contentWidgetName,
          sectionTtext: tab.text,
          widgetOwner,
        }}
      />
    </>
  );
};

const renderTab = (tab) => {
  return (
    <div style={thisWidgetInlineStyles.tabContainer}>
      <p
        ariaCurrent="page"
        onMouseEnter={() => {
          State.update({ hoveringElement: tab.text });
        }}
        onMouseLeave={() => {
          State.update({ hoveringElement: "" });
        }}
        onClick={() => {
          isOnNavTab()
            ? State.update({ tab: tab.id, abortThroughPage: tab.id })
            : State.update({
                showAbort: true,
              });
        }}
        style={thisWidgetInlineStyles.tabText}
      >
        {tab.text}
      </p>
      {(state.hoveringElement == tab.text || state.tab == tab.id) && (
        <div style={thisWidgetInlineStyles.decorativeTabUnderline}>
          {/*Decorative Div, do not delete*/}
        </div>
      )}
    </div>
  );
};
/*-----------------------------------------------End render components-----------------------------------------------*/
return (
  <div className="pb-5" style={thisWidgetInlineStyles.generalContainer}>
    <div className="d-flex flex-column">
      <div
        className="d-flex w-100 align-content-center"
        style={thisWidgetInlineStyles.siteHeader}
      >
        <div
          className="d-flex align-items-center"
          onClick={() => State.update({ tab: homePageId })}
        >
          <i
            className={bootstrapIcons.logoIcon}
            style={{
              cursor: "pointer",
            }}
          ></i>
          {logoIconText && (
            <h3 style={thisWidgetInlineStyles.logoTitle}>{logoIconText}</h3>
          )}
        </div>

        {!isCardNavigate() && (
          <div
            className="w-100 d-none d-md-flex justify-content-between"
            style={thisWidgetInlineStyles.openScheduleGeneralContainer}
          >
            <div style={thisWidgetInlineStyles.openScheduleContainer}>
              <div className="d-flex">
                {Object.keys(tabs).map((tabKey) => {
                  const tab = tabs[tabKey];
                  if (tab.isTab) {
                    return renderTab(tab);
                  }
                })}
              </div>
            </div>

            {Object.keys(tabs).map((tabKey) => {
              const tab = tabs[tabKey];
              if (tab.isButtonInNavegation) {
                return renderNavigationButton(tab, false);
              }
            })}
            <div
              style={thisWidgetInlineStyles.newShceduleButtonInMobileContainer}
            >
              {Object.keys(tabs).map((tabKey) => {
                const tab = tabs[tabKey];
                if (tab.isButtonInNavegation) {
                  return renderNavigationButton(tab, true);
                }
              })}
            </div>
          </div>
        )}
      </div>

      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        {/*Decorative div. Do not delete*/}
      </div>
    </div>

    <div className="align-items-center">
      {Object.keys(tabs).map((tabKey) => {
        let tab = tabs[tabKey];
        if (
          (tab.isTab || tab.isButtonInNavegation || tab.isCardNavigate) &&
          state.tab == tab.id
        ) {
          return renderTabContent(tab);
        }
      })}
    </div>
    {state.showAbort && renderAbortModal()}
  </div>
);

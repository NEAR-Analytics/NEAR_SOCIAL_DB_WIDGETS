const data = Social.index("Instance_time", "schedule");
if (!data) {
  return "Loading datas";
}

const profile = Social.getr(`${context.accountId}/profile`);
if (!profile) {
  return "Loading profile";
}

const thisWidgetInlineStyles = props.allWidgetsInlineStyles.instance_time;
const thisWidgetClassNames = props.allWidgetsClassNames.instance_time;

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

var sortedData =
  data && data.length
    ? data.sort((d1, d2) => d2.blockHeight - d1.blockHeight)
    : [];

var accountIds = ["All"];
var finalData = undefined;
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    if (sortedData[i].accountId == context.accountId) {
      finalData = sortedData[i];
    }
  }
}

const tabs = {
  MY_SCHEDULE: { id: 1, text: "My Schedule" },
  ALL_SCHEDULE: { id: 2, text: "All Schedules" },
  NEW_SCHEDULE: {
    id: 3,
    text: finalData ? "Edit Schedule" : "Create Schedule",
  },
  OPEN_SCHEDULE: {
    id: 4,
    text: "",
  },
};

State.init({
  tab: tabs.ALL_SCHEDULE.id,
  prevTab: tabs.ALL_SCHEDULE.id,
  hoveringElement: "",
  showAbortScheduleCreation: false,
  abortThroughAllExistingSchedule: false,
  userScheduleShown: "",
});

let prevTab = state.prevTab;

function makeStringShorter(string, length) {
  if (string.length > length) {
    return string.slice(0, length) + "...";
  }
  return string;
}

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" &&
      State.update({ showAbortScheduleCreation: false });
  };
}

const renderAbortPollCreationModal = () => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        state.showAbortScheduleCreation &&
        thisWidgetInlineStyles.renderAbortPollCreationModal.generalContainer
      }
      tabindex="-1"
      role="dialog"
      onClick={closeModalClickingOnTransparent()}
    >
      <div
        className={
          thisWidgetClassNames.renderAbortPollCreationModal.modalDialogContainer
        }
        style={
          thisWidgetInlineStyles.renderAbortPollCreationModal
            .modalDialogContainer
        }
        role="document"
      >
        <div
          className={
            thisWidgetClassNames.renderAbortPollCreationModal
              .modalContentContainer
          }
          style={
            thisWidgetInlineStyles.renderAbortPollCreationModal
              .modalContentContainer
          }
        >
          <div
            className={
              thisWidgetClassNames.renderAbortPollCreationModal.modalHeader
            }
            style={
              thisWidgetInlineStyles.renderAbortPollCreationModal.modalHeader
            }
          >
            <button
              type="button"
              className={
                thisWidgetClassNames.renderAbortPollCreationModal.closeButton
              }
              style={
                thisWidgetInlineStyles.renderAbortPollCreationModal.closeButton
              }
              dataDismiss="modal"
              ariaLabel="Close"
              onClick={() => State.update({ showAbortScheduleCreation: false })}
            >
              <i
                className={
                  thisWidgetClassNames.renderAbortPollCreationModal.closeIcon
                }
              ></i>
            </button>
          </div>
          <div
            className={
              thisWidgetClassNames.renderAbortPollCreationModal.modalBody
            }
            style={
              thisWidgetInlineStyles.renderAbortPollCreationModal.modalBody
            }
          >
            <h3
              style={
                thisWidgetInlineStyles.renderAbortPollCreationModal
                  .discardChangesTitle
              }
            >
              Discard changes
            </h3>
            <p
              style={
                thisWidgetInlineStyles.renderAbortPollCreationModal
                  .discardChangesText
              }
            >
              If you leave now, you will lose all your changes
            </p>
          </div>
          <div
            className={
              thisWidgetClassNames.renderAbortPollCreationModal.modalFooter
            }
            style={
              thisWidgetInlineStyles.renderAbortPollCreationModal.modalFooter
            }
          >
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={
                thisWidgetInlineStyles.renderAbortPollCreationModal
                  .continueEditingButton
              }
              onClick={() => State.update({ showAbortScheduleCreation: false })}
            >
              Continue editing
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={
                thisWidgetInlineStyles.renderAbortPollCreationModal
                  .discardChangesButton
              }
              onClick={() => {
                if (state.abortThroughAllExistingSchedule) {
                  State.update({
                    tab: tabs.ALL_SCHEDULE.id,
                    abortThroughAllExistingSchedule: false,
                    hoveringElement: "",
                    showAbortScheduleCreation: false,
                  });
                } else {
                  State.update({
                    tab: tabs.ALL_SCHEDULE.id,
                    hoveringElement: "",
                    showAbortScheduleCreation: false,
                  });
                }
              }}
            >
              Discard changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const updateInstanceTimeState = (object) => {
  State.update(object);
};

return (
  <div className="pb-5" style={thisWidgetInlineStyles.generalContainer}>
    <div className={thisWidgetClassNames.siteHeaderContainer}>
      <div
        className={thisWidgetClassNames.siteHeader}
        style={thisWidgetInlineStyles.siteHeader}
      >
        <div className={thisWidgetClassNames.instanceTimeLogoContainer}>
          <i className={thisWidgetClassNames.logoIcon}></i>
          <h3 style={thisWidgetInlineStyles.logoTitle}>WeeklySchedule</h3>
        </div>
        {state.tab != tabs.OPEN_SCHEDULE.id && (
          <div
            className={thisWidgetClassNames.openScheduleGeneralContainer}
            style={thisWidgetInlineStyles.openScheduleGeneralContainer}
          >
            <div style={thisWidgetInlineStyles.openScheduleContainer}>
              <div className={thisWidgetClassNames.tabsContainer}>
                {Object.keys(tabs).map((tabKey) => {
                  const tab = tabs[tabKey];
                  if (tabKey == "ALL_SCHEDULE" || tabKey == "MY_SCHEDULE") {
                    return (
                      <div style={thisWidgetInlineStyles.tabContainer}>
                        <p
                          ariaCurrent="page"
                          onMouseEnter={() => {
                            State.update({ hoveringElement: tab.id });
                          }}
                          onMouseLeave={() => {
                            State.update({ hoveringElement: "" });
                          }}
                          onClick={() => {
                            state.tab == tabs.ALL_SCHEDULE.id ||
                            state.tab == tabs.MY_SCHEDULE.id
                              ? State.update({ tab: tab.id })
                              : tab.id == tabs.ALL_SCHEDULE.id
                              ? State.update({
                                  showAbortScheduleCreation: true,
                                  abortThroughAllExistingSchedule: true,
                                })
                              : State.update({
                                  showAbortScheduleCreation: true,
                                });
                          }}
                          style={thisWidgetInlineStyles.tabText}
                        >
                          {tab.text}
                        </p>
                        {(state.hoveringElement == tab.id ||
                          state.tab == tab.id) && (
                          <div
                            style={
                              thisWidgetInlineStyles.decorativeTabUnderline
                            }
                          >
                            {/*Decorative Div, do not delete*/}
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <button
              onMouseEnter={() => {
                State.update({ hoveringElement: tabs.NEW_SCHEDULE.id });
              }}
              onMouseLeave={() => {
                State.update({ hoveringElement: "" });
              }}
              onClick={() => {
                State.update({ tab: tabs.NEW_SCHEDULE.id });
              }}
              style={
                state.hoveringElement == tabs.NEW_SCHEDULE.id ||
                state.tab == tabs.NEW_SCHEDULE.id
                  ? thisWidgetInlineStyles.newScheduleButtonHovering
                  : thisWidgetInlineStyles.newScheduleButton
              }
            >
              <i
                className={thisWidgetClassNames.newScheduleButtonInnerIcon}
                style={
                  state.hoveringElement == tabs.NEW_SCHEDULE.id ||
                  state.tab == tabs.NEW_SCHEDULE.id
                    ? thisWidgetInlineStyles.newScheduleButtonInnerIconHovered
                    : thisWidgetInlineStyles.newScheduleButtonInnerIcon
                }
              ></i>
              {tabs.NEW_SCHEDULE.text}
            </button>
          </div>
        )}
        <div className={thisWidgetClassNames.showUserInfoInHeader}>
          <p
            className="m-0"
            style={thisWidgetInlineStyles.userInfoInHeaderText}
          >
            {makeStringShorter(profile.name, 12)}
          </p>
          <p
            className="m-0"
            style={thisWidgetInlineStyles.userInfoInHeaderText}
          >
            @{makeStringShorter(context.accountId, 12)}
          </p>
        </div>
      </div>
      <div className={thisWidgetClassNames.decorativeDivInHeader}></div>

      <div styles={thisWidgetInlineStyles.newShceduleButtonInMobileContainer}>
        <button
          className={thisWidgetClassNames.newShceduleButtonInMobile}
          onMouseEnter={() => {
            State.update({ hoveringElement: tabs.NEW_SCHEDULE.id });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          onClick={() => {
            State.update({ tab: tabs.NEW_SCHEDULE.id });
          }}
          style={
            state.hoveringElement == tabs.NEW_SCHEDULE.id ||
            state.tab == tabs.NEW_SCHEDULE.id
              ? thisWidgetInlineStyles.newScheduleButtonHovering
              : thisWidgetInlineStyles.newScheduleButton
          }
        >
          <i
            className={thisWidgetClassNames.newScheduleButtonInnerIcon}
            style={
              state.hoveringElement == tabs.NEW_SCHEDULE.id ||
              state.tab == tabs.NEW_SCHEDULE.id
                ? thisWidgetInlineStyles.newScheduleButtonInnerIconHovered
                : thisWidgetInlineStyles.newScheduleButtonInnerIcon
            }
          ></i>
          {tabs.NEW_SCHEDULE.text}
        </button>
      </div>
    </div>

    <div className={thisWidgetClassNames.bodyContainer}>
      {state.tab == tabs.OPEN_SCHEDULE.id ? (
        <Widget
          src={`${widgetOwner}/widget/Instance_time_card`}
          props={{
            allWidgetsClassNames: props.allWidgetsClassNames,
            allWidgetsInlineStyles: props.allWidgetsInlineStyles,
            accountId: state.userScheduleShown,
            tabs,
            prevTab,
            updateInstanceTimeState,
            data,
          }}
        />
      ) : state.tab != tabs.NEW_SCHEDULE.id ? (
        <Widget
          src={`${widgetOwner}/widget/Instance_time_review`}
          props={{
            allWidgetsClassNames: props.allWidgetsClassNames,
            allWidgetsInlineStyles: props.allWidgetsInlineStyles,
            accountId:
              state.tab == tabs.ALL_SCHEDULE.id ? "All" : context.accountId,
            text:
              state.tab == tabs.ALL_SCHEDULE.id
                ? tabs.ALL_SCHEDULE.text
                : tabs.MY_SCHEDULE.text,
            className: "d-inline-block",
            style: { width: "100%", height: "1.5em" },
            updateInstanceTimeState,
            tabs,
            data,
          }}
        />
      ) : (
        <Widget
          src={`${widgetOwner}/widget/Instance_time_edit`}
          props={{
            updateInstanceTimeState,
            tabs,
            data,
            prevTab,
            allWidgetsClassNames: props.allWidgetsClassNames,
            allWidgetsInlineStyles: props.allWidgetsInlineStyles,
          }}
        />
      )}
    </div>
    {state.showAbortScheduleCreation && renderAbortPollCreationModal()}
  </div>
);

//==================================================================== Start icons=======================================================================================================

const closeIcon = "bi bi-x-lg";

//===================================================================== End icons========================================================================================================

//==================================================================== Start standard styles ============================================================================================

const standardButtonStyles = {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: "1rem",
  margin: "0",
  padding: "0.3rem 1.5rem",
  backgroundColor: "#010A2D",
  borderRadius: "12px",
  color: "white",
};

const standardButtonHoveringStyles = {
  border: "2px solid black",
  color: "black",
  backgroundColor: "white",
  fontWeight: "500",
  fontSize: "1rem",
  margin: "0",
  padding: "0.3rem 1.5rem",
  borderRadius: "12px",
};

const scheduleStatusOn = {
  height: "2.1rem",
  width: "3rem",
  marginRight: "1rem",
  letterSpacing: "-0.025rem",
  backgroundColor: "rgb(217, 252, 239)",
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: "rgb(0, 179, 125)",
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const scheduleStatusOff = {
  height: "2.1rem",
  width: "3rem",
  marginRight: "1rem",
  letterSpacing: "-0.025rem",
  backgroundColor: "rgb(255, 229, 229)",
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: "rgb(255, 71, 71)",
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const instanceTimeReviewCardStatusIndicationOn = {
  backgroundColor: "rgb(217, 252, 239)",
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: "rgb(0, 179, 125)",
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const instanceTimeReviewCardStatusIndicationOff = {
  backgroundColor: "rgb(255, 229, 229)",
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: "rgb(255, 71, 71)",
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const tabSelected = {
  color: "#353A40",
  fontSize: "0.8rem",
  userSelect: "none",
  cursor: "pointer",
  marginRight: "1rem",
};

const tabNotSelected = {
  color: "#767B8E",
  fontSize: "0.8rem",
  userSelect: "none",
  cursor: "pointer",
  marginRight: "1rem",
};

//===================================================================== End standard styles =============================================================================================

//==================================================================== Start inline styles ==============================================================================================

const allWidgetsInlineStyles = {
  instance_time: {
    renderAbortPollCreationModal: {
      generalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7e7e7e70",
        backdropFilter: "blur(4px)",
      },
      modalDialogContainer: { width: "540px", borderRadius: "28px" },
      modalContentContainer: { border: "none", borderRadius: "28px" },
      modalHeader: { padding: "0", margin: "0", border: "none" },
      closeButton: {
        border: "none",
        backgroundColor: "transparent",
        margin: "0.5rem 0.5rem 0px 0px",
        borderRadius: "28px",
        marginRight: "0.3rem",
        padding: "0.3rem 0.7rem 0 0",
      },
      modalBody: {
        width: "90%",
        borderRadius: "1rem",
        margin: "0 auto",
        padding: "0",
      },
      discardChangesTitle: {
        fontWeight: "700",
        fontSize: "1.5rem",
        letterSpacing: "0.1px",
        textAlign: "center",
      },
      discardChangesText: {
        letterSpacing: "-0.01",
        color: "#4B516A",
        fontSize: "1rem",
        textAlign: "center",
      },
      modalFooter: { border: "none", justifyContent: "space-around" },
      continueEditingButton: {
        padding: "0.7rem",
        borderRadius: "16px",
        width: "45%",
        backgroundColor: "white",
        border: "1.5px solid #B0B3BE",
        color: "#010A2D",
        fontWeight: "700",
        letterSpacing: "0.01em",
      },
      discardChangesButton: {
        padding: "0.7rem",
        borderRadius: "16px",
        width: "45%",
        backgroundColor: "#FF4747",
        border: "1.5px solid transparent",
        color: "white",
        fontWeight: "700",
        letterSpacing: "0.01em",
      },
    },
    generalContainer: {
      backgroundColor: "rgb(230, 230, 230)",
      fontFamily: "Onest",
      fontStyle: "normal",
      borderRadius: "20px",
    },
    siteHeader: {
      backgroundColor: "white",
      boxShadow: "rgba(43, 68, 106, 0.04) 0px 4px 28px",
    },
    logoTitle: {
      margin: "0px 0.5rem",
      color: "rgb(1, 10, 45)",
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
      backgroundColor: "#010A2D",
      borderRadius: "8px",
    },
    newScheduleButton: standardButtonStyles,
    newScheduleButtonHovering: standardButtonHoveringStyles,
    newScheduleButtonInnerIcon: { color: "white" },
    newScheduleButtonInnerIconHovered: { color: "black" },
    showUserInfoInHeaderText: { margin: "0px", fontSize: "0.8rem" },
  },
  instance_time_card: {
    widgetGeneralContainer: {
      maxWidth: "80%",
    },
    generalContainer: {
      width: "100%",
      margin: "2rem",
      padding: "0 2rem 1rem 2rem",
      borderRadius: "18px",
      background: "white",
      boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
    },
    widgetTitle: {
      padding: "2rem",
      margin: "2rem 0 0.5rem 0",
      fontWeight: "700",
    },
    closeIcon: {
      right: "2rem",
      top: "2rem",
      cursor: "pointer",
    },
    scheduleOfText: { margin: "0", fontWeight: "300" },
    showAccountId: { fontWeight: "500" },
    scheduleStatusOn: scheduleStatusOn,
    scheduleStatusOff: scheduleStatusOff,
    editScheduleButtonHovering: standardButtonHoveringStyles,
    editScheduleButton: standardButtonStyles,
    instanceTimeTextDecorativeDiv: {
      height: "inherit",
      backgroundColor: "#AAC8F7",
      width: "0.5rem",
      minWidth: "5px",
      marginRight: "0.5rem",
      borderRadius: "8px",
    },
    instanceTimeText: {
      fontWeight: "700",
      fontSize: "1.5rem",
      letterSpacing: "0.1px",
      color: "#010A2D",
      wordWrap: "anywhere",
    },
    otherWidgetsContainer: {
      position: "relative",
      width: "max-content",
      display: "flex",
      padding: `0.5rem 0.8rem`,
      width: "100%",
      justifyContent: "space-between",
    },
    instanceTimeShareGeneralContainer: { display: "flex" },
    instanceTimeShareContainer: {
      display: "flex",
      alignItems: "center",
      paddingRight: "1rem",
    },
    showCurrentTimeContainer: {
      paddingRight: "2rem",
      display: "flex",
      alignItems: "center",
      margin: "-1.2rem",
    },
  },
  instance_time_review: {
    generalContainer: {
      borderRadius: "3px",
      backgroundColor: "rgb(230, 230, 230)",
      width: "100%",
      padding: "0.5rem",
    },
    titleInHeader: { margin: "2rem 0 0.5rem 0", fontWeight: "700" },
    textInHeader: { margin: "0px", fontSize: "0.8rem" },
    cardsContainer: {
      gap: "8%",
    },
    cardGeneralContainer: {
      boxSizing: "border-box",
      boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
      backgroundColor: "white",
      color: "black",
      borderRadius: "1rem",
      margin: "1rem",
      cursor: "pointer",
      textDecoration: "none",
      maxWidth: "90%",
    },
    cardGeneralContainerDisabled: {
      boxSizing: "border-box",
      boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
      backgroundColor: "white",
      color: "black",
      borderRadius: "1rem",
      margin: "1rem",
      cursor: "pointer",
      textDecoration: "none",
      maxWidth: "90%",
      disabled: true,
    },
    cardContainer: {
      padding: "1rem",
    },
    cardHeaderGeneralContainer: {
      paddingBottom: "0.5rem",
      borderBottom: "2px solid grey",
      display: "flex",
      flexDirection: "row",
    },
    cardHeaderUserInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardBodyContainer: {
      paddingLeft: "0.5rem",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    cardBodyUserInfo: {
      fontSize: "1.5rem",
      fontWeight: "800",
    },
    cardBodyContentContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentSeparation: {
      margin: "0.5rem 0rem",
    },
    statusIndicationOn: instanceTimeReviewCardStatusIndicationOn,
    statusIndicationOff: instanceTimeReviewCardStatusIndicationOff,
    valuesContainer: {
      paddingTop: "1rem",
      display: "flex",
      justifyContent: "space-between",
    },
    daysContainer: {
      fontSize: "1rem",
      fontWeight: "600",
    },
    timeContainer: {
      display: "flex",
      fontSize: "0.9rem",
      paddingRight: "0.9rem",
    },
    offIndication: {
      backgroundColor: "#FFE5E5",
      textAlign: "center",
      borderRadius: "16px",
      marginRight: "1rem",
      fontSize: "0.8rem",
      letterSpacing: "-0.025rem",
      color: "#FF4747",
      fontWeight: "500",
      padding: "0.5rem 2rem",
    },
  },
  instance_time_edit: {
    generalContainer: {
      backgroundColor: "white",
      borderRadius: "28px",
      margin: "2rem auto 1rem auto",
      width: "60%",
    },
    widgetHeaderTitle: {
      padding: "2rem",
      margin: "2rem 0 0.5rem 0",
      fontWeight: "700",
    },
    closeWidgetIcon: {
      right: "2rem",
      top: "2rem",
      cursor: "pointer",
    },
    tabsContainer: { margin: "0 auto" },
    timeZoneActivated: tabSelected,
    timeZoneNotActivated: tabNotSelected,
    makeScheduleSelected: tabSelected,
    makeScheduleNotSelected: tabNotSelected,
    timeZoneLabel: {
      fontSize: "0.8rem",
      letterSpacing: "-0.01em",
      color: "#474D55",
      marginBottom: "0.3rem",
    },
    timeZoneSelector: {
      backgroundColor: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "0.8rem",
      border: "1.5px solid #E1E9F0",
      color: "#474D55",
      letterSpacing: "-0.01em",
      width: "50%",
      display: "block",
    },
    buttonHovered: standardButtonHoveringStyles,
    button: standardButtonStyles,
  },
};

//===================================================================== End inline styles ===============================================================================================

//===================================================================== Start class names ===============================================================================================

const allWidgetsClassNames = {
  instance_time: {
    renderAbortPollCreationModal: {
      modalDialogContainer: "modal-dialog",
      modalContentContainer: "modal-content",
      modalHeader: "modal-header flex-row-reverse",
      closeButton: "close",
      closeIcon: closeIcon,
      modalBody: "modal-body",
      modalFooter: "modal-footer",
    },
    siteHeaderContainer: "d-flex flex-column",
    siteHeader: "d-flex justify-content-between align-items-center px-4 py-3",
    instanceTimeLogoContainer: "d-flex align-items-center",
    logoIcon: "bi bi-calendar-week-fill",
    openScheduleGeneralContainer: "w-100 d-flex justify-content-between",
    tabsContainer: "d-flex",
    newScheduleButtonInnerIcon: "bi bi-plus-lg",
    showUserInfoInHeader: "d-flex flex-column",
    decorativeDivInHeader:
      "w-100 d-flex flex-row justify-content-between align-items-center",
    bodyContainer: "align-items-center",
  },
  instance_time_card: {
    widgetGeneralContainer:
      "d-flex content-align-start justify-content-between",
    widgetHeaderContainer:
      "w-100 d-flex flex-row justify-content-between align-items-center",
    closeIcon: closeIcon,
    widgetBodyContainer: "d-flex justify-content-between",
    userInfoContainer: "d-flex justify-content-between",
    sheculeStatusContainer: "d-flex",
    instanceTimeTextContainer: "d-flex my-3",
  },
  instance_time_review: {
    generalContainer: "px-4",
    widgetHeaderContainer: "d-flex justify-content-between",
    textInHeader: "m-0 pt-3",
    cardsContainer: "row",
    cardGeneralContainer:
      "col-xxl-3 col-xl-3 col-lg-4 col-md-8 col-sm-8 col-xs-8",
  },
  instance_time_edit: {
    generalContainer: "px-4",
    widgetHeaderContainer:
      "w-100 d-flex flex-row justify-content-between align-items-center",
    closeWidgetIcon: "bi bi-x-lg",
    tabsContainer: "pt-4",
    tabSelectedIcon: "bi bi-square-fill",
    timeZoneSelector: "mb-4",
    buttonsContainer: "d-flex flex-row-reverse justify-content-between",
    instanceTimeSettingContainer: "align-items-center pt-3 pb-4",
  },
};

//===================================================================== End class names ===============================================================================================

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

return (
  <Widget
    src={`${widgetOwner}/widget/Instance_time`}
    props={{ allWidgetsInlineStyles, allWidgetsClassNames }}
  />
);

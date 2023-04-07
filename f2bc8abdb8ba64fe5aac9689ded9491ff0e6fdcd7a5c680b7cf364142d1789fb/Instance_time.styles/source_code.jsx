//==================================================================== Start icons=======================================================================================================

const closeIcon = "bi bi-x-lg";
const instanceTimeIcon = "bi bi-calendar-week-fill";
const newScheduleButtonInnerIcon = "bi bi-plus-lg";
const closeWidgetIcon = "bi bi-x-lg";
const tabSelectedIcon = "bi bi-square-fill";
const caretUpIcon = "bi-caret-up";
const caretDownIcon = "bi-caret-down";

//===================================================================== End icons========================================================================================================

//==================================================================== Start standard styles ============================================================================================

const colors = {
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

const standardButtonStyles = {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: "1rem",
  margin: "0",
  padding: "0.3rem 1.5rem",
  backgroundColor: colors.color1,
  borderRadius: "12px",
  color: colors.color2,
};

const standardButtonHoveringStyles = {
  border: "2px solid black",
  color: "black",
  backgroundColor: colors.color2,
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
  backgroundColor: colors.green1,
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: colors.green2,
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const scheduleStatusOff = {
  height: "2.1rem",
  width: "3rem",
  marginRight: "1rem",
  letterSpacing: "-0.025rem",
  backgroundColor: colors.red1,
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: colors.red2,
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const instanceTimeReviewCardStatusIndicationOn = {
  backgroundColor: colors.green1,
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: colors.green2,
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const instanceTimeReviewCardStatusIndicationOff = {
  backgroundColor: colors.red1,
  textAlign: "center",
  borderRadius: "16px",
  fontSize: "0.8rem",
  color: colors.red2,
  fontWeight: "500",
  padding: "0.5rem 1rem",
};

const tabSelected = {
  color: colors.grey1,
  fontSize: "0.8rem",
  userSelect: "none",
  cursor: "pointer",
  marginRight: "1rem",
};

const tabNotSelected = {
  color: colors.grey2,
  fontSize: "0.8rem",
  userSelect: "none",
  cursor: "pointer",
  marginRight: "1rem",
};

//===================================================================== End standard styles =============================================================================================

//==================================================================== Start inline styles ==============================================================================================

const allWidgetsInlineStyles = {
  instance_time: {
    newShceduleButtonInMobileContainer: { backgroundColor: colors.color2 },
    renderAbortPollCreationModal: {
      generalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.green3,
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
        color: colors.grey3,
        fontSize: "1rem",
        textAlign: "center",
      },
      modalFooter: { border: "none", justifyContent: "space-around" },
      continueEditingButton: {
        padding: "0.7rem",
        borderRadius: "16px",
        width: "45%",
        backgroundColor: colors.color2,
        border: `1.5px solid ${colors.grey4}`,
        color: colors.color1,
        fontWeight: "700",
        letterSpacing: "0.01em",
      },
      discardChangesButton: {
        padding: "0.7rem",
        borderRadius: "16px",
        width: "45%",
        backgroundColor: colors.red3,
        border: "1.5px solid transparent",
        color: colors.color2,
        fontWeight: "700",
        letterSpacing: "0.01em",
      },
    },
    generalContainer: {
      backgroundColor: colors.grey5,
      fontFamily: "Onest",
      fontStyle: "normal",
      borderRadius: "20px",
    },
    siteHeader: {
      backgroundColor: colors.color2,
      boxShadow: "rgba(43, 68, 106, 0.04) 0px 4px 28px",
    },
    logoTitle: {
      margin: "0px 0.5rem",
      color: colors.grey6,
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
    newScheduleButtonInnerIcon: { color: colors.color2 },
    newScheduleButtonInnerIconHovered: { color: "black" },
    showUserInfoInHeaderText: { margin: "0px", fontSize: "0.8rem" },
  },
  instance_time_card: {
    widgetGeneralContainer: {
      maxWidth: "80%",
    },
    generalContainer: {
      width: "100%",
      maxWidth: "85%",
      margin: "2rem",
      padding: "0 2rem 1rem 2rem",
      borderRadius: "18px",
      background: colors.color2,
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
      backgroundColor: colors.lightBlue,
      width: "0.5rem",
      minWidth: "5px",
      marginRight: "0.5rem",
      borderRadius: "8px",
    },
    instanceTimeText: {
      fontWeight: "700",
      fontSize: "1.5rem",
      letterSpacing: "0.1px",
      color: colors.color1,
      wordWrap: "anywhere",
    },
    otherWidgetsContainer: {
      position: "relative",
      width: "max-content",
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
      backgroundColor: colors.grey5,
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
      backgroundColor: colors.color2,
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
      backgroundColor: colors.color2,
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
      backgroundColor: colors.red4,
      textAlign: "center",
      borderRadius: "16px",
      marginRight: "1rem",
      fontSize: "0.8rem",
      letterSpacing: "-0.025rem",
      color: colors.red3,
      fontWeight: "500",
      padding: "0.5rem 2rem",
    },
  },
  instance_time_edit: {
    generalContainer: {
      backgroundColor: colors.color2,
      borderRadius: "28px",
      margin: "2rem auto 1rem auto",
      width: "60%",
      minWidth: "85%",
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
      color: colors.grey6,
      marginBottom: "0.3rem",
    },
    timeZoneSelector: {
      backgroundColor: colors.color2,
      padding: "0.5rem 1.5rem",
      borderRadius: "0.8rem",
      border: `1.5px solid ${colors.lightBlue2}`,
      color: colors.grey6,
      letterSpacing: "-0.01em",
      width: "50%",
      minWidth: "250px",
      display: "block",
    },
    buttonHovered: standardButtonHoveringStyles,
    button: standardButtonStyles,
  },
  instance_time_setting: {
    timeSelectorContainerActive: {
      display: "flex",
      fontWeight: "600",
      cursor: "pointer",
    },
    timeSelectorContainerInactive: {
      display: "flex",
      fontWeight: "600",
    },
    comboBoxActiveBig: {
      backgroundColor: "white",
      padding: "0.5rem",
      borderRadius: "0.8rem",
      border: `1.5px solid ${colors.grey7}`,
      color: colors.grey7,
      letterSpacing: "-0.01em",
      borderRadius: "1rem",
      cursor: "pointer",
    },
    comboBoxInactiveBig: {
      backgroundColor: "white",
      padding: "0.5rem",
      borderRadius: "0.8rem",
      border: `1.5px solid ${colors.grey8}`,
      color: colors.grey8,
      letterSpacing: "-0.01em",
      borderRadius: "1rem",
    },
    comboBoxActiveSmall: {
      backgroundColor: "white",
      padding: "0",
      borderRadius: "0.8rem",
      border: `1.5px solid ${colors.grey7}`,
      color: colors.grey7,
      letterSpacing: "-0.01em",
      borderRadius: "1rem",
      cursor: "pointer",
    },
    comboBoxInactiveSmall: {
      backgroundColor: "white",
      padding: "0",
      borderRadius: "0.8rem",
      border: `1.5px solid ${colors.grey8}`,
      color: colors.grey8,
      letterSpacing: "-0.01em",
      borderRadius: "1rem",
    },
    fontW600: {
      fontWeight: 600,
      margin: "0",
    },
    colorActive: {
      color: colors.grey7,
    },
    colorInactive: {
      color: colors.grey8,
    },
    logedInGeneralContainer: {
      display: "flex",
      flexDirection: "column",
    },
    logedInSecondContainer: {
      width: "100%",
      justifyContent: "center",
      color: "black",
      borderRadius: "1rem",
      flexDirection: "column",
    },
    logedInThirdContainer: {
      marginTop: "1rem",
      justifyContent: "center",
      width: "100%",
      color: "black",
      fontWeight: 400,
      borderRadius: "1rem",
      flexDirection: "column",
    },
    headerContainer: {
      background: "white",
      padding: "0 1rem",
    },
    dayContainer: {
      padding: "6px",
      backgroundColor: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "0.8rem",
      border: `1.5px solid ${colors.grey8}`,
      color: colors.grey9,
      letterSpacing: "-0.01em",
      width: "100%",
    },
    inputContainer: { cursor: "pointer" },
    inputActive: {
      backgroundColor: colors.grey7,
      borderColor: colors.grey9,
      cursor: "pointer",
    },
    inputInactive: {
      backgroundColor: colors.color2,
      borderColor: colors.grey10,
      cursor: "pointer",
    },
    showErrorContainer: {
      display: "flex",
      flex: "1",
      flexDirection: "row",
      fontSize: "large",
      color: "red",
    },
    buttonStandard: standardButtonStyles,
    buttonHovered: standardButtonHoveringStyles,
    dayPartContainerBig: {
      display: "flex",
      width: "50%",
    },
    dayPartContainerSmall: {
      display: "flex",
      width: "100%",
    },
    infoAndTitleContainer: {
      width: "50%",
    },
    headerElement: {
      width: "25%",
      textAlign: "center",
      fontWeight: 600,
    },
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
    logoIcon: instanceTimeIcon,
    openScheduleGeneralContainer:
      "w-100 d-none d-md-flex justify-content-between",
    tabsContainer: "d-flex",
    newShceduleButtonInMobile: "d-md-none d-block mb-3",
    newScheduleButtonInnerIcon: newScheduleButtonInnerIcon,
    showUserInfoInHeader: "d-flex flex-column",
    decorativeDivInHeader:
      "w-100 d-flex flex-row justify-content-between align-items-center",
    bodyContainer: "align-items-center",
  },
  instance_time_card: {
    widgetGeneralContainer:
      "d-flex content-align-start justify-content-between",
    otherWidgetsContainer: "d-flex flex-wrap",
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
    closeWidgetIcon: closeWidgetIcon,
    tabsContainer: "pt-4",
    tabSelectedIcon: tabSelectedIcon,
    timeZoneSelector: "mb-4",
    buttonsContainer: "d-flex flex-row-reverse justify-content-between",
    instanceTimeSettingContainer: "align-items-center pt-3 pb-4",
  },
  instance_time_setting: {
    timeSelector: "d-flex",
    caretsContainer: "d-none d-lg-flex flex-column",
    caretUpIcon: caretUpIcon,
    caretDownIcon: caretDownIcon,
    logedInGeneralContainer: "align-items-center",
    logedInThirdContainer: "d-flex flex-column",
    headerContainer: "d-none d-lg-flex",
    dayContainer: "mb-2",
    buttonsContainer:
      "mt-3 w-100 d-flex flex-row-reverse justify-content-between",
    infoAndTitleContainer:
      "d-flex justify-content-center align-items-center flex-column",
    showInMidAndBigScreens: "d-none d-md-flex",
    showInResponsive: "d-lg-none",
    showInSmallerScreens: "d-md-none",
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

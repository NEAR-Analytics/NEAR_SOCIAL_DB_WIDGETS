const profile = Social.getr(`${context.accountId}/profile`);
const metadata = Social.getr(`webuidl.near/widget/Kudos/metadata`);

State.init({
  metadata: {},
  profile: {},
  hoveringElement: "",
});

if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

if (JSON.stringify(metadata) != JSON.stringify(state.metadata)) {
  State.update({ metadata: metadata });
}

if (!state.metadata) {
  return "Loading metadata";
}

//=============================================================================Start components styles==================================================================================================

const allStyledComponentsStyles = {
  kudos: {
    cardContainer: `
        width: 45%;

        @media (hover: none) {
          width: 100%;
        }
    `,
  },
};

//=============================================================================End components styles=====================================================================================================

//=============================================================================Start inline styles=======================================================================================================

const standardButtonStyles = {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 0.5rem",
  backgroundColor: "#010A2D",
  borderRadius: "12px",
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
};

const hoveringButtonStyles = {
  border: "2px solid black",
  color: "black",
  backgroundColor: "white",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 0.5rem",
  borderRadius: "12px",
  textDecoration: "none",
  margin: "0 1rem",
};

const allWidgetsInlineStyles = {
  standardButtonStyles: standardButtonStyles,
  hoveringButtonStyles: hoveringButtonStyles,
  styles: {
    container: {
      position: "relative",
      zIndex: "1",
      backgroundColor: "rgb(230, 230, 230)",
      fontFamily: "Onest",
      fontStyle: "normal",
      borderRadius: "20px",
      overflowY: "scroll",
    },
    headerContainer: {
      backgroundColor: "white",
      boxShadow: "0px 4px 28px rgba(43, 68, 106, 0.04)",
    },
    widgetImageContainer: {
      backgroundColor: "#010A2D",
      color: "white",
      height: "40px",
      minWidth: "2.5rem",
      aspectRatio: "1",
      borderRadius: "12px",
    },
    kudosTitle: {
      margin: "0 0.5rem",
      color: "#010A2D",
      fontWeight: "700",
      fontSize: "1.3rem",
      letterSpacing: "0.1px",
    },
    userName: {
      margin: "0",
      fontSize: "0.8rem",
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "120px",
    },
    kudosImage: {
      borderRadius: "12px",
    },
  },

  //======================================================================================================================================================================================================

  kudos: {
    selectedTab: {
      margin: "2rem 0 0.5rem 0",
      fontWeight: "700",
    },
    allCommentAnswerBox: {
      cardsContainer: {
        boxShadow: "1px 0px 8px -3px rgba(0,0,0,0.44) inset",
        maxHeight: "75vh",
        overflowY: "scroll",
        transform: "translateY(calc(100% - 12px))",
        position: "absolute",
        width: "calc(100% + 2px)",
        bottom: "0",
        left: "-1px",
        backgroundColor: "white",
        borderWidth: "0 1px 1px 1px",
        borderStyle: "solid",
        borderColor: "lightGray",
        borderBottomRightRadius: "5px",
        borderBottomLeftRadius: "5px",
        padding: "10px",
      },
      cardContainer: {
        textAlign: "start",
        width: "100%",
      },
      profileImageStyles: {
        width: "1.5em",
        height: "1.5em",
      },
      commentUserNick: {
        maxWidth: "10rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: "0 0.5rem",
      },
    },
    urlTextarea: {
      backgroundColor: "#fafafa",
      border: "1px solid #fafafa",
      borderRadius: "0.375rem",
    },
    commitButton:
      state.hoveringElement == "commitButton"
        ? hoveringButtonStyles
        : standardButtonStyles,
    renderKudoBox: {
      cardContainer: {
        position: "relative",
        boxSizing: "border-box",
        boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
        backgroundColor: "white",
        borderRadius: "1rem",
        textAlign: "center",
        padding: "10px",
        margin: "1rem 0",
      },
      showCommentsButtonContainerNoComments: {
        margin: "0.5rem auto",
        padding: "0.3rem 0.5rem",
        borderRadius: "12px",
        width: "max-content",
      },
      showCommentsButtonContainer: {
        margin: "0.5rem auto",
        padding: "0.3rem 0.5rem",
        cursor: "pointer",
        borderRadius: "12px",
        width: "max-content",
      },
      hoveringShowCommentsButtonContainer: {
        margin: "0.5rem auto",
        padding: "0.3rem 0.5rem",
        cursor: "pointer",
        borderRadius: "12px",
        width: "max-content",
        color: "rgba(0,191,255,255)",
        backgroundColor: "rgba(229, 248, 255, 255)",
      },
      textShowComment: {
        margin: "0",
        userSelect: "none",
      },
      flipButton: {
        transform: "rotate(180deg)",
        transition: "transform 1s",
      },
    },
  },

  //======================================================================================================================================================================================================

  mainPage_post: {
    cardContent: {
      width: "100%",
    },
    postContentContainer: {
      textAlign: "start",
      marginLeft: "1rem",
    },
    followButtonContainer: {
      marginLeft: "0.5rem",
    },
    upVoteContainer: {
      width: "100%",
    },
    upVoteCounter: {
      marginLeft: "1rem",
    },
    commentInput: {
      container: {
        margin: "10px 0px",
        width: "100%",
      },
      textArea: {
        backgroundColor: "rgb(230, 230, 230)",
        border: "1px solid #ced4da",
        borderRadius: "0.375rem",
        width: "100%",
        verticalAlign: "middle",
        marginBottom: "0.5rem",
      },
      commitButton:
        state.hoveringElement == "commitCommentButton"
          ? hoveringButtonStyles
          : standardButtonStyles,
    },
  },
};

//===============================================================================End inline styles=======================================================================================================

//==============================================================================Start class styles=======================================================================================================
a;
const allWidgetsClassNames = {
  styles: {
    container: "pb-5",
    headerContainer:
      "d-flex justify-content-between align-items-center px-4 py-3",
    widgetPresentationContainer: "d-flex align-items-center",
    widgetImageContainer: "d-flex align-items-center justify-content-center",
    kudosImage: "w-100 h-100 shadow",
    userInfoContainer: "p-2",
  },

  //======================================================================================================================================================================================================

  kudos: {
    generalContainer: "px-4 pt-2",
    urlTextareaContainer: "d-flex flex-column my-3 justify-content-around",
    allCardsContainer: "d-flex flex-wrap justify-content-around",
    allCommentAnswerBox: {
      cardContainer: "d-flex justify-content-between",
      userAnswerHeader: "d-flex",
    },
    renderKudoBox: {
      cardContainer: "d-flex flex-column align-items-start",
      showCommentsButtonContainer: "d-flex flex-column align-items-center ",
    },
  },

  mainPage_post: {
    cardContent: "mt-3 text-break w-100 d-flex justify-content-between",
    upVoteContainer:
      "d-flex flex-row-reverse align-items-center justify-content-end",
    commentInput: {
      container: "d-flex align-items-end flex-column",
    },
  },
};

//================================================================================End class styles=======================================================================================================

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const updateGeneralState = (object) => {
  State.update(object);
};

return (
  <div
    className={allWidgetsClassNames.styles.container}
    style={allWidgetsInlineStyles.styles.container}
  >
    <div
      className={allWidgetsClassNames.styles.headerContainer}
      style={allWidgetsInlineStyles.styles.headerContainer}
    >
      <div className={allWidgetsClassNames.styles.widgetPresentationContainer}>
        <div
          className={allWidgetsClassNames.styles.widgetImageContainer}
          style={allWidgetsInlineStyles.styles.widgetImageContainer}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: metadata.image,
              className: allWidgetsClassNames.styles.kudosImage,
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: "kudos image",
              style: allWidgetsInlineStyles.styles.kudosImage,
            }}
          />
        </div>
        <h3 style={allWidgetsInlineStyles.styles.kudosTitle}>Kudos!</h3>
      </div>

      <div className={allWidgetsClassNames.styles.userInfoContainer}>
        <p style={allWidgetsInlineStyles.styles.userName}>
          {state.profile.name}
        </p>
        <p style={allWidgetsInlineStyles.styles.userName}>
          @{context.accountId}
        </p>
      </div>
    </div>
    <Widget
      src={`${widgetOwner}/widget/Kudos`}
      props={{
        allStyledComponentsStyles,
        widgetOwner,
        allWidgetsInlineStyles,
        allWidgetsClassNames,
        updateGeneralState,
      }}
    />
  </div>
);

/* INCLUDE "common.jsx" */
/* END_INCLUDE: "common.jsx" */
/* INCLUDE "communities.jsx" */
/* END_INCLUDE: "communities.jsx" */

State.init({ showModal: false });

const handleOpenModal = () => {
  State.update({ showModal: true });
};

const handleCloseModal = () => {
  State.update({ showModal: false });
};

return (
  <>
    <button
      style={{ backgroundColor: "#008080", color: "white", float: "right" }}
      class="btn"
      onClick={handleOpenModal}
    >
      <span
        style={{
          backgroundColor: "white",
          color: "#008080",
          borderRadius: "50%",
          padding: "0 5px",
        }}
      >
        +
      </span>
      {"Post"}
    </button>

    {state.showModal && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          zIndex: "1000",
        }}
      >
        <button onClick={handleCloseModal}>X</button>
        {/* Add the Controls component here */}
        <Widget
          src={`${user}/widget/Controls`}
          props={{
            metadata: metadata,
            accountId: accountId,
            widgetName: widgetName,
          }}
        />
      </div>
    )}

    {state.showModal && (
      <div
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: "900",
        }}
        onClick={handleCloseModal}
      />
    )}
  </>
);

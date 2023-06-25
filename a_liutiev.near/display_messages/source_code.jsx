const messageArray = props.messageArray || [];
const emptyMessage = props.emptyMessage || "start the thread...";
const sender = props.sender || "Alex Astrum";

return (
  <div class="card-body">
    {messageArray.length === 0 ? (
      <div class="m-0 text-center">
        <p className="small mb-1 text-muted">{emptyMessage}</p>
      </div>
    ) : (
      messageArray.map((message) =>
        message.sender === "AI" ? (
          // user
          <div>
            <div className="d-flex justify-content-between">
              <p className="small mb-1 text-muted">{message.date}</p>
              <p className="small mb-1">{message.sender}</p>
            </div>

            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-primary">
                  {message.payload}
                </p>
              </div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                style={{ width: "45px", height: "100%" }}
                alt="AI Avatar"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between">
              <p className="small mb-1">{message.sender}</p>
              <p className="small mb-1 text-muted">{message.date}</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                style={{ width: "45px", height: "100%" }}
              />
              <div>
                <p
                  className="small p-2 ms-3 mb-3 rounded-3"
                  style={{ backgroundColor: "#f5f6f7" }}
                >
                  {message.payload}
                </p>
              </div>
            </div>
          </div>
        )
      )
    )}
  </div>
);

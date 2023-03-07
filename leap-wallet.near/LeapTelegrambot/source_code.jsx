const accountId = context.accountId;
const poller = null;

if (!accountId) {
  return "Please sign in with NEAR wallet to subscribe for leap near telegram bot";
}

const fetchOTP = () => {
  State.update({
    connectionId: "",
    name: "",
    fetching: true,
    error: "",
  });
  const id = Math.random() * 100 * Math.random();
  return asyncFetch("https://notifications.leapwallet.io/api/v1/otp", {
    body: `{
          "identifier": "${id}",
          "accountId": "${accountId}",
          "metadata": {
              "subscriptions": [
                  {
                      "address": "${accountId}"
                  }
              ]
          }
      }`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

const fetchStatus = () => {
  return asyncFetch(
    `https://notifications.leapwallet.io/api/v1/near/status?accountId=${accountId}`
  );
};

const getOtp = () => {
  fetchOTP()
    .then((res) => {
      State.update({ otp: res.body.otp, fetching: false });
      getStatus();
    })
    .catch((e) => {
      State.update({ error: "Something went wrong in fetching OTP" });
    });
};

const getStatus = () => {
  poller = setInterval(() => {
    // If otp is fetched
    fetchStatus()
      .then((res) => {
        if (res.body.success) {
          State.update({
            connectionId: res.body.connectionMetadata[0].connId,
            name: res.body.connectionMetadata[0].name,
            otp: "",
            error: "",
            fetching: false,
          });
          clearInterval(poller);
        }
      })
      .catch(() => {
        State.update({
          error: "Something went wrong on fetching status",
          fetching: false,
        });
      });
  }, 3000);
};

State.init({
  otp: "",
  connectionId: "",
  error: "",
  fetching: false,
});

const tgDisconnect = (connectionId) => {
  return asyncFetch(
    "https://notifications.leapwallet.io/api/v1/near/disconnect",
    {
      body: `{
        "walletAddr": "${accountId}",
        "connId": "${connectionId}"
    }`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
};

const disConnect = (connectionId) => {
  tgDisconnect(connectionId).then((res) => {
    State.update({ otp: "", connectionId: "", name: "", fetching: false });
  });
};

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h3>Leap telegram bot</h3>
      </div>
      <div>
        {state.connectionId && (
          <div>
            {accountId} is already connected to {state.name}
            <div style={{ marginTop: 24 }}>
              To disconnect type <i>/disconnect</i> in
              <a
                href="https://t.me/LeapboardAlerts_NearBot/start"
                target="_blank"
              >
                Leap Telegram bot
              </a>
              or
              <div>
                search for <b>Leapboard Alerts - Near</b> in telegram
              </div>
            </div>
          </div>
        )}
      </div>
      {!!!state.connectionId && (
        <div>
          {state.otp && (
            <div>
              You OTP is
              <h3 style={{ color: "green" }}>{state.otp}</h3>
              <h4>Steps to connect</h4>
              <div>
                <span>1. Goto, </span>
                <a
                  href="https://t.me/LeapboardAlerts_NearBot/start"
                  target="_blank"
                >
                  Leap Telegram bot
                </a>
                or
                <div>
                  search for <b>Leapboard Alerts - Near</b> in telegram
                </div>
              </div>
              <div>
                2. Type <i>/verify-otp</i>
              </div>
              <div>3. Enter the OTP to connect.</div>
            </div>
          )}
          {!!!state.otp && (
            <button
              class="btn btn-primary"
              onClick={() => {
                getOtp();
              }}
            >
              Get OTP
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);

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

const getStatusOnload = () => {
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
      }
    })
    .catch(() => {
      State.update({
        error: "Something went wrong on fetching status",
        fetching: false,
      });
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

getStatusOnload();

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
        <h5>Telegram notifications bot</h5>
      </div>
      <div>
        {state.connectionId && (
          <div>
            <b>{accountId}</b> is connected to the telegram account
            <b>{state.name}</b>.
            <div style={{ marginTop: 24 }}>
              To disconnect type <i>/disconnect</i> in
              <a
                href="https://t.me/LeapboardAlerts_NearBot/start"
                target="_blank"
              >
                Leap Telegram bot
              </a>
              <div>
                or search for <b>Leapboard Alerts - Near</b> in telegram
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
                <b>Leapboard Alerts - Near</b> in telegram
              </div>
              <div>
                2. Type <i>/verify-otp</i>
              </div>
              <div>3. Enter the OTP generated to connect instantly.</div>
            </div>
          )}
          {!!!state.otp && (
            <div>
              You will receive telegram notifications on all near events
              (transfer, receive, stake, unstake) on your <b>{accountId}</b>{" "}
              account and near social events(follow, poke and post likes)
              <h5 style={{ marginTop: 24 }}>Steps to connect</h5>
              <div>
                <span>1. Goto, </span>
                <a
                  href="https://t.me/LeapboardAlerts_NearBot/start"
                  target="_blank"
                >
                  Leap Telegram bot
                </a>
                or
                <b>Leapboard Alerts - Near</b> in telegram
              </div>
              <div>
                2. Type <i>/verify-otp</i>
              </div>
              <div>3. Enter the OTP generated to connect instantly.</div>
              <button
                style={{ marginTop: 24 }}
                class="btn btn-primary"
                onClick={() => {
                  getOtp();
                }}
              >
                Generate OTP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

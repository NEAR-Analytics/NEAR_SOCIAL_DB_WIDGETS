const contract = "tickets.nearapac.near";
let tickets_saled = Near.view(contract, "count_vipd", {});

let user_account = context.accountId;

return (
  <div className="container border border-info p-3 text-center">
    <h2>
      Total Tickets Saled:{" "}
      <span style={{ color: "red", fontFamily: "Arial", fontWeight: "bold" }}>
        {" "}
        {tickets_saled}
      </span>
    </h2>
  </div>
);

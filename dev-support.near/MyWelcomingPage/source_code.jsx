return (
  <>
    <div class="container">
      <h1> This is my page </h1>

      <div class="row">
        <div class="col-8">
          <Widget
            src="near/widget/NestedDiscussions"
            props={{ identifier: "hello" }}
          />
        </div>
        <div class="col-4">
          <Widget src="simplar.near/widget/BillonUsers" />

          <Widget src="zavodil.near/widget/Lido" />
        </div>
      </div>
    </div>
  </>
);

let Style = styled.div``;

return (
  <Style>
    <div class="row">
      <div class="col-lg-12 mb-3">
        <Widget
          src="mohammadhs.near/widget/NearGithubActivityTotalOverall"
          props={{}}
        />{" "}
      </div>
      <div class="col-lg-12 mb-2">
        <Widget
          src="mohammadhs.near/widget/NearGithubActivityRepositories"
          props={{}}
        />
      </div>
      <div class="col-lg-6 mb-2">
        <Widget
          src="mohammadhs.near/widget/NearGithubActivityPullReqs"
          props={{}}
        />
      </div>
      <div class="col-lg-6 mb-2">
        <Widget
          src="mohammadhs.near/widget/NearGithubActivityActiveDevelopers"
          props={{}}
        />
      </div>
    </div>
  </Style>
);

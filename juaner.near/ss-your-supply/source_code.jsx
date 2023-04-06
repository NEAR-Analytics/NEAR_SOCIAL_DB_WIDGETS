const { suppliedAssets } = props;
return (
  <>
    <div class="title">You Supplied</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="25%">
            Assets
          </th>
          <th scope="col" class="text-start" width="25%">
            Supply APY
          </th>
          <th scope="col" class="text-start">
            Balance
          </th>
        </tr>
      </thead>
      <tbody>{suppliedAssets}</tbody>
    </table>
  </>
);

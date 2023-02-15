return (
  <div className="container">
    <div className="row mb-3">
      <div>
        <h1>App Laboratory</h1>
        <h3>
          <b>Guide:</b> Building Open Web Apps
        </h3>
        <p>
          Learn about this uniquely flexible and reliable social data protocol!
        </p>
        <p>
          Below are useful resources for integrating your app with Near Social.
        </p>
      </div>
    </div>
    <div className="mb-3">
      <div>
        <h2>Virtual Machine APIs</h2>
        <ul>
          <li>Social</li>
          <li>Near</li>
          <li>State</li>
          <li>Storage</li>
          <li>Cache</li>
        </ul>
      </div>
    </div>
    <div className="mb-3">
      <h3>Social APIs</h3>
      <p>
        The Near Social VM provides a convenient API to get data from the
        SocialDB contract.
      </p>
      <div>
        <h4>Has 4 Methods</h4>
        <ul>
          <li>Social.get</li>
          <li>Social.getr</li>
          <li>Social.keys</li>
          <li>Social.index</li>
        </ul>
      </div>
      <h3>Social.get</h3>
      <div>
        <h5>Takes (up to) 3 Arguments:</h5>
        <ul>
          <li>(required) the path pattern(s)</li>
          <li>(optional) the block height or finality</li>
          <li>(optional) the options object</li>
          <ul>
            <li>
              (optional) subscribe - if true, the data will be refreshed every 5
              seconds.
            </li>
            <li>
              (optional) return_deleted - whether to return deleted values (as
              null)
            </li>
            <ul>
              <li>Default is false.</li>
            </ul>
          </ul>
        </ul>
        <p>
          It fetches the data from the SocialDB contract by calling get and
          returns the data. While the data is fetching the returned value equals
          to null. If the path pattern is a single key, it will try to unwrap
          the object until the first wildcard.
        </p>
        <p>
          For example, if the path pattern is mob.near/widget, the SocialDB
          contract will return the following object:
        </p>
        <div className="alert alert-secondary rounded-4 mb-3"></div>
      </div>
      <h3>Social.keys</h3>
      <div>
        <h5>Takes (up to) 3 Arguments:</h5>
        <ul>
          <li>(required) the path pattern(s)</li>
          <li>(optional) the block height or finality</li>
          <li>(optional) the options object</li>
          <ul>
            <li>(optional) subscribe</li>
            <ul>
              <li>if true, data will be refreshed every 5 seconds</li>
            </ul>
            <li>
              (optional) return_type - either "History", "True", or
              "BlockHeight"
              <ul>
                <li>If not specified, it will return "True"</li>
              </ul>
            </li>
            <li>
              (optional) return_deleted - whether to return deleted values (as
              null).
            </li>
            <ul>
              <li>Default is false.</li>
            </ul>
            <li>
              (optional) values_only - whether to return only values (don't
              include objects).
            </li>
            <ul>
              <li>Default is false.</li>
            </ul>
          </ul>
        </ul>
        <p>
          It calls the SocialDB's keys API and returns the data. While the data
          is fetching the returned value equals to null. The keys contract
          doesn't unwrap the object, so the returned data is the same as the
          SocialDB's keys API.
        </p>
      </div>
      <h3>Social.index</h3>
      <div>
        <h5>Takes (up to) 3 Arguments:</h5>
        <ul>
          <li>action is the index_type from the standard</li>
          <ul>
            <li>e.g. in the path index/like, the action is like</li>
          </ul>
          <li>key is the inner indexed value from the standard</li>
          <li>(optional) the options object</li>
          <ul>
            <li>(optional) accountId</li>
            <ul>
              <li>
                If given, it should either be a string or an array of account
                IDs to filter values by them. Otherwise, not filters by account
                Id.
              </li>
            </ul>
            <li>
              (optional) order
              <ul>
                <li>Either asc or desc. Defaults to asc.</li>
              </ul>
            </li>
            <li>(optional) limit</li>
            <ul>
              <li>
                {" "}
                Defaults to 100. The number of values to return. Index may
                return more than index values, if the last elements have the
                same block height.
              </li>
            </ul>
            <li>(optional) from</li>
            <ul>
              <li>Defaults to 0 or Max depending on order.</li>
            </ul>
          </ul>
        </ul>
        <p>
          Returns the array of matched indexed values. Ordered by blockHeight.
        </p>
      </div>
    </div>
  </div>
);

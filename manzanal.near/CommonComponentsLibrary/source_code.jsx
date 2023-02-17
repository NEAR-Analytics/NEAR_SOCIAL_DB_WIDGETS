const curatedComps = props.curatedComps;
const filterTag = props.commonComponentTag ?? "dev";
const debug = props.debug ?? false;
return (
  <>
    <div class="mb-4">
      <h2>Components Library</h2>
      <p class="text text-muted">
        Building blocks for Near Social applications.
      </p>
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            filterTag: filterTag,
            placeholder: "🔍 Search for common components",
            limit: 24,
            onChange: ({ result }) => {
              State.update({ components: result });
            },
          }}
        />
      </div>
      {state.components && (
        <div className="mb-2">
          {state.components.map((comp, i) => (
            <div class="mb-2" key={i}>
              <Widget
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>

    <div class="mt-2">
      <h4>Gallery</h4>
      <p class="text text-muted ">
        A curated list of common components grouped by categories.
      </p>
      <div className="mb-3"></div>
      {curatedComps && (
        <div className="mb-6">
          {curatedComps.map((cat, i) => (
            <div class="mt-3">
              <div class="text fs-5 text-muted mb-1">{cat.category}</div>
              <div class="border border-2 mb-4 rounded"></div>
              <div class="container">
                <div className="row ">
                  {cat.components.map((comp, i) => (
                    <div class="col-6 mb-2">
                      <Widget
                        key={i}
                        src="mob.near/widget/WidgetMetadata"
                        props={{
                          accountId: comp.accountId,
                          widgetName: comp.widgetName,
                          expanded: false,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

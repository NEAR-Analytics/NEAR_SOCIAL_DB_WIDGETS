/* Created by duocelot and kasodon */
/* Sky Cross Project */

const accountId = props.accountId ?? context.accountId;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

              href="https://shard.dog/go?url=https://near.social/#/duocelot.near/widget/Sky_Cross"
              style={{
                fontFamily: "Press Start 2P",
                fontSize: "14px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              HERE
            </a>
          </div>
        </NoAuthPara>
      </NoAuth>
    )}
  </Theme>
);

const { onLoad, onRefresh, loaded, testnet } = props;

const LENS_API_URL = testnet
  ? "https://api-mumbai.lens.dev"
  : "https://api.lens.dev";

let LensSDK = {
  jwt: {
    accessToken: "",
    refreshToken: "",
  },
  authenticated: false,
  request: (query, variables, headers, method) => {
    return asyncFetch(LENS_API_URL, {
      method: method ?? "POST",
      headers: headers ?? {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables ?? {},
      }),
    });
  },
  getChallenge: (address) => {
    return LensSDK.request(
      `
        query Challenge ($address: EthereumAddress!) {
            challenge(request: { address: $address}) {
            text
            }
        }
       `,
      {
        address: address,
      }
    );
  },
  authenticateSignature: (address, signature) => {
    return LensSDK.request(
      `
        mutation Authenticate ($address: EthereumAddress!, $signature: Signature!) {
            authenticate(request: {
            address: $address,
            signature: $signature
            }) {
            accessToken
            refreshToken
            }
        }
      `,
      {
        address: address,
        signature: signature,
      }
    );
  },
  authenticateLens: (address, signer, onSuccess) => {
    LensSDK.getChallenge(address).then((payload) => {
      let challenge = payload.body.data.challenge.text;
      const response = signer().signMessage(challenge);

      response.then((signature) => {
        LensSDK.authenticateSignature(address, signature).then((payload) => {
          if (
            payload.status === 200 &&
            !!payload.body.data.authenticate.accessToken
          ) {
            LensSDK.jwt.accessToken =
              payload.body.data.authenticate.accessToken;
            LensSDK.jwt.refreshToken =
              payload.body.data.authenticate.refreshToken;
            LensSDK.authenticated = true;

            if (onSuccess) {
              onSuccess();
            }

            if (onRefresh) {
              onRefresh(LensSDK);
            }
          }
        });
      });
    });
  },
  isFollowedByMe: (profileId) => {
    return LensSDK.request(
      `
                query Profile {
                    profile(request: { profileId: "` +
        profileId +
        `" }) {
                        isFollowedByMe
                    }
                }`,
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": LensSDK.jwt.accessToken,
      }
    );
  },
  getProfileByHandle: (handle) => {
    return LensSDK.request(
      `
        query Profile ($handle: Handle!) {
          profile(request: { handle: $handle }) {
            id
            name
            bio
            attributes {
              displayType
              traitType
              key
              value
            }
            followNftAddress
            metadata
            isDefault
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
              __typename
            }
            handle
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
              __typename
            }
            ownedBy
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
          }
    }
  `,
      {
        handle: handle,
      }
    );
  },
  getProfileByEthereumAddress: (ethereumAddress) => {
    return LensSDK.request(
      `
        query Profiles ($address: [EthereumAddress!]) {
        profiles(request: { ownedBy: $address}) {
          items {
            handle
          }
        }
    }
    `,
      {
        address: [ethereumAddress],
      }
    );
  },
  followProfile: (profileId) => {
    return LensSDK.request(
      `
        mutation ProxyAction {
            proxyAction(request: {
                follow: {
                    freeFollow: {
                        profileId: "` +
        profileId +
        `"
                    }
                }
            })
        }`,
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": LensSDK.jwt.accessToken,
      }
    );
  },
  unfollowProfile: (profileId) => {
    return LensSDK.request(
      `
        mutation Unfollow {
  createUnfollowTypedData(request: { profile: "` +
        profileId +
        `" }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      types {
        BurnWithSig {
          name
          type
          __typename
        }
        __typename
      }
      value {
        nonce
        deadline
        tokenId
        __typename
      }
      __typename
    }
    __typename
  }
}`,
      {},
      {
        "Content-Type": "application/json",
        "x-access-token": LensSDK.jwt.accessToken,
      }
    );
  },
};

if (!!onLoad && !loaded) {
  onLoad(LensSDK);
}

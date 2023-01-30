const res = fetch('https://rpc.mainnet.near.org/status', { subscribe: true });
console.log(res);

(props.callbacks || []).forEach((callback) => {
  callback();
});

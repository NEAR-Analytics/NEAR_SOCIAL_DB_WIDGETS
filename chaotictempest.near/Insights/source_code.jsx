const SEARCH_API_KEY = props.searchApiKey;
const APPLICATION_ID = props.appId;
const INDEX = props.index;
const USER_TOKEN = props.userToken ?? "anonymous";

const code = `
<script>
var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@2.2.3";

!function(e,a,t,n,s,i,c){e.AlgoliaAnalyticsObject=s,e[s]=e[s]||function(){
(e[s].queue=e[s].queue||[]).push(arguments)},i=a.createElement(t),c=a.getElementsByTagName(t)[0],
i.async=1,i.src=n,c.parentNode.insertBefore(i,c)
}(window,document,"script",ALGOLIA_INSIGHTS_SRC,"aa");

</script>
<script>

aa('init', {
  appId: '${APPLICATION_ID}',
  apiKey: '${SEARCH_API_KEY}',
});
aa('setUserToken', '${USER_TOKEN}');

window.top.postMessage("loaded", "*");
window.addEventListener("message", (message) => {
  if (!message.data.event) {
    return;
  }

  console.log("event", message.data.event);
  aa('clickedObjectIDsAfterSearch', message.data.event);
}, false);

</script>
`;

return (
  <iframe
    srcDoc={code}
    style={{ position: absolute, width: 0, height: 0, border: 0 }}
    message={{ event: props.event }}
    onMessage={(res) => State.update({ res })}
  />
);

const SECRET_KEY_STORAGE_KEY = "secretKey";
Storage.privateGet(SECRET_KEY_STORAGE_KEY);

State.init({
  secretKey: null,
  airesponse: "",
  aiquestion: "",
  accountId: "",
  iframeMessage: null,
});

function init_iframe() {
  const secretKey = Storage.privateGet(SECRET_KEY_STORAGE_KEY);

  State.update({
    secretKey,
    iframeMessage: secretKey
      ? {
          command: "useaccount",
          secretKey: secretKey,
        }
      : {
          command: "createaccount",
        },
  });
}

function ask_ai() {
  State.update({
    iframeMessage: {
      command: "ask_ai",
      aiquestion: state.aiquestion,
      ts: new Date().getTime(),
    },
    airesponse: "",
    progress: true,
    progressText: "",
  });
}

function changeSecretKey(secretKey) {
  State.update({ secretKey });
  Storage.privateSet(SECRET_KEY_STORAGE_KEY, secretKey);
  init_iframe();
}

function handleMessage(msg) {
  switch (msg.command) {
    case "accountcreated":
      Storage.privateSet(SECRET_KEY_STORAGE_KEY, msg.secretKey);
      State.update({ accountId: msg.accountId, secretKey: msg.secretKey });
      break;
    case "airesponse":
      State.update({
        airesponse: msg.airesponse,
        progress: false,
        error: msg.error,
      });
      break;
    case "aiprogress":
      State.update({
        progressText: state.progressText + msg.progressmessage,
        progress: true,
      });
      break;
    case "usingaccount":
      State.update({ accountId: msg.accountId });
      break;
    case "ready":
      console.log("ready");
      init_iframe();
      break;
  }
}

const iframe = (
  <iframe
    message={state.iframeMessage}
    onMessage={handleMessage}
    src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgoKPGhlYWQ+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8c3R5bGU+CiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgYm9yZGVyOiBub25lOwogICAgICAgICAgICBib3JkZXI6ICMxMTQgc29saWQgNHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgICAgICAgICAgY29sb3I6IGJsYWNrOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uOmhvdmVyIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KICAgIDwvc3R5bGU+CjwvaGVhZD4KCjxib2R5PgogICAgPGJ1dHRvbiBpZD0icGxheWJ1dHRvbiI+cGxheTwvYnV0dG9uPgogICAgPHA+UmVuZGVyaW5nOiA8c3BhbiBpZD0ibG9hZGVycHJvZ3Jlc3MiPjwvc3Bhbj48L3A+CjwvYm9keT4KPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9e2JlbGw6WzU2LDAsNjgsMCw2NiwwLDY4LDAsNjEsMCw2MywwLDU5LDAsNTYsMF0sYmFzczpbMzIsMSwwLDAsMzIsMSwwLDAsMzAsMSwzMiwwLDMyLDAsMzIsMzBdLGtpY2s6WzEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMF0scGFkMTpbNjMsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLHBhZDI6WzY4LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxwYWQzOls3MSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sbGVhZDpbMCwwLDYzLDAsNjgsMSwxLDAsNzAsMSw3MSwxLDAsMCwwLDBdLHNuYXJlOlswLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsNTBdLGhpaGF0OlszMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDBdLGJwbToxMjB9LGE9NCxuPTQqYSx0PSJtYWlubmV0IixyPW5ldyBuZWFyQXBpLmtleVN0b3Jlcy5Jbk1lbW9yeUtleVN0b3JlO2xldCBzLG8saTtjb25zdCBjPXtrZXlTdG9yZTpyLG5ldHdvcmtJZDp0LG5vZGVVcmw6YGh0dHBzOi8vcnBjLiR7dH0ubmVhci5vcmdgLHdhbGxldFVybDpgaHR0cHM6Ly93YWxsZXQuJHt0fS5uZWFyLm9yZ2AsaGVscGVyVXJsOmBodHRwczovL2hlbHBlci4ke3R9Lm5lYXIub3JnYCxleHBsb3JlclVybDpgaHR0cHM6Ly9leHBsb3Jlci4ke3R9Lm5lYXIub3JnYH07YXN5bmMgZnVuY3Rpb24gbChlKXtjb25zdCBhPW5lYXJBcGkudXRpbHMuS2V5UGFpci5mcm9tU3RyaW5nKGUpLG49QnVmZmVyLmZyb20oYS5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO2F3YWl0IHIuc2V0S2V5KHQsbixhKTtjb25zdCBvPWF3YWl0IG5lYXJBcGkuY29ubmVjdChjKTtyZXR1cm4gcz1hd2FpdCBvLmFjY291bnQobiksbn1hc3luYyBmdW5jdGlvbiBkKGUpe3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcHJvZ3Jlc3MiLHByb2dyZXNzbWVzc2FnZToiY3JlYXRpbmcgcmVxdWVzdCJ9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTtjb25zdCBhPWF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUpe2NvbnN0IGE9cy5hY2NvdW50SWQsbj1KU09OLnN0cmluZ2lmeShlKSx0PXNoYTI1NihuKSxyPWF3YWl0IHMuY29ubmVjdGlvbi5zaWduZXIuZ2V0UHVibGljS2V5KHMuYWNjb3VudElkLHMuY29ubmVjdGlvbi5uZXR3b3JrSWQpLG89KGF3YWl0IHMuZmluZEFjY2Vzc0tleSgpKS5hY2Nlc3NLZXksaT0rK28ubm9uY2UsYz1uZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2RlY29kZShvLmJsb2NrX2hhc2gpLGw9bmVhckFwaS50cmFuc2FjdGlvbnMuY3JlYXRlVHJhbnNhY3Rpb24ocy5hY2NvdW50SWQsciwianNpbnJ1c3QubmVhciIsaSxbbmVhckFwaS50cmFuc2FjdGlvbnMuZnVuY3Rpb25DYWxsKCJhc2tfYWkiLHttZXNzYWdlX2hhc2g6dH0sIjMwMDAwMDAwMDAwMDAwIiw1MDAwMDAwMDAwMDAwMDAwMDAwMDAwbildLGMpLFtkLHBdPWF3YWl0IG5lYXJBcGkudHJhbnNhY3Rpb25zLnNpZ25UcmFuc2FjdGlvbihsLHMuY29ubmVjdGlvbi5zaWduZXIscy5hY2NvdW50SWQscy5jb25uZWN0aW9uLm5ldHdvcmtJZCk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHtzaWduZWRfdHJhbnNhY3Rpb246QnVmZmVyLmZyb20ocC5lbmNvZGUoKSkudG9TdHJpbmcoImJhc2U2NCIpLHRyYW5zYWN0aW9uX2hhc2g6bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9lbmNvZGUoZCksc2VuZGVyX2FjY291bnRfaWQ6YSxtZXNzYWdlczplfSl9KGUpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcHJvZ3Jlc3MiLHByb2dyZXNzbWVzc2FnZToic2VuZGluZyByZXF1ZXN0In0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2NvbnN0IG49YXdhaXQgZmV0Y2goImh0dHBzOi8vbmVhci1vcGVuYWkudmVyY2VsLmFwcC9hcGkvb3BlbmFpc3RyZWFtIix7bWV0aG9kOiJQT1NUIixib2R5OmF9KTtpZighbi5vayl0aHJvdyBuZXcgRXJyb3IoYCR7bi5zdGF0dXN9ICR7bi5zdGF0dXNUZXh0fVxuJHthd2FpdCBuLnRleHQoKX1cbmApO2NvbnN0IHQ9bi5ib2R5LmdldFJlYWRlcigpLHI9W107Zm9yKDs7KXtjb25zdHtkb25lOmUsdmFsdWU6YX09YXdhaXQgdC5yZWFkKCk7aWYoZSlicmVhaztjb25zdCBuPShuZXcgVGV4dERlY29kZXIpLmRlY29kZShhKTtyLnB1c2gobiksd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlwcm9ncmVzcyIscHJvZ3Jlc3NtZXNzYWdlOm59LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKX1yZXR1cm4gci5qb2luKCIiKX1hc3luYyBmdW5jdGlvbiBwKGUpe2NvbnN0IHQ9bmV3IG5lYXJBcGkuQ29udHJhY3Qocywid2ViYXNzZW1ibHltdXNpYy5uZWFyIix7dmlld01ldGhvZHM6WyJ3ZWI0X2dldCJdfSkscj1hd2FpdCB0LndlYjRfZ2V0KHtyZXF1ZXN0OntwYXRoOiIvbXVzaWN3YXNtcy9ncm9vdmVpc2ludGhlY29kZS53YXNtIn19KSxjPWF3YWl0IGZldGNoKGBkYXRhOmFwcGxpY2F0aW9uL3dhc207YmFzZTY0LCR7ci5ib2R5fWApLnRoZW4oKGU9PmUuYXJyYXlCdWZmZXIoKSkpLGw9bmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFsoKCk9Pntjb25zdCBlPWZ1bmN0aW9uKCl7b25tZXNzYWdlPWFzeW5jIGU9PntpZihlLmRhdGEud2FzbSl7Y29uc3QgYT1lLmRhdGEuc2FtcGxlcmF0ZSxuPVdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGUuZGF0YS53YXNtLHtlbnZpcm9ubWVudDp7U0FNUExFUkFURTphfX0pLHQ9KGF3YWl0IG4pLmluc3RhbmNlLmV4cG9ydHMscj10LmFsbG9jYXRlUGF0dGVybnMoZS5kYXRhLnBhdHRlcm5zLmxlbmd0aC8xNik7bmV3IFVpbnQ4QXJyYXkodC5tZW1vcnkuYnVmZmVyLHIsZS5kYXRhLnBhdHRlcm5zLmxlbmd0aCkuc2V0KGUuZGF0YS5wYXR0ZXJucyk7Y29uc3Qgcz1lLmRhdGEucGF0dGVybkxlbmd0aC8xNixvPXQuYWxsb2NhdGVJbnN0cnVtZW50UGF0dGVybkxpc3QocyxlLmRhdGEubnVtSW5zdHJ1bWVudHMpLGk9bmV3IFVpbnQ4QXJyYXkodC5tZW1vcnkuYnVmZmVyLG8sZS5kYXRhLm51bUluc3RydW1lbnRzKnMpO2ZvcihsZXQgZT0wO2U8aS5sZW5ndGg7ZSsrKWlbZV09ZTtjb25zb2xlLmxvZyhpKSx0LnNldEJQTShlLmRhdGEuYnBtKTtjb25zdCBjPTEyOCxsPWUuZGF0YS5zb25nZHVyYXRpb24qYS8xZTMsZD10LmFsbG9jYXRlU2FtcGxlQnVmZmVyP3QuYWxsb2NhdGVTYW1wbGVCdWZmZXIoYyk6dC5zYW1wbGVidWZmZXIscD1uZXcgRmxvYXQzMkFycmF5KHQubWVtb3J5LmJ1ZmZlcixkLGMpLHU9bmV3IEZsb2F0MzJBcnJheSh0Lm1lbW9yeS5idWZmZXIsZCs0KmMsYyk7bGV0IG09MDtjb25zdCBmPW5ldyBBcnJheUJ1ZmZlcig0KmwpLGc9bmV3IERhdGFWaWV3KGYpLGg9bmV3IEFycmF5QnVmZmVyKDQqbCksdz1uZXcgRGF0YVZpZXcoaCkseT0xPT09bmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQxNkFycmF5KFsxXSkuYnVmZmVyKVswXTtmb3IoO208bDspe251bGwhPXQucGxheUV2ZW50c0FuZEZpbGxTYW1wbGVCdWZmZXI/dC5wbGF5RXZlbnRzQW5kRmlsbFNhbXBsZUJ1ZmZlcigpOnQuZmlsbFNhbXBsZUJ1ZmZlcigpO2ZvcihsZXQgZT0wO2U8YyYmbTxsO2UrKylnLnNldEZsb2F0MzIoNCptLHBbZV0seSksdy5zZXRGbG9hdDMyKDQqbSx1W2VdLHkpLG0rKztwb3N0TWVzc2FnZSh7cHJvZ3Jlc3M6bS9sfSl9cG9zdE1lc3NhZ2Uoe2xlZnRidWZmZXI6ZixyaWdodGJ1ZmZlcjpofSxbZixoXSl9fX0udG9TdHJpbmcoKTtyZXR1cm4gZS5zdWJzdHJpbmcoZS5pbmRleE9mKCJ7IikrMSxlLmxhc3RJbmRleE9mKCJ9IikpfSkoKV0se3R5cGU6InRleHQvamF2YXNjcmlwdCJ9KSkpLGQ9ZS5icG0scD00NDEwMCx1PTZlNCphL2QsbT11KnAvMWUzLGY9WyJiZWxsIiwiYmFzcyIsInBhZDEiLCJwYWQyIiwicGFkMyIsImtpY2siLCJzbmFyZSIsImxlYWQiLCJoaWhhdCJdLGc9bmV3IEFycmF5KGYubGVuZ3RoKm4pO2cuZmlsbCgwKSxmLmZvckVhY2goKChhLHQpPT57ZVthXSYmZVthXS5mb3JFYWNoKCgoZSxhKT0+Z1t0Km4rYV09ZSkpfSkpO2NvbnN0e2xlZnRidWZmZXI6aCxyaWdodGJ1ZmZlcjp3fT1hd2FpdCBuZXcgUHJvbWlzZSgoYXN5bmMgZT0+e2wucG9zdE1lc3NhZ2Uoe3dhc206YyxzYW1wbGVyYXRlOnAsc29uZ2R1cmF0aW9uOnUsYnBtOmQscGF0dGVybkxlbmd0aDpuLHBhdHRlcm5zOmcsbnVtSW5zdHJ1bWVudHM6Zi5sZW5ndGh9KSxsLm9ubWVzc2FnZT1hPT57YS5kYXRhLmxlZnRidWZmZXI/ZShhLmRhdGEpOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNsb2FkZXJwcm9ncmVzcyIpLmlubmVySFRNTD0oMTAwKmEuZGF0YS5wcm9ncmVzcykudG9GaXhlZCgyKSsiJSJ9fSkpLHk9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBsYXlidXR0b24iKSxiPSgpPT57Y29uc3QgZT1vLmNyZWF0ZUJ1ZmZlcigyLG0scCk7ZS5nZXRDaGFubmVsRGF0YSgwKS5zZXQobmV3IEZsb2F0MzJBcnJheShoKSksZS5nZXRDaGFubmVsRGF0YSgxKS5zZXQobmV3IEZsb2F0MzJBcnJheSh3KSksaT1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLGkuYnVmZmVyPWUsaS5jb25uZWN0KG8uZGVzdGluYXRpb24pLGkubG9vcD0hMCxpLnN0YXJ0KDApfTtvJiZpJiYoaS5zdG9wKCksaS5kaXNjb25uZWN0KCksaT1udWxsLGIoKSkseS5vbmNsaWNrPSgpPT57aWYobylyZXR1cm4gby5jbG9zZSgpLHZvaWQobz1udWxsKTtvPW5ldyBBdWRpb0NvbnRleHQsYigpfX13aW5kb3cub25tZXNzYWdlPWFzeW5jIG89Pntzd2l0Y2goZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW49by5vcmlnaW4sY29uc29sZS5sb2coImlmcmFtZSBnb3QgbWVzc2FnZSIsby5kYXRhKSxvLmRhdGEuY29tbWFuZCl7Y2FzZSJjcmVhdGVhY2NvdW50Ijpjb25zdHtzZWNyZXRLZXk6aSxhY2NvdW50SWQ6dX09YXdhaXQgYXN5bmMgZnVuY3Rpb24oKXtjb25zdCBlPW5lYXJBcGkudXRpbHMuS2V5UGFpckVkMjU1MTkuZnJvbVJhbmRvbSgpLGE9QnVmZmVyLmZyb20oZS5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO2F3YWl0IHIuc2V0S2V5KHQsYSxlKTtjb25zdCBuPWF3YWl0IG5lYXJBcGkuY29ubmVjdChjKTtyZXR1cm4gcz1hd2FpdCBuLmFjY291bnQoYSkse3NlY3JldEtleTplLnNlY3JldEtleSxhY2NvdW50SWQ6YX19KCk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWNjb3VudGNyZWF0ZWQiLHNlY3JldEtleTppLGFjY291bnRJZDp1fSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJ1c2VhY2NvdW50Ijp3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJ1c2luZ2FjY291bnQiLGFjY291bnRJZDphd2FpdCBsKG8uZGF0YS5zZWNyZXRLZXkpfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbikscChlKTticmVhaztjYXNlImFza19haSI6bGV0IG0sZjt0cnl7Zj1hd2FpdCBkKFt7cm9sZToidXNlciIsY29udGVudDpgSGVyZSdzIGEgZGVzY3JpcHRpb24gb2YgYSBKYXZhU2NyaXB0IG9iamVjdCBjb250YWluaW5nIGEgbXVzaWNhbCBwYXR0ZXJuIHdpdGggdGhlIGZvbGxvd2luZyBpbnN0cnVtZW50cyBhbmQgc3BlY2lmaWNhdGlvbnM6XG5iZWxsOiBhbiBhcnJheSBvZiBNSURJIG5vdGUgbnVtYmVycyByZXByZXNlbnRpbmcgYSBtZWxvZHksIDAgZm9yIHNpbGVuY2UsIDEgZm9yIGhvbGRpbmcgYSBub3RlXG5sZWFkOiBhbiBhcnJheSBvZiBNSURJIG5vdGUgbnVtYmVycyByZXByZXNlbnRpbmcgYSBtZWxvZHksIDAgZm9yIHNpbGVuY2UsIDEgZm9yIGhvbGRpbmcgYSBub3RlXG5iYXNzOiBhbiBhcnJheSBvZiBNSURJIG5vdGUgbnVtYmVycyByZXByZXNlbnRpbmcgYSBiYXNlbGluZSwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbnBhZDE6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgYm90dG9tIG5vdGUgaW4gYSBiYWNrZ3JvdW5kIHBhZCBpbnN0cnVtZW50IGNob3JkLCAwIGZvciBzaWxlbmNlLCAxIGZvciBob2xkaW5nIGEgbm90ZVxucGFkMjogYW4gYXJyYXkgb2YgTUlESSBub3RlIG51bWJlcnMgcmVwcmVzZW50aW5nIHRoZSBtaWRkbGUgbm90ZSBpbiBhIGJhY2tncm91bmQgcGFkIGluc3RydW1lbnQgY2hvcmQsIDAgZm9yIHNpbGVuY2UsIDEgZm9yIGhvbGRpbmcgYSBub3RlXG5wYWQzOiBhbiBhcnJheSBvZiBNSURJIG5vdGUgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIHRvcCBub3RlIGluIGEgYmFja2dyb3VuZCBwYWQgaW5zdHJ1bWVudCBjaG9yZCwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbmtpY2s6IGFuIGFycmF5IG9mIGludGVnZXJzIHJlcHJlc2VudGluZyB2ZWxvY2l0aWVzIGZvciBhIGJhc2UgZHJ1bSBzb3VuZFxuc25hcmU6IGFuIGFycmF5IG9mIGludGVnZXJzIHJlcHJlc2VudGluZyB2ZWxvY2l0aWVzIGZvciBhIHNuYXJlIGRydW0gc291bmRcbmhpaGF0OiBhbiBhcnJheSBvZiBpbnRlZ2VycyByZXByZXNlbnRpbmcgdmVsb2NpdGllcyBmb3IgYSBoaWhhdCBzb3VuZFxuYnBtOiBhbiBpbnRlZ2VyIHJlcHJlc2VudGluZyB0ZW1wbyBpbiBiZWF0cyBwZXIgbWludXRlLiBGcm9tIDYwIHdoaWNoIGlzIHZlcnkgc2xvdyB0byAxNTAgd2hpY2ggaXMgdmVyeSBmYXN0XG5cbkJlIGF3YXJlIG9mIHRoZSB2YWx1ZSAxIHdoaWNoIGlzIHVzZWQgZm9yIGhvbGRpbmcgYSBub3RlIHRvIGxhc3QgbG9uZ2VyIHRoYW4ganVzdCBvbmUgdGljay5cblxuVGhlIGxlbmd0aCBvZiBlYWNoIGFycmF5IGlzIG1heGltdW0gJHtufSB3aGljaCBjb3JyZXNwb25kcyB0byAke2F9IGJlYXRzLiBFYWNoIGJlYXQgaXMgNCB0aWNrcy4gT25lIGFycmF5IGVsZW1lbnQgaXMgb25lIHRpY2suXG5cbkluIHRoZSBuZXh0IG1lc3NhZ2UgaXMgYW4gZXhhbXBsZSBvZiBzdWNoIGEgamF2YXNjcmlwdCBvYmplY3QsIHRoYXQgcmVwcmVzZW50IGEgbWVsb2R5IHdpdGggdGhlIGxlYWQsIHNvbWUgYmFja2dyb3VuZCBhY2NvbXBhbnkgbWVsb2R5IHdpdGggdGhlIGJlbGwsXG5iYWNrZ3JvdW5kIGNob3JkcyB3aXRoIHRoZSBwYWRzLCBhbmQgYSBkcnVtYmVhdCB3aXRoIGtpY2ssIHNuYXJlIGFuZCBoaWhhdC5cbmB9LHtyb2xlOiJ1c2VyIixjb250ZW50OkpTT04uc3RyaW5naWZ5KGUsbnVsbCwxKX0se3JvbGU6InVzZXIiLGNvbnRlbnQ6IlRoZSBuZXh0IG1lc3NhZ2UgaXMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgbXVzaWMgdGhhdCBzaG91bGQgYmUgY3JlYXRlZC4gSWYgdGhlIGRlc2NyaXB0aW9uIGhhcyBmZXcgZGV0YWlscywgdGhlbiB1c2UgZWxlbWVudHMgZnJvbSBwb3B1bGFyIG11c2ljLCBkb24ndCBjb3B5IGZyb20gdGhlIHByZXZpb3VzIG1lc3NhZ2UuIn0se3JvbGU6InVzZXIiLGNvbnRlbnQ6by5kYXRhLmFpcXVlc3Rpb259LHtyb2xlOiJ1c2VyIixjb250ZW50OmBOb3cgY3JlYXRlIGEgamF2YXNjcmlwdCBvYmplY3Qgd2l0aCBtdXNpYyBhY2NvcmRpbmcgdG8gdGhlIGRlc2NyaXB0aW9uIGluIHRoZSBwcmV2aW91cyBtZXNzYWdlLiBUaGUgcmVzdWx0aW5nIG9iamVjdCBzaG91bGQgYmUgZW5jb2RlZCBhcyBhIEpTT04gc3RyaW5nIHRoYXQgY2FuIGJlIHBhcnNlZCBkaXJlY3RseSwgYW5kIG5vIG90aGVyIHN1cnJvdW5kaW5nIGNvbnRleHQuIFRoZSBsZW5ndGggb2YgZWFjaCBhcnJheSBzaG91bGQgYmUgbWF4aW11bSAke259LiBJZiBhbiBhcnJheSBpcyBhbGwgemVyb3MgeW91IGRvbid0IG5lZWQgdG8gaW5jbHVkZSB0aGF0IHByb3BlcnR5LCBidXQgYWx3YXlzIGluY2x1ZGUgdGhlIGJwbSBwcm9wZXJ0eS5gfV0pO3AoSlNPTi5wYXJzZShmKSl9Y2F0Y2goZSl7bT1gRXJyb3I6XG4ke2UubWVzc2FnZT8/IiJ9XG5cbiR7Zj8/IiJ9XG4gICAgICAgICAgICAgICAgYH13aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXJlc3BvbnNlIixhaXJlc3BvbnNlOmYsZXJyb3I6bX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfX0sd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoicmVhZHkifSwiKiIpOwo8L3NjcmlwdD4KCjwvaHRtbD4="
    style={{ width: "400px", height: "100px", border: "none" }}
  ></iframe>
);

const ProgressWrapper = styled.div`
.progress-border {
    height: 50px;
    width: 100%;
}

.progress-text {
    position: absolute;
    right: 0px;
    white-space: nowrap;
    color: #fff;
    padding-top: 6px;
    font-size: 20px;
}

.progress-fill {
    background-color: rgba(0,130,0, 0.5);
    z-index: 100;
    height: 50px;    
    width: 25%;
    animation-name: indeterminate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes indeterminate {
    0% { margin-left: 0%; width: 25%;}
    25% { width: 40%; }
    50% { margin-left: 75%; width: 25%; }
    75% { width: 40%; }
    100% { margin-left: 0%; width: 25%; }
}
`;

const progressIndicator = state.progress ? (
  <ProgressWrapper>
    <div id="main-progress-bar" class="progress-border">
      <div class="progress-text">{state.progressText}</div>
      <div class="progress-fill"></div>
    </div>
  </ProgressWrapper>
) : (
  <button onClick={ask_ai}>Ask ChatGPT</button>
);

const responseArea = state.error ? (
  <div style={{ color: "red", backgroundColor: "#f8f8f8", width: "100%" }}>
    <Markdown text={state.error} />
  </div>
) : (
  ""
);

const secretKeyToggle = state.showSecretKey ? (
  <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input
      type="text"
      value={state.secretKey}
      onChange={(e) => changeSecretKey(e.target.value)}
    ></input>
  </>
) : (
  <button onClick={() => State.update({ showSecretKey: true })}>Show</button>
);

return (
  <>
    <p>
      <b>NOTE:</b> Each request costs about 0.005 NEAR. Make sure the spending
      account below is funded, and you can also get full access to that account
      by using the secret key. Only you have the key to this account, so don't
      loose it.
    </p>

    <textarea
      style={{ width: "100%" }}
      onChange={(e) => State.update({ aiquestion: e.target.value })}
      value={state.aiquestion}
    ></textarea>
    {progressIndicator}
    <br />
    {responseArea}

    {iframe}

    <p></p>
    <p>
      Spending account ID: <pre>{state.accountId}</pre>
    </p>
    <p>Spending account secret key: {secretKeyToggle}</p>
  </>
);

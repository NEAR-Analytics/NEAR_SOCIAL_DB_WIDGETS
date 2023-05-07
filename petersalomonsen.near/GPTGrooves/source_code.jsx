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
    src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgoKPGhlYWQ+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8c3R5bGU+CiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgYm9yZGVyOiBub25lOwogICAgICAgICAgICBib3JkZXI6ICMxMTQgc29saWQgNHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgICAgICAgICAgY29sb3I6IGJsYWNrOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uOmhvdmVyIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KICAgIDwvc3R5bGU+CjwvaGVhZD4KCjxib2R5PgogICAgPGJ1dHRvbiBpZD0icGxheWJ1dHRvbiI+cGxheTwvYnV0dG9uPgogICAgPHA+UmVuZGVyaW5nOiA8c3BhbiBpZD0ibG9hZGVycHJvZ3Jlc3MiPjwvc3Bhbj48L3A+CjwvYm9keT4KPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9e2JlbGw6WzU2LDAsNjgsMCw2NiwwLDY4LDAsNjEsMCw2MywwLDU5LDAsNTYsMF0sYmFzczpbMzIsMSwwLDAsMzIsMSwwLDAsMzAsMSwzMiwwLDMyLDAsMzIsMzBdLGtpY2s6WzEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMF0scGFkMTpbNjMsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLHBhZDI6WzY4LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxwYWQzOls3MSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sbGVhZDpbMCwwLDYzLDAsNjgsMSwxLDAsNzAsMSw3MSwxLDAsMCwwLDBdLHNuYXJlOlswLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsNTBdLGhpaGF0OlszMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDBdLGJwbToxMjB9LGE9NCxuPTQqYSx0PSJtYWlubmV0IixyPW5ldyBuZWFyQXBpLmtleVN0b3Jlcy5Jbk1lbW9yeUtleVN0b3JlO2xldCBzLG8saTtjb25zdCBjPXtrZXlTdG9yZTpyLG5ldHdvcmtJZDp0LG5vZGVVcmw6YGh0dHBzOi8vcnBjLiR7dH0ubmVhci5vcmdgLHdhbGxldFVybDpgaHR0cHM6Ly93YWxsZXQuJHt0fS5uZWFyLm9yZ2AsaGVscGVyVXJsOmBodHRwczovL2hlbHBlci4ke3R9Lm5lYXIub3JnYCxleHBsb3JlclVybDpgaHR0cHM6Ly9leHBsb3Jlci4ke3R9Lm5lYXIub3JnYH07YXN5bmMgZnVuY3Rpb24gbChlKXtjb25zdCBhPW5lYXJBcGkudXRpbHMuS2V5UGFpci5mcm9tU3RyaW5nKGUpLG49QnVmZmVyLmZyb20oYS5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO2F3YWl0IHIuc2V0S2V5KHQsbixhKTtjb25zdCBvPWF3YWl0IG5lYXJBcGkuY29ubmVjdChjKTtyZXR1cm4gcz1hd2FpdCBvLmFjY291bnQobiksbn1hc3luYyBmdW5jdGlvbiBkKGUpe3RyeXt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXByb2dyZXNzIixwcm9ncmVzc21lc3NhZ2U6ImNyZWF0aW5nIHJlcXVlc3QifSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7Y29uc3QgYT1hd2FpdCBhc3luYyBmdW5jdGlvbihlKXtjb25zdCBhPXMuYWNjb3VudElkLG49SlNPTi5zdHJpbmdpZnkoZSksdD1zaGEyNTYobikscj1hd2FpdCBzLmNvbm5lY3Rpb24uc2lnbmVyLmdldFB1YmxpY0tleShzLmFjY291bnRJZCxzLmNvbm5lY3Rpb24ubmV0d29ya0lkKSxvPShhd2FpdCBzLmZpbmRBY2Nlc3NLZXkoKSkuYWNjZXNzS2V5LGk9KytvLm5vbmNlLGM9bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9kZWNvZGUoby5ibG9ja19oYXNoKSxsPW5lYXJBcGkudHJhbnNhY3Rpb25zLmNyZWF0ZVRyYW5zYWN0aW9uKHMuYWNjb3VudElkLHIsImpzaW5ydXN0Lm5lYXIiLGksW25lYXJBcGkudHJhbnNhY3Rpb25zLmZ1bmN0aW9uQ2FsbCgiYXNrX2FpIix7bWVzc2FnZV9oYXNoOnR9LCIzMDAwMDAwMDAwMDAwMCIsNTAwMDAwMDAwMDAwMDAwMDAwMDAwMG4pXSxjKSxbZCxwXT1hd2FpdCBuZWFyQXBpLnRyYW5zYWN0aW9ucy5zaWduVHJhbnNhY3Rpb24obCxzLmNvbm5lY3Rpb24uc2lnbmVyLHMuYWNjb3VudElkLHMuY29ubmVjdGlvbi5uZXR3b3JrSWQpO3JldHVybiBKU09OLnN0cmluZ2lmeSh7c2lnbmVkX3RyYW5zYWN0aW9uOkJ1ZmZlci5mcm9tKHAuZW5jb2RlKCkpLnRvU3RyaW5nKCJiYXNlNjQiKSx0cmFuc2FjdGlvbl9oYXNoOm5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZW5jb2RlKGQpLHNlbmRlcl9hY2NvdW50X2lkOmEsbWVzc2FnZXM6ZX0pfShlKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXByb2dyZXNzIixwcm9ncmVzc21lc3NhZ2U6InNlbmRpbmcgcmVxdWVzdCJ9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTtjb25zdCBuPWF3YWl0IGZldGNoKCJodHRwczovL25lYXItb3BlbmFpLnZlcmNlbC5hcHAvYXBpL29wZW5haXN0cmVhbSIse21ldGhvZDoiUE9TVCIsYm9keTphfSksdD1uLmJvZHkuZ2V0UmVhZGVyKCkscj1bXTtmb3IoOzspe2NvbnN0e2RvbmU6ZSx2YWx1ZTphfT1hd2FpdCB0LnJlYWQoKTtpZihlKWJyZWFrO2NvbnN0IG49KG5ldyBUZXh0RGVjb2RlcikuZGVjb2RlKGEpO3IucHVzaChuKSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXByb2dyZXNzIixwcm9ncmVzc21lc3NhZ2U6bn0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfXJldHVybiByLmpvaW4oIiIpfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpLGBVbmZvcnR1bmF0ZWx5LCB0aGVyZSB3YXMgYW4gZXJyb3I6XG5cblxgXGBcYFxuJHtlLm1lc3NhZ2V9XG5cYFxgXGBcbmB9fWFzeW5jIGZ1bmN0aW9uIHAoZSl7Y29uc3QgdD1uZXcgbmVhckFwaS5Db250cmFjdChzLCJ3ZWJhc3NlbWJseW11c2ljLm5lYXIiLHt2aWV3TWV0aG9kczpbIndlYjRfZ2V0Il19KSxyPWF3YWl0IHQud2ViNF9nZXQoe3JlcXVlc3Q6e3BhdGg6Ii9tdXNpY3dhc21zL2dyb292ZWlzaW50aGVjb2RlLndhc20ifX0pLGM9YXdhaXQgZmV0Y2goYGRhdGE6YXBwbGljYXRpb24vd2FzbTtiYXNlNjQsJHtyLmJvZHl9YCkudGhlbigoZT0+ZS5hcnJheUJ1ZmZlcigpKSksbD1uZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoWygoKT0+e2NvbnN0IGU9ZnVuY3Rpb24oKXtvbm1lc3NhZ2U9YXN5bmMgZT0+e2lmKGUuZGF0YS53YXNtKXtjb25zdCBhPWUuZGF0YS5zYW1wbGVyYXRlLG49V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZS5kYXRhLndhc20se2Vudmlyb25tZW50OntTQU1QTEVSQVRFOmF9fSksdD0oYXdhaXQgbikuaW5zdGFuY2UuZXhwb3J0cyxyPXQuYWxsb2NhdGVQYXR0ZXJucyhlLmRhdGEucGF0dGVybnMubGVuZ3RoLzE2KTtuZXcgVWludDhBcnJheSh0Lm1lbW9yeS5idWZmZXIscixlLmRhdGEucGF0dGVybnMubGVuZ3RoKS5zZXQoZS5kYXRhLnBhdHRlcm5zKTtjb25zdCBzPWUuZGF0YS5wYXR0ZXJuTGVuZ3RoLzE2LG89dC5hbGxvY2F0ZUluc3RydW1lbnRQYXR0ZXJuTGlzdChzLGUuZGF0YS5udW1JbnN0cnVtZW50cyksaT1uZXcgVWludDhBcnJheSh0Lm1lbW9yeS5idWZmZXIsbyxlLmRhdGEubnVtSW5zdHJ1bWVudHMqcyk7Zm9yKGxldCBlPTA7ZTxpLmxlbmd0aDtlKyspaVtlXT1lO2NvbnNvbGUubG9nKGkpLHQuc2V0QlBNKGUuZGF0YS5icG0pO2NvbnN0IGM9MTI4LGw9ZS5kYXRhLnNvbmdkdXJhdGlvbiphLzFlMyxkPXQuYWxsb2NhdGVTYW1wbGVCdWZmZXI/dC5hbGxvY2F0ZVNhbXBsZUJ1ZmZlcihjKTp0LnNhbXBsZWJ1ZmZlcixwPW5ldyBGbG9hdDMyQXJyYXkodC5tZW1vcnkuYnVmZmVyLGQsYyksdT1uZXcgRmxvYXQzMkFycmF5KHQubWVtb3J5LmJ1ZmZlcixkKzQqYyxjKTtsZXQgbT0wO2NvbnN0IGc9bmV3IEFycmF5QnVmZmVyKDQqbCksZj1uZXcgRGF0YVZpZXcoZyksaD1uZXcgQXJyYXlCdWZmZXIoNCpsKSx3PW5ldyBEYXRhVmlldyhoKSx5PTE9PT1uZXcgVWludDhBcnJheShuZXcgVWludDE2QXJyYXkoWzFdKS5idWZmZXIpWzBdO2Zvcig7bTxsOyl7bnVsbCE9dC5wbGF5RXZlbnRzQW5kRmlsbFNhbXBsZUJ1ZmZlcj90LnBsYXlFdmVudHNBbmRGaWxsU2FtcGxlQnVmZmVyKCk6dC5maWxsU2FtcGxlQnVmZmVyKCk7Zm9yKGxldCBlPTA7ZTxjJiZtPGw7ZSsrKWYuc2V0RmxvYXQzMig0Km0scFtlXSx5KSx3LnNldEZsb2F0MzIoNCptLHVbZV0seSksbSsrO3Bvc3RNZXNzYWdlKHtwcm9ncmVzczptL2x9KX1wb3N0TWVzc2FnZSh7bGVmdGJ1ZmZlcjpnLHJpZ2h0YnVmZmVyOmh9LFtnLGhdKX19fS50b1N0cmluZygpO3JldHVybiBlLnN1YnN0cmluZyhlLmluZGV4T2YoInsiKSsxLGUubGFzdEluZGV4T2YoIn0iKSl9KSgpXSx7dHlwZToidGV4dC9qYXZhc2NyaXB0In0pKSksZD1lLmJwbSxwPTQ0MTAwLHU9NmU0KmEvZCxtPXUqcC8xZTMsZz1bImJlbGwiLCJiYXNzIiwicGFkMSIsInBhZDIiLCJwYWQzIiwia2ljayIsInNuYXJlIiwibGVhZCIsImhpaGF0Il0sZj1uZXcgQXJyYXkoZy5sZW5ndGgqbik7Zi5maWxsKDApLGcuZm9yRWFjaCgoKGEsdCk9PntlW2FdJiZlW2FdLmZvckVhY2goKChlLGEpPT5mW3QqbithXT1lKSl9KSk7Y29uc3R7bGVmdGJ1ZmZlcjpoLHJpZ2h0YnVmZmVyOnd9PWF3YWl0IG5ldyBQcm9taXNlKChhc3luYyBlPT57bC5wb3N0TWVzc2FnZSh7d2FzbTpjLHNhbXBsZXJhdGU6cCxzb25nZHVyYXRpb246dSxicG06ZCxwYXR0ZXJuTGVuZ3RoOm4scGF0dGVybnM6ZixudW1JbnN0cnVtZW50czpnLmxlbmd0aH0pLGwub25tZXNzYWdlPWE9PnthLmRhdGEubGVmdGJ1ZmZlcj9lKGEuZGF0YSk6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI2xvYWRlcnByb2dyZXNzIikuaW5uZXJIVE1MPSgxMDAqYS5kYXRhLnByb2dyZXNzKS50b0ZpeGVkKDIpKyIlIn19KSkseT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicGxheWJ1dHRvbiIpLGI9KCk9Pntjb25zdCBlPW8uY3JlYXRlQnVmZmVyKDIsbSxwKTtlLmdldENoYW5uZWxEYXRhKDApLnNldChuZXcgRmxvYXQzMkFycmF5KGgpKSxlLmdldENoYW5uZWxEYXRhKDEpLnNldChuZXcgRmxvYXQzMkFycmF5KHcpKSxpPW8uY3JlYXRlQnVmZmVyU291cmNlKCksaS5idWZmZXI9ZSxpLmNvbm5lY3Qoby5kZXN0aW5hdGlvbiksaS5sb29wPSEwLGkuc3RhcnQoMCl9O28mJmkmJihpLnN0b3AoKSxpLmRpc2Nvbm5lY3QoKSxpPW51bGwsYigpKSx5Lm9uY2xpY2s9KCk9PntpZihvKXJldHVybiBvLmNsb3NlKCksdm9pZChvPW51bGwpO289bmV3IEF1ZGlvQ29udGV4dCxiKCl9fXdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgbz0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj1vLm9yaWdpbixjb25zb2xlLmxvZygiaWZyYW1lIGdvdCBtZXNzYWdlIixvLmRhdGEpLG8uZGF0YS5jb21tYW5kKXtjYXNlImNyZWF0ZWFjY291bnQiOmNvbnN0e3NlY3JldEtleTppLGFjY291bnRJZDp1fT1hd2FpdCBhc3luYyBmdW5jdGlvbigpe2NvbnN0IGU9bmVhckFwaS51dGlscy5LZXlQYWlyRWQyNTUxOS5mcm9tUmFuZG9tKCksYT1CdWZmZXIuZnJvbShlLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7YXdhaXQgci5zZXRLZXkodCxhLGUpO2NvbnN0IG49YXdhaXQgbmVhckFwaS5jb25uZWN0KGMpO3JldHVybiBzPWF3YWl0IG4uYWNjb3VudChhKSx7c2VjcmV0S2V5OmUuc2VjcmV0S2V5LGFjY291bnRJZDphfX0oKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmksYWNjb3VudElkOnV9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlInVzZWFjY291bnQiOndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InVzaW5nYWNjb3VudCIsYWNjb3VudElkOmF3YWl0IGwoby5kYXRhLnNlY3JldEtleSl9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKSxwKGUpO2JyZWFrO2Nhc2UiYXNrX2FpIjpsZXQgbSxnO3RyeXtnPWF3YWl0IGQoW3tyb2xlOiJ1c2VyIixjb250ZW50OmBIZXJlJ3MgYSBkZXNjcmlwdGlvbiBvZiBhIEphdmFTY3JpcHQgb2JqZWN0IGNvbnRhaW5pbmcgYSBtdXNpY2FsIHBhdHRlcm4gd2l0aCB0aGUgZm9sbG93aW5nIGluc3RydW1lbnRzIGFuZCBzcGVjaWZpY2F0aW9uczpcbmJlbGw6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyBhIG1lbG9keSwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbmxlYWQ6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyBhIG1lbG9keSwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbmJhc3M6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyBhIGJhc2VsaW5lLCAwIGZvciBzaWxlbmNlLCAxIGZvciBob2xkaW5nIGEgbm90ZVxucGFkMTogYW4gYXJyYXkgb2YgTUlESSBub3RlIG51bWJlcnMgcmVwcmVzZW50aW5nIHRoZSBib3R0b20gbm90ZSBpbiBhIGJhY2tncm91bmQgcGFkIGluc3RydW1lbnQgY2hvcmQsIDAgZm9yIHNpbGVuY2UsIDEgZm9yIGhvbGRpbmcgYSBub3RlXG5wYWQyOiBhbiBhcnJheSBvZiBNSURJIG5vdGUgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIG1pZGRsZSBub3RlIGluIGEgYmFja2dyb3VuZCBwYWQgaW5zdHJ1bWVudCBjaG9yZCwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbnBhZDM6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgdG9wIG5vdGUgaW4gYSBiYWNrZ3JvdW5kIHBhZCBpbnN0cnVtZW50IGNob3JkLCAwIGZvciBzaWxlbmNlLCAxIGZvciBob2xkaW5nIGEgbm90ZVxua2ljazogYW4gYXJyYXkgb2YgaW50ZWdlcnMgcmVwcmVzZW50aW5nIHZlbG9jaXRpZXMgZm9yIGEgYmFzZSBkcnVtIHNvdW5kXG5zbmFyZTogYW4gYXJyYXkgb2YgaW50ZWdlcnMgcmVwcmVzZW50aW5nIHZlbG9jaXRpZXMgZm9yIGEgc25hcmUgZHJ1bSBzb3VuZFxuaGloYXQ6IGFuIGFycmF5IG9mIGludGVnZXJzIHJlcHJlc2VudGluZyB2ZWxvY2l0aWVzIGZvciBhIGhpaGF0IHNvdW5kXG5icG06IGFuIGludGVnZXIgcmVwcmVzZW50aW5nIHRlbXBvIGluIGJlYXRzIHBlciBtaW51dGUuIEZyb20gNjAgd2hpY2ggaXMgdmVyeSBzbG93IHRvIDE1MCB3aGljaCBpcyB2ZXJ5IGZhc3RcblxuQmUgYXdhcmUgb2YgdGhlIHZhbHVlIDEgd2hpY2ggaXMgdXNlZCBmb3IgaG9sZGluZyBhIG5vdGUgdG8gbGFzdCBsb25nZXIgdGhhbiBqdXN0IG9uZSB0aWNrLlxuXG5UaGUgbGVuZ3RoIG9mIGVhY2ggYXJyYXkgaXMgbWF4aW11bSAke259IHdoaWNoIGNvcnJlc3BvbmRzIHRvICR7YX0gYmVhdHMuIEVhY2ggYmVhdCBpcyA0IHRpY2tzLiBPbmUgYXJyYXkgZWxlbWVudCBpcyBvbmUgdGljay5cblxuSW4gdGhlIG5leHQgbWVzc2FnZSBpcyBhbiBleGFtcGxlIG9mIHN1Y2ggYSBqYXZhc2NyaXB0IG9iamVjdCwgdGhhdCByZXByZXNlbnQgYSBtZWxvZHkgd2l0aCB0aGUgbGVhZCwgc29tZSBiYWNrZ3JvdW5kIGFjY29tcGFueSBtZWxvZHkgd2l0aCB0aGUgYmVsbCxcbmJhY2tncm91bmQgY2hvcmRzIHdpdGggdGhlIHBhZHMsIGFuZCBhIGRydW1iZWF0IHdpdGgga2ljaywgc25hcmUgYW5kIGhpaGF0LlxuYH0se3JvbGU6InVzZXIiLGNvbnRlbnQ6SlNPTi5zdHJpbmdpZnkoZSxudWxsLDEpfSx7cm9sZToidXNlciIsY29udGVudDoiVGhlIG5leHQgbWVzc2FnZSBpcyBhIGRlc2NyaXB0aW9uIG9mIHRoZSBtdXNpYyB0aGF0IHNob3VsZCBiZSBjcmVhdGVkLiBJZiB0aGUgZGVzY3JpcHRpb24gaGFzIGZldyBkZXRhaWxzLCB0aGVuIHVzZSBlbGVtZW50cyBmcm9tIHBvcHVsYXIgbXVzaWMsIGRvbid0IGNvcHkgZnJvbSB0aGUgcHJldmlvdXMgbWVzc2FnZS4ifSx7cm9sZToidXNlciIsY29udGVudDpvLmRhdGEuYWlxdWVzdGlvbn0se3JvbGU6InVzZXIiLGNvbnRlbnQ6YE5vdyBjcmVhdGUgYSBqYXZhc2NyaXB0IG9iamVjdCB3aXRoIG11c2ljIGFjY29yZGluZyB0byB0aGUgZGVzY3JpcHRpb24gaW4gdGhlIHByZXZpb3VzIG1lc3NhZ2UuIFRoZSByZXN1bHRpbmcgb2JqZWN0IHNob3VsZCBiZSBlbmNvZGVkIGFzIGEgSlNPTiBzdHJpbmcgdGhhdCBjYW4gYmUgcGFyc2VkIGRpcmVjdGx5LCBhbmQgbm8gb3RoZXIgc3Vycm91bmRpbmcgY29udGV4dC4gVGhlIGxlbmd0aCBvZiBlYWNoIGFycmF5IHNob3VsZCBiZSBtYXhpbXVtICR7bn0uIElmIGFuIGFycmF5IGlzIGFsbCB6ZXJvcyB5b3UgZG9uJ3QgbmVlZCB0byBpbmNsdWRlIHRoYXQgcHJvcGVydHkuYH1dKTtwKEpTT04ucGFyc2UoZykpfWNhdGNoKGUpe209YEVycm9yOiAke2UubWVzc2FnZX1cblxuJHtnfVxuICAgICAgICAgICAgICAgIGB9d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTpnLGVycm9yOm19LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKX19LHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InJlYWR5In0sIioiKTsKPC9zY3JpcHQ+Cgo8L2h0bWw+"
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

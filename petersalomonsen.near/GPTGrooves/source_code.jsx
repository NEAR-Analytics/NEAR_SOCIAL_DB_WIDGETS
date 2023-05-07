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
      State.update({ airesponse: msg.airesponse, progress: false });
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
    src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgoKPGhlYWQ+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8c3R5bGU+CiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgYm9yZGVyOiBub25lOwogICAgICAgICAgICBib3JkZXI6ICMxMTQgc29saWQgNHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgICAgICAgICAgY29sb3I6IGJsYWNrOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uOmhvdmVyIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KICAgIDwvc3R5bGU+CjwvaGVhZD4KCjxib2R5PgogICAgPGJ1dHRvbiBpZD0icGxheWJ1dHRvbiI+cGxheTwvYnV0dG9uPgogICAgPHA+UmVuZGVyaW5nOiA8c3BhbiBpZD0ibG9hZGVycHJvZ3Jlc3MiPjwvc3Bhbj48L3A+CjwvYm9keT4KPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9e2JlbGw6WzU2LDAsNjgsMCw2NiwwLDY4LDAsNjEsMCw2MywwLDU5LDAsNTYsMCw1NCwwLDY2LDAsNjQsMCw2NiwwLDU5LDAsNjEsMCw1OCwwLDU0LDAsNjEsMCw3MywwLDcxLDAsNzMsMCw2NiwwLDY4LDAsNTQsMCw2MSwwLDU5LDAsNzEsMCw3MCwwLDcxLDAsNjYsMCw3MSwwLDY2LDAsNTksMF0sYmFzczpbMzIsMSwwLDAsMzIsMSwwLDAsMzAsMSwzMiwwLDMyLDAsMzIsMzAsMzAsMSwwLDAsMzAsMSwwLDAsMjgsMSwzMCwwLDMwLDAsMzAsMjgsMzcsMSwwLDAsMzcsMSwwLDAsMzUsMSwzNywwLDM3LDAsMzcsMzUsMzUsMSwwLDAsMzUsMSwwLDAsMzIsMSwzNSwwLDM1LDAsMzUsMzJdLGtpY2s6WzEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDUwLDEyMCwwLDEwMCwwLDEyMCwwLDAsMF0scGFkMTpbNjMsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsNjEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsNjQsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsNjMsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLHBhZDI6WzY4LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDY2LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDY4LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDY2LDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxwYWQzOls3MSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSw3MCwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSw3MywxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSw3MSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sbGVhZDpbMCwwLDYzLDAsNjgsMSwxLDAsNzAsMSw3MSwxLDAsMCwwLDAsMCwwLDYxLDAsNjYsMSwxLDAsNjgsMSw3MCwxLDAsMCwwLDAsMCwwLDY4LDAsNzMsMSwxLDAsNzUsMSw3NiwxLDAsMCwwLDAsNzUsMSwwLDAsNzUsMSwxLDAsNzMsMSw3NSwxLDcxLDEsNjYsMV0sc25hcmU6WzAsMCwwLDAsMTAwLDAsMCwwLDAsMCwwLDAsMTAwLDAsMCwwLDAsMCwwLDAsMTAwLDAsMCwwLDAsMCwwLDAsMTAwLDAsMCwwLDAsMCwwLDAsMTAwLDAsMCwwLDAsMCwwLDAsMTAwLDAsMCwwLDAsMCwwLDAsMTAwLDAsMCwwLDAsMCw4MCwwLDEwMCwwLDAsNTBdLGhpaGF0OlszMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDAsMzAsMCwzMCwwLDYwLDAsMzAsMCwzMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDAsMzAsMCwzMCwwLDYwLDAsMzAsMCwzMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCw0MCw2MCwzMF0sYnBtOjEyMH0sYT0ibWFpbm5ldCIsbj1uZXcgbmVhckFwaS5rZXlTdG9yZXMuSW5NZW1vcnlLZXlTdG9yZTtsZXQgdCxyLHM7Y29uc3Qgbz17a2V5U3RvcmU6bixuZXR3b3JrSWQ6YSxub2RlVXJsOmBodHRwczovL3JwYy4ke2F9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7YX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHthfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHthfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIGkoZSl7Y29uc3Qgcj1uZWFyQXBpLnV0aWxzLktleVBhaXIuZnJvbVN0cmluZyhlKSxzPUJ1ZmZlci5mcm9tKHIucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCBuLnNldEtleShhLHMscik7Y29uc3QgaT1hd2FpdCBuZWFyQXBpLmNvbm5lY3Qobyk7cmV0dXJuIHQ9YXdhaXQgaS5hY2NvdW50KHMpLHN9YXN5bmMgZnVuY3Rpb24gYyhlKXt0cnl7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlwcm9ncmVzcyIscHJvZ3Jlc3NtZXNzYWdlOiJjcmVhdGluZyByZXF1ZXN0In0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2NvbnN0IGE9YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7Y29uc3QgYT10LmFjY291bnRJZCxuPUpTT04uc3RyaW5naWZ5KGUpLHI9c2hhMjU2KG4pLHM9YXdhaXQgdC5jb25uZWN0aW9uLnNpZ25lci5nZXRQdWJsaWNLZXkodC5hY2NvdW50SWQsdC5jb25uZWN0aW9uLm5ldHdvcmtJZCksbz0oYXdhaXQgdC5maW5kQWNjZXNzS2V5KCkpLmFjY2Vzc0tleSxpPSsrby5ub25jZSxjPW5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZGVjb2RlKG8uYmxvY2tfaGFzaCksbD1uZWFyQXBpLnRyYW5zYWN0aW9ucy5jcmVhdGVUcmFuc2FjdGlvbih0LmFjY291bnRJZCxzLCJqc2lucnVzdC5uZWFyIixpLFtuZWFyQXBpLnRyYW5zYWN0aW9ucy5mdW5jdGlvbkNhbGwoImFza19haSIse21lc3NhZ2VfaGFzaDpyfSwiMzAwMDAwMDAwMDAwMDAiLDUwMDAwMDAwMDAwMDAwMDAwMDAwMDBuKV0sYyksW2QscF09YXdhaXQgbmVhckFwaS50cmFuc2FjdGlvbnMuc2lnblRyYW5zYWN0aW9uKGwsdC5jb25uZWN0aW9uLnNpZ25lcix0LmFjY291bnRJZCx0LmNvbm5lY3Rpb24ubmV0d29ya0lkKTtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe3NpZ25lZF90cmFuc2FjdGlvbjpCdWZmZXIuZnJvbShwLmVuY29kZSgpKS50b1N0cmluZygiYmFzZTY0IiksdHJhbnNhY3Rpb25faGFzaDpuZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2VuY29kZShkKSxzZW5kZXJfYWNjb3VudF9pZDphLG1lc3NhZ2VzOmV9KX0oZSk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlwcm9ncmVzcyIscHJvZ3Jlc3NtZXNzYWdlOiJzZW5kaW5nIHJlcXVlc3QifSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7Y29uc3Qgbj1hd2FpdCBmZXRjaCgiaHR0cHM6Ly9uZWFyLW9wZW5haS1naXQtYm9zd2lkZ2V0LWdyb292ZW1ha2VyLXBldGVyc2Fsb21vbnNlbi52ZXJjZWwuYXBwL2FwaS9vcGVuYWlzdHJlYW0iLHttZXRob2Q6IlBPU1QiLGJvZHk6YX0pLHI9bi5ib2R5LmdldFJlYWRlcigpLHM9W107Zm9yKDs7KXtjb25zdHtkb25lOmUsdmFsdWU6YX09YXdhaXQgci5yZWFkKCk7aWYoZSlicmVhaztjb25zdCBuPShuZXcgVGV4dERlY29kZXIpLmRlY29kZShhKTtzLnB1c2gobiksd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlwcm9ncmVzcyIscHJvZ3Jlc3NtZXNzYWdlOm59LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKX1yZXR1cm4gcy5qb2luKCIiKX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5sb2coZS5tZXNzYWdlKSxgVW5mb3J0dW5hdGVseSwgdGhlcmUgd2FzIGFuIGVycm9yOlxuXG5cYFxgXGBcbiR7ZS5tZXNzYWdlfVxuXGBcYFxgXG5gfX1hc3luYyBmdW5jdGlvbiBsKGUpe2NvbnN0IGE9bmV3IG5lYXJBcGkuQ29udHJhY3QodCwid2ViYXNzZW1ibHltdXNpYy5uZWFyIix7dmlld01ldGhvZHM6WyJ3ZWI0X2dldCJdfSksbj1hd2FpdCBhLndlYjRfZ2V0KHtyZXF1ZXN0OntwYXRoOiIvbXVzaWN3YXNtcy9ncm9vdmVpc2ludGhlY29kZS53YXNtIn19KSxvPWF3YWl0IGZldGNoKGBkYXRhOmFwcGxpY2F0aW9uL3dhc207YmFzZTY0LCR7bi5ib2R5fWApLnRoZW4oKGU9PmUuYXJyYXlCdWZmZXIoKSkpLGk9bmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFsoKCk9Pntjb25zdCBlPWZ1bmN0aW9uKCl7b25tZXNzYWdlPWFzeW5jIGU9PntpZihlLmRhdGEud2FzbSl7Y29uc3QgYT1lLmRhdGEuc2FtcGxlcmF0ZSxuPVdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGUuZGF0YS53YXNtLHtlbnZpcm9ubWVudDp7U0FNUExFUkFURTphfX0pLHQ9KGF3YWl0IG4pLmluc3RhbmNlLmV4cG9ydHMscj10LmFsbG9jYXRlUGF0dGVybnMoZS5kYXRhLnBhdHRlcm5zLmxlbmd0aC8xNik7bmV3IFVpbnQ4QXJyYXkodC5tZW1vcnkuYnVmZmVyLHIsZS5kYXRhLnBhdHRlcm5zLmxlbmd0aCkuc2V0KGUuZGF0YS5wYXR0ZXJucyk7Y29uc3Qgcz1lLmRhdGEucGF0dGVybkxlbmd0aC8xNixvPXQuYWxsb2NhdGVJbnN0cnVtZW50UGF0dGVybkxpc3QocyxlLmRhdGEubnVtSW5zdHJ1bWVudHMpLGk9bmV3IFVpbnQ4QXJyYXkodC5tZW1vcnkuYnVmZmVyLG8sZS5kYXRhLm51bUluc3RydW1lbnRzKnMpO2ZvcihsZXQgZT0wO2U8aS5sZW5ndGg7ZSsrKWlbZV09ZTtjb25zb2xlLmxvZyhpKSx0LnNldEJQTShlLmRhdGEuYnBtKTtjb25zdCBjPTEyOCxsPWUuZGF0YS5zb25nZHVyYXRpb24qYS8xZTMsZD10LmFsbG9jYXRlU2FtcGxlQnVmZmVyP3QuYWxsb2NhdGVTYW1wbGVCdWZmZXIoYyk6dC5zYW1wbGVidWZmZXIscD1uZXcgRmxvYXQzMkFycmF5KHQubWVtb3J5LmJ1ZmZlcixkLGMpLHU9bmV3IEZsb2F0MzJBcnJheSh0Lm1lbW9yeS5idWZmZXIsZCs0KmMsYyk7bGV0IG09MDtjb25zdCBnPW5ldyBBcnJheUJ1ZmZlcig0KmwpLGY9bmV3IERhdGFWaWV3KGcpLGg9bmV3IEFycmF5QnVmZmVyKDQqbCksdz1uZXcgRGF0YVZpZXcoaCksYj0xPT09bmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQxNkFycmF5KFsxXSkuYnVmZmVyKVswXTtmb3IoO208bDspe251bGwhPXQucGxheUV2ZW50c0FuZEZpbGxTYW1wbGVCdWZmZXI/dC5wbGF5RXZlbnRzQW5kRmlsbFNhbXBsZUJ1ZmZlcigpOnQuZmlsbFNhbXBsZUJ1ZmZlcigpO2ZvcihsZXQgZT0wO2U8YyYmbTxsO2UrKylmLnNldEZsb2F0MzIoNCptLHBbZV0sYiksdy5zZXRGbG9hdDMyKDQqbSx1W2VdLGIpLG0rKztwb3N0TWVzc2FnZSh7cHJvZ3Jlc3M6bS9sfSl9cG9zdE1lc3NhZ2Uoe2xlZnRidWZmZXI6ZyxyaWdodGJ1ZmZlcjpofSxbZyxoXSl9fX0udG9TdHJpbmcoKTtyZXR1cm4gZS5zdWJzdHJpbmcoZS5pbmRleE9mKCJ7IikrMSxlLmxhc3RJbmRleE9mKCJ9IikpfSkoKV0se3R5cGU6InRleHQvamF2YXNjcmlwdCJ9KSkpLGM9ZS5icG0sbD00NDEwMCxkPTk2ZTQvYyxwPWQqbC8xZTMsdT1bImJlbGwiLCJiYXNzIiwicGFkMSIsInBhZDIiLCJwYWQzIiwia2ljayIsInNuYXJlIiwibGVhZCIsImhpaGF0Il0sbT1uZXcgQXJyYXkoNjQqdS5sZW5ndGgpO20uZmlsbCgwKSx1LmZvckVhY2goKChhLG4pPT57ZVthXSYmZVthXS5mb3JFYWNoKCgoZSxhKT0+bVs2NCpuK2FdPWUpKX0pKTtjb25zdHtsZWZ0YnVmZmVyOmcscmlnaHRidWZmZXI6Zn09YXdhaXQgbmV3IFByb21pc2UoKGFzeW5jIGU9PntpLnBvc3RNZXNzYWdlKHt3YXNtOm8sc2FtcGxlcmF0ZTpsLHNvbmdkdXJhdGlvbjpkLGJwbTpjLHBhdHRlcm5MZW5ndGg6NjQscGF0dGVybnM6bSxudW1JbnN0cnVtZW50czp1Lmxlbmd0aH0pLGkub25tZXNzYWdlPWE9PnthLmRhdGEubGVmdGJ1ZmZlcj9lKGEuZGF0YSk6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI2xvYWRlcnByb2dyZXNzIikuaW5uZXJIVE1MPSgxMDAqYS5kYXRhLnByb2dyZXNzKS50b0ZpeGVkKDIpKyIlIn19KSksaD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicGxheWJ1dHRvbiIpLHc9KCk9Pntjb25zdCBlPXIuY3JlYXRlQnVmZmVyKDIscCxsKTtlLmdldENoYW5uZWxEYXRhKDApLnNldChuZXcgRmxvYXQzMkFycmF5KGcpKSxlLmdldENoYW5uZWxEYXRhKDEpLnNldChuZXcgRmxvYXQzMkFycmF5KGYpKSxzPXIuY3JlYXRlQnVmZmVyU291cmNlKCkscy5idWZmZXI9ZSxzLmNvbm5lY3Qoci5kZXN0aW5hdGlvbikscy5sb29wPSEwLHMuc3RhcnQoMCl9O3ImJnMmJihzLnN0b3AoKSxzLmRpc2Nvbm5lY3QoKSxzPW51bGwsdygpKSxoLm9uY2xpY2s9KCk9PntpZihyKXJldHVybiByLmNsb3NlKCksdm9pZChyPW51bGwpO3I9bmV3IEF1ZGlvQ29udGV4dCx3KCl9fXdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgcj0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj1yLm9yaWdpbixjb25zb2xlLmxvZygiaWZyYW1lIGdvdCBtZXNzYWdlIixyLmRhdGEpLHIuZGF0YS5jb21tYW5kKXtjYXNlImNyZWF0ZWFjY291bnQiOmNvbnN0e3NlY3JldEtleTpzLGFjY291bnRJZDpkfT1hd2FpdCBhc3luYyBmdW5jdGlvbigpe2NvbnN0IGU9bmVhckFwaS51dGlscy5LZXlQYWlyRWQyNTUxOS5mcm9tUmFuZG9tKCkscj1CdWZmZXIuZnJvbShlLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7YXdhaXQgbi5zZXRLZXkoYSxyLGUpO2NvbnN0IHM9YXdhaXQgbmVhckFwaS5jb25uZWN0KG8pO3JldHVybiB0PWF3YWl0IHMuYWNjb3VudChyKSx7c2VjcmV0S2V5OmUuc2VjcmV0S2V5LGFjY291bnRJZDpyfX0oKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OnMsYWNjb3VudElkOmR9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlInVzZWFjY291bnQiOndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InVzaW5nYWNjb3VudCIsYWNjb3VudElkOmF3YWl0IGkoci5kYXRhLnNlY3JldEtleSl9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKSxsKGUpO2JyZWFrO2Nhc2UiYXNrX2FpIjpsZXQgcCx1O3RyeXt1PWF3YWl0IGMoW3tyb2xlOiJ1c2VyIixjb250ZW50OiJIZXJlJ3MgYSBkZXNjcmlwdGlvbiBvZiBhIEphdmFTY3JpcHQgb2JqZWN0IGNvbnRhaW5pbmcgYSBtdXNpY2FsIHBhdHRlcm4gd2l0aCB0aGUgZm9sbG93aW5nIGluc3RydW1lbnRzIGFuZCBzcGVjaWZpY2F0aW9uczpcbmJlbGw6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyBhIG1lbG9keSwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbmxlYWQ6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyBhIG1lbG9keSwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbmJhc3M6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyBhIGJhc2VsaW5lLCAwIGZvciBzaWxlbmNlLCAxIGZvciBob2xkaW5nIGEgbm90ZVxucGFkMTogYW4gYXJyYXkgb2YgTUlESSBub3RlIG51bWJlcnMgcmVwcmVzZW50aW5nIHRoZSBib3R0b20gbm90ZSBpbiBhIGJhY2tncm91bmQgcGFkIGluc3RydW1lbnQgY2hvcmQsIDAgZm9yIHNpbGVuY2UsIDEgZm9yIGhvbGRpbmcgYSBub3RlXG5wYWQyOiBhbiBhcnJheSBvZiBNSURJIG5vdGUgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIG1pZGRsZSBub3RlIGluIGEgYmFja2dyb3VuZCBwYWQgaW5zdHJ1bWVudCBjaG9yZCwgMCBmb3Igc2lsZW5jZSwgMSBmb3IgaG9sZGluZyBhIG5vdGVcbnBhZDM6IGFuIGFycmF5IG9mIE1JREkgbm90ZSBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgdG9wIG5vdGUgaW4gYSBiYWNrZ3JvdW5kIHBhZCBpbnN0cnVtZW50IGNob3JkLCAwIGZvciBzaWxlbmNlLCAxIGZvciBob2xkaW5nIGEgbm90ZVxua2ljazogYW4gYXJyYXkgb2YgaW50ZWdlcnMgcmVwcmVzZW50aW5nIHZlbG9jaXRpZXMgZm9yIGEgYmFzZSBkcnVtIHNvdW5kXG5zbmFyZTogYW4gYXJyYXkgb2YgaW50ZWdlcnMgcmVwcmVzZW50aW5nIHZlbG9jaXRpZXMgZm9yIGEgc25hcmUgZHJ1bSBzb3VuZFxuaGloYXQ6IGFuIGFycmF5IG9mIGludGVnZXJzIHJlcHJlc2VudGluZyB2ZWxvY2l0aWVzIGZvciBhIGhpaGF0IHNvdW5kXG5icG06IGFuIGludGVnZXIgcmVwcmVzZW50aW5nIHRlbXBvIGluIGJlYXRzIHBlciBtaW51dGUuIEZyb20gNjAgd2hpY2ggaXMgdmVyeSBzbG93IHRvIDE1MCB3aGljaCBpcyB2ZXJ5IGZhc3RcblxuQmUgYXdhcmUgb2YgdGhlIHZhbHVlIDEgd2hpY2ggaXMgdXNlZCBmb3IgaG9sZGluZyBhIG5vdGUgdG8gbGFzdCBsb25nZXIgdGhhbiBqdXN0IG9uZSB0aWNrLlxuXG5UaGUgbGVuZ3RoIG9mIGVhY2ggYXJyYXkgaXMgbWF4aW11bSA2NCB3aGljaCBjb3JyZXNwb25kcyB0byAxNiBiZWF0cy4gRWFjaCBiZWF0IGlzIDQgdGlja3MuIE9uZSBhcnJheSBlbGVtZW50IGlzIG9uZSB0aWNrLlxuXG5JbiB0aGUgbmV4dCBtZXNzYWdlIGlzIGFuIGV4YW1wbGUgb2Ygc3VjaCBhIGphdmFzY3JpcHQgb2JqZWN0LCB0aGF0IHJlcHJlc2VudCBhIG1lbG9keSB3aXRoIHRoZSBsZWFkLCBzb21lIGJhY2tncm91bmQgYWNjb21wYW55IG1lbG9keSB3aXRoIHRoZSBiZWxsLFxuYmFja2dyb3VuZCBjaG9yZHMgd2l0aCB0aGUgcGFkcywgYW5kIGEgZHJ1bWJlYXQgd2l0aCBraWNrLCBzbmFyZSBhbmQgaGloYXQuXG4ifSx7cm9sZToidXNlciIsY29udGVudDpKU09OLnN0cmluZ2lmeShlLG51bGwsMSl9LHtyb2xlOiJ1c2VyIixjb250ZW50OiJUaGUgbmV4dCBtZXNzYWdlIGlzIGEgZGVzY3JpcHRpb24gb2YgdGhlIG11c2ljIHRoYXQgc2hvdWxkIGJlIGNyZWF0ZWQuIElmIHRoZSBkZXNjcmlwdGlvbiBoYXMgZmV3IGRldGFpbHMsIHRoZW4gdXNlIGVsZW1lbnRzIGZyb20gcG9wdWxhciBtdXNpYywgZG9uJ3QgY29weSBmcm9tIHRoZSBwcmV2aW91cyBtZXNzYWdlLiJ9LHtyb2xlOiJ1c2VyIixjb250ZW50OnIuZGF0YS5haXF1ZXN0aW9ufSx7cm9sZToidXNlciIsY29udGVudDoiTm93IGNyZWF0ZSBhIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggbXVzaWMgYWNjb3JkaW5nIHRvIHRoZSBkZXNjcmlwdGlvbiBpbiB0aGUgcHJldmlvdXMgbWVzc2FnZS4gVGhlIHJlc3VsdGluZyBvYmplY3Qgc2hvdWxkIGJlIGVuY29kZWQgYXMgYSBKU09OIHN0cmluZyB0aGF0IGNhbiBiZSBwYXJzZWQgZGlyZWN0bHksIGFuZCBubyBvdGhlciBzdXJyb3VuZGluZyBjb250ZXh0LiBUaGUgbGVuZ3RoIG9mIGVhY2ggYXJyYXkgc2hvdWxkIGJlIG1heGltdW0gNjQuIn1dKTtsKEpTT04ucGFyc2UodSkpfWNhdGNoKGUpe3A9YEVycm9yOiAke2UubWVzc2FnZX1cblxuJHt1fVxuICAgICAgICAgICAgICAgIGB9d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTp1LGVycm9yOnB9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKX19LHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InJlYWR5In0sIioiKTsKPC9zY3JpcHQ+Cgo8L2h0bWw+"
    style={{ width: "400px", height: "200px", border: "none" }}
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

const responseArea = (
  <div
    style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f5f5f5" }}
  >
    <Markdown text={state.airesponse} />
  </div>
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
    {responseArea}

    {iframe}

    <p>
      <br />
    </p>

    <p></p>
    <p>
      Spending account ID: <pre>{state.accountId}</pre>
    </p>
    <p>Spending account secret key: {secretKeyToggle}</p>
  </>
);

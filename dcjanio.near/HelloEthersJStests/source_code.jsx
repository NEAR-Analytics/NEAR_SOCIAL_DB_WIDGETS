<head>
  <title>Ether.js Form</title>
  <script src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js" integrity="sha384-Gw6i7UZujOEiLs+9nmkF4Hm+XQ+qMzCXhmyugT5HdPvP4b5Jq7H4x7Y9ca3g1Uos" crossorigin="anonymous"></script>
</head>
<body>
  <h1>Ether.js Form</h1>
  <form id="etherForm">
    <label for="projectName">Project Name:</label>
    <input type="text" id="projectName" name="projectName"><br><br>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br><br>
    <label for="twitterHandle">Twitter Handle:</label>
    <input type="text" id="twitterHandle" name="twitterHandle"><br><br>
    <label for="telegramHandle">Telegram Handle:</label>
    <input type="text" id="telegramHandle" name="telegramHandle"><br><br>
    <input type="submit" value="Submit">
  </form>

  <div id="accountInfo"></div>

  <script>
    // Function to handle form submission
    async function submitForm(event) {
      event.preventDefault(); // Prevent default form submission

      // Get the form inputs
      const projectName = document.getElementById('projectName').value;
      const name = document.getElementById('name').value;
      const twitterHandle = document.getElementById('twitterHandle').value;
      const telegramHandle = document.getElementById('telegramHandle').value;

      // Retrieve the Ethereum account
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const sender = await signer.getAddress();

        // Log the entered data and sender's account to the console
        console.log('Project Name:', projectName);
        console.log('Name:', name);
        console.log('Twitter Handle:', twitterHandle);
        console.log('Telegram Handle:', telegramHandle);
        console.log('Account:', sender);

        // Display the sender's account on the page
        const accountInfo = document.getElementById('accountInfo');
        accountInfo.innerHTML = `<p>Account: ${sender}</p>`;

        // You can perform further actions with the entered data and sender's account using Ether.js
        // For example, you can interact with Ethereum contracts or send transactions.
      } catch (error) {
        console.error(error);
      }
    }

    // Add form submission event listener
    const form = document.getElementById('etherForm');
    form.addEventListener('submit', submitForm);
  </script>
</body>
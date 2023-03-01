return <div>Hello World</div>;

// Generate a unique identifier for the user
const userId = Math.random().toString(36).substring(2);

// Construct the referral link
const baseUrl = "https://near.socia"; // Replace this with your base URL
const referralLink = `${baseUrl}?referral=${userId}`;

// Store the referral link and user ID in local storage
localStorage.setItem("referralLink", referralLink);
localStorage.setItem("userId", userId);

return <div>Hello World</div>;

// Retrieve the referral link from local storage
const getreferralLink = localStorage.getItem("referralLink");

// Display the referral link to the user
const referralLinkEl = document.getElementById("referralLink"); // Replace 'referral-link' with the ID of your referral link element
referralLinkEl.textContent = referralLinkU;

<div id="referral-widget">
  <h2>Referral Program</h2>
  <p>Invite your friends to join Near.social and earn rewards!</p>
  <p>Your referral link:</p>
  <p>
    <span id="referralLinkU"></span>
  </p>
</div>;

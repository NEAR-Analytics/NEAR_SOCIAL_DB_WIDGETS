const text = `
## **Quick Start**
### **🏆 What is HamsterPocket?**
HamsterPocket is your personal digital magic piggy bank. You place one type of token inside, and over time, it transforms into another type, all by itself. It's like having a robot assistant, working tirelessly, transparently, and securely for you.

![hamsterpocket](https://raw.githubusercontent.com/CaviesLabs/hamsterpocket-assets/main/1.png)
### **💡 How Does it Work?**

##### **🛠 Step 1: Setting Up Your HamsterPocket**
Here you decide the rules for your HamsterPocket, including:
- **Source Token**: The token you're starting with.
- **Target Token**: The token you want to collect.
- **Frequency**: How often the conversion should happen.
- **Price**: The desired price for your target token.
- **Amount**: The number of tokens to be converted at a time.
- **Stop-Loss**: The safety net - if your potential loss reaches a specific limit, the pocket will stop or close.
- **Take Profit**: The victory lap - if your potential profit hits a specific threshold, the pocket will stop or close.
- **Pocket Closure Conditions**: Additional options for when the pocket should stop, such as reaching a certain time or accumulated token amount.

![Busy Mr Hamser](https://raw.githubusercontent.com/CaviesLabs/hamsterpocket-assets/main/2.png)

##### **🎉 Step 2: Activate Your HamsterPocket**

Add your source tokens to your HamsterPocket. The magic begins as soon as the pocket has enough source tokens to perform a conversion.

![Mr. Hamser is processing users’ deposits](https://raw.githubusercontent.com/CaviesLabs/hamsterpocket-assets/main/3.png)

##### **🔬 Step 3: Monitor and Manage Your Pocket**

The HamsterPocket keeps working until:
- Your stop-loss or take-profit price is reached.
- The end time or amount you set for closure is achieved.
- You manually stop it.

![Mr. Hamser is bartering a trade](https://raw.githubusercontent.com/CaviesLabs/hamsterpocket-assets/main/4.png)

Note: You also have the flexibility to pause your HamsterPocket and resume it whenever you want.

When the job is done, you can open your HamsterPocket and collect your new tokens, along with any remaining source tokens.

Remember: While HamsterPocket adds an element of fun to trading, it's a tool that deals with real value. As such, please make sure to carefully consider the rules you set for your HamsterPocket.

#### **Enjoy the magic of automated trading with HamsterPocket!**
`;

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

if (!state.theme) {
  State.update({
    theme: styled.div`
        font-family: "Manrope", sans-serif;
        ${cssFont}
        ${css}`,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <div
      class="container pt-3 vw-80"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ width: "50vw" }}>
        <div style={{ marginBottom: 32, marginLeft: 32 }}>
          {" "}
          👉 About Us:
          <a
            href="https://cavies.xyz"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            Website
          </a>
          {" | "}
          <a
            href="https://twitter.com/CaviesLabs"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            Twitter
          </a>
          {" | "}
          <a
            href="https://github.com/CaviesLabs"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            Github
          </a>
          {" | "}
          <a
            href="mailto:hello@cavies.xyz"
            style={{ textDecoration: "underline" }}
          >
            Email
          </a>
        </div>
        <div style={{ padding: 32 }}>
          <Markdown text={text} />
        </div>
      </div>
    </div>
  </Theme>
);

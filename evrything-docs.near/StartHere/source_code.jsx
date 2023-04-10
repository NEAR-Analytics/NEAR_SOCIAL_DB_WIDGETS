/*

TUTORIAL

Build your own decentralized frontend!

First, we have to get the accountId for the challenge.

Notice how it checks props, and if that is null or undefined,
it returns user's accountId from the page context.

*/

const accountId = props.accountId ?? context.accountId;

/*

WALKTHROUGH

5 minutes or less!

The goal is to demonstrate *composability* of bOS widgets.

INSTRUCTIONS

Step-by-step Process:

1: Navigate to the ForkThis widget, and fork it!

2: Remix / rename that component however you wish.

3: Save your work on the blockchain operating system.

Have you done all of the steps above?

4. Edit the line of code below to display the widget you created.

↓ ↓ ↓ 

*/

return (
  <>
    <div class="alert alert-primary" role="alert">
      If the below does not render, view it{" "}
      <a href="https://temp.everything.dev/#/evrything.near/widget/Everything.View.Thing?src=evrything-docs.near/widget/Everything.View.Document&accountId=evrything.near&blockHeight=89268687">
        here.
      </a>
    </div>
    <Widget
      src="evrything.near/widget/Everything.View.Thing"
      props={{
        src: "evrything-docs.near/widget/Everything.View.Document",
        accountId: "evrything.near",
        blockHeight: "89268687",
      }}
    />
  </>
);

/*

5. Don't forget to rename and save this widget!

You will modify above code in the Next Level.

*/

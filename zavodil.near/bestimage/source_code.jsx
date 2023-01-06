return (
<div>
    <h4>
        The most beautiful profile picture on the NEAR Social:
    </h4>

    <div class="text-center">
        <Widget src="mob.near/widget/ProfileImage" 
        props={{ accountId: context.AccountId, style: {width: "10em" }}}/>
    </div>
</div>
)
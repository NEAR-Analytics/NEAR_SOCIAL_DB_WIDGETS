const storageCustomHomePage = Storage.privateGet("myHomePagePath");
console.log("其它组件使用尝试-storageCustomHomePage", storageCustomHomePage);
return <Widget src="juaner.near/widget/ref-home" />;

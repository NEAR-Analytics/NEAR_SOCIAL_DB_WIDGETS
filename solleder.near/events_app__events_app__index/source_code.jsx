constCONTRACT_OWNER=solleder.near;constaccountId=props.accountId??context.accountId;constButton=styled.button`background-color:#4caf50;border:none;color:white;padding:15px32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px2px;cursor:pointer;`;return(<div><h1>Events</h1><ahref={`#/${CONTRACT_OWNER}/widget/new?accountId=${accountId}`}className="TODO"><Button>CreatenewEvent</Button></a><ahref={`#/${CONTRACT_OWNER}/widget/index__list_container?accountId=${accountId}`}className="TODO"><Button>Myevents</Button></a><Widgetsrc={`${CONTRACT_OWNER}/widget/index__list_container`}props={{}}/></div>);
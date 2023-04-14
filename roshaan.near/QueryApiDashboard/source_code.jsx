const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
    margin-bottom: 1rem;
`

const Tab = styled.div`
    padding: 1rem;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    color: ${({ active }) => (active ? 'black' : 'gray')};
    border-bottom: 2px solid
        ${({ active }) => (active ? 'dodgerblue' : 'transparent')};
`

const TabContent = styled.div`
    padding: 1rem;
`

const ConnectButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: dodgerblue;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
`

State.init({
    activeTab: 'dashboard',
})
const setActiveTab = (tab_name) => {
    State.update({ activeTab: tab_name })
}

return (
    <div>
        <TabContainer>
            <Tab
                active={state.activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
            >
                Dashboard
            </Tab>
            <Tab
                active={state.activeTab === 'graphql-playground'}
                onClick={() => setActiveTab('graphql-playground')}
            >
                GraphQL Playground
            </Tab>
            <Tab
                active={state.activeTab === 'indexer-status'}
                onClick={() => setActiveTab('indexer-status')}
            >
                Indexer Status
            </Tab>
        </TabContainer>

        {state.activeTab === 'dashboard' && (
            <TabContent>
                <Widget src={'roshaan.near/widget/IndexerFunctionEditor'} />
                This is the Dashboard tab content. You can add any components or
                information related to the dashboard here.
                <Widget
                    src={'roshaan.near/widget/RegisterIndexerFunctionButton'}
                />
            </TabContent>
        )}

        {state.activeTab === 'graphql-playground' && (
            <TabContent>
                <Widget src={'roshaan.near/widget/IndexerFunctionEditor'} />
                This is the GraphQL Playground tab content. You can add any
                components or information related to the GraphQL Playground
                here.
            </TabContent>
        )}

        {state.activeTab === 'indexer-status' && (
            <TabContent>
                <Widget src={'roshaan.near/widget/IndexerStatus'} />
                This is the Indexer Status tab content. You can add any
                components or information related to the indexer status here.
            </TabContent>
        )}

        <ConnectButton>Connect New Indexer</ConnectButton>
    </div>
)

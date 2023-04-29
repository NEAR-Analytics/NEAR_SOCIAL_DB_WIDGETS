const Background = styled.div`
position: fixed;
width: 100vw;
height: calc(-62px + 100vh);
top: 62px;
left: 0;
`;

return <Background>{props.children}</Background>;

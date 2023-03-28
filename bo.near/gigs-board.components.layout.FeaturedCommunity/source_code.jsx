const Card = styled.div`
   {
    border: 1px solid #eceef0;

    /* Shadow/sm */
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
      0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 16px;
  }
`;

return <Card>
        <div class="p-3">
            <div class="d-flex flex-row align-items-center">
            <img src="https://ipfs.near.social/ipfs/bafkreihbjm67uavkjkvfqomzx5v63t6kossqwfuptdxfb4vbcpbw3gezdm"></img>
            <div class="nav navbar-brand h1 p-2">Zero Knowledge</div>
            </div>
            <div class="mt-2 text-secondary">
            Building a zero knowledge ecosystem on NEAR.
            </div>
        </div>
        <div class="border-top p-3">
            <a class="btn btn-light rounded-5 border w-100">View Details</a>
        </div>
    </Card>;
if (!props.address) return "send address as string in props";
if (!props.amount) return "send amount as string in props";

const ftMetadata = Near.view(props.address, "ft_metadata", {});

if (ftMetadata === null) return "loading";

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

return (
  <div>
    <Icon img src={ftMetadata.icon} />
    {ftMetadata.symbol}
    {(parseInt(props.amount) / Math.pow(10, ftMetadata.decimals)).toFixed(
      ftMetadata.decimals
    )}
  </div>
);

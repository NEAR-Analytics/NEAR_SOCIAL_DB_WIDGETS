if (!props.address) return "send address as string in props";

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
  </div>
);

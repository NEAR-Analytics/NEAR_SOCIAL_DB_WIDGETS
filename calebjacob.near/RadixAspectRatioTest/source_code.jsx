const Img = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

return (
  <AspectRatio.Root ratio={16 / 9}>
    <Img
      className="Image"
      src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
      alt="Landscape photograph by Tobias Tullius"
    />
  </AspectRatio.Root>
);

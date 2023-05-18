const ownerId = "udovychenko.near";
const size = props.size ?? "1.5em";
const imageSrc = props.image;

const ImageCircle = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  background: #fafafa;
  sizing: border-box;
  display: inline-block;
  --size: ${({ size }) => size};
  width: var(--size, 1.5em);
  height: var(--size, 1.5em);
  border-radius: 50%;
  overflow: hidden;
`;

return (
  <ImageContainer size={size}>
    <ImageCircle src={imageSrc} alt="profile image" />
  </ImageContainer>
);

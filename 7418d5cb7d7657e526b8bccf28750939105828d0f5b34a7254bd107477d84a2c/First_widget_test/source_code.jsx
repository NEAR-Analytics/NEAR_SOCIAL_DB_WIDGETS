const HeadingOne = styled.h1`
  position: relative;
  font-weight: 300;
  font-size: 4.5em;
  color: #402d2d;
`;

const TextWrapper = styled.div`

`;

return (
  <div>
    <HeadingOne>
      <span class="text-wrapper">
        <span class="line line1"></span>
        <span class="letters letters-left">Signal</span>
        <span class="letters ampersand">&amp;</span>
        <span class="letters letters-right">Noise</span>
        <span class="line line2"></span>
      </span>
    </HeadingOne>
  </div>
);

const slideUpAndFade = styled.keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightAndFade = styled.keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = styled.keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = styled.keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledArrow = styled(RadixTooltip.Arrow)`
  fill: #fff;
`;

return (
  <RadixTooltip.Root>
    <RadixTooltip.Trigger asChild>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.30258 5.24935C5.43973 4.85949 5.71042 4.53074 6.06672 4.32134C6.42302 4.11194 6.84194 4.0354 7.24927 4.10526C7.6566 4.17513 8.02606 4.3869 8.29221 4.70307C8.55836 5.01924 8.70403 5.4194 8.70341 5.83268C8.70341 6.99935 6.95341 7.58268 6.95341 7.58268M7.00008 9.91602H7.00591M12.8334 6.99935C12.8334 10.221 10.2217 12.8327 7.00008 12.8327C3.77842 12.8327 1.16675 10.221 1.16675 6.99935C1.16675 3.77769 3.77842 1.16602 7.00008 1.16602C10.2217 1.16602 12.8334 3.77769 12.8334 6.99935Z" stroke="#7E868C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </RadixTooltip.Trigger>
    <RadixTooltip.Content sideOffset={5} side="top" align="center">
      {props.content}
      <StyledArrow />
    </RadixTooltip.Content>
  </RadixTooltip.Root>
);

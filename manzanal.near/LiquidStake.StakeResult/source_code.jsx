const stNEARIcon = {
  stNEAR: (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.06863 18.336C13.8926 18.336 17.8046 14.424 17.8046 9.6C17.8046 4.776 13.8926 0.863999 9.06863 0.863999C4.24463 0.863999 0.332625 4.776 0.332625 9.6C0.332625 14.424 4.24463 18.336 9.06863 18.336ZM9.06863 14.208L4.38863 9.528L5.49263 8.4L9.06863 11.928L12.6206 8.4L13.7486 9.528L9.06863 14.208ZM9.06863 10.632L6.16463 7.752L7.29263 6.624L9.06863 8.424L10.8446 6.624L11.9726 7.752L9.06863 10.632ZM9.06863 7.128L7.94063 5.952L9.06863 4.848L10.1966 5.952L9.06863 7.128Z"
        fill="#032131"
      />
    </svg>
  ),
  NEAR: (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.06863 18.336C13.8926 18.336 17.8046 14.424 17.8046 9.6C17.8046 4.776 13.8926 0.863999 9.06863 0.863999C4.24463 0.863999 0.332625 4.776 0.332625 9.6C0.332625 14.424 4.24463 18.336 9.06863 18.336ZM5.94863 13.464C5.49263 13.464 5.10863 13.104 5.10863 12.624V6.384C5.10863 5.928 5.49263 5.544 5.94863 5.544H6.11663C6.35663 5.544 6.59663 5.64 6.76463 5.832L11.6846 11.736C11.7086 11.76 11.7326 11.76 11.7566 11.76C11.7806 11.76 11.8286 11.736 11.8286 11.712V7.272C11.8286 7.248 11.8286 7.248 11.8046 7.224C11.7806 7.2 11.7326 7.2 11.7086 7.224L10.0766 8.64C10.0046 8.688 9.93263 8.688 9.86063 8.64C9.78863 8.592 9.76463 8.472 9.81263 8.4L11.4686 5.952C11.6366 5.688 11.9006 5.544 12.1886 5.544C12.6686 5.544 13.0286 5.928 13.0286 6.384V12.624C13.0286 13.104 12.6686 13.464 12.1886 13.464H12.0206C11.7806 13.464 11.5406 13.368 11.3726 13.176L6.45263 7.272C6.42863 7.248 6.40463 7.248 6.38063 7.248C6.35663 7.248 6.30862 7.272 6.30862 7.296V11.736C6.30862 11.76 6.33263 11.76 6.33263 11.784C6.35663 11.808 6.40463 11.808 6.42863 11.784L8.06063 10.368C8.13263 10.32 8.20463 10.32 8.27663 10.368C8.37263 10.416 8.39663 10.536 8.32463 10.608L6.66863 13.056C6.52463 13.32 6.23663 13.464 5.94863 13.464Z"
        fill="#032131"
      />
    </svg>
  ),
}[props.token];
const Input = styled.div`
    border-radius: 8px;
    background-color: #f5ffd1;
    line-height: 48px;
    font-family: "Aeonik Fono", Arial;
    color: #032131;
    font-size: 1.125rem;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 283px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 283px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
  `;
const Frame = styled.div`
    line-height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 16.9126px;
    margin-bottom: 56px;
  `;
const Title = styled.span`
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 18px;
    letter-spacing: 0.6px;
  `;
const Frame1 = styled.div`
    font-family: "Aeonik Mono", Arial;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    row-gap: 8px;
    margin-left: 4px;
  `;
const Frame2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
  `;
const Stnearcircle = styled.span`
    text-align: right;
    font-weight: 400;
    font-family: "Meta Space Icons", Arial;
    line-height: 32px;
    margin-left: 1px;
    margin-right: 2px;
    margin-top: 10px;
    margin-bottom: 10px;
  `;
const Num = styled.span`
    font-weight: 500;
    font-size: 2.5rem;
    line-height: 48px;
  `;
const Token = styled.span`
    text-align: right;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 18px;
    margin-left: 2px;
    margin-bottom: 5px;
  `;
const TokenIcon = styled.div`
  & svg {
      width: 29px;
      height: 32px;
    }

`;
return (
  <Input className={props.className || ""}>
    <Frame>
      <Title>{props.title}</Title>
    </Frame>
    <Frame1>
      <Frame2>
        <TokenIcon>{stNEARIcon}</TokenIcon>
        <Num>{props.amount || "0.00"}</Num>
      </Frame2>
      <Token>{props.token}</Token>
    </Frame1>
  </Input>
);

const SectionWrapper = styled.div`
  max-width: 300px;
  width: ${({ width }) => `${width}px`};
    @media (min-width: 480px) {
      max-width: 400px;
    }
    @media (min-width: 480px) {
      max-width: ${({ width }) => `${width}px`};
    }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const WidgetHeading = styled.p`
  width: 94%;
  margin: 0 auto 14px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${({ currTheme }) => (currTheme === "light" ? "#2F373E" : "#fff")};

`;

const WidgetContent = styled.p`
  width: 80%;
  margin: 0 auto 14px; 
  font-size: 14px;
  text-align: center;
  color: ${({ currTheme }) => (currTheme === "light" ? "#2F373E" : "#fff")};

`;

const CTAButton = styled.a`
  width: 60%;
  max-width: 200px;
  display: block;
  margin: 20px auto 0;
  padding: 12px 14px;
  border-radius: 4px;
  background-color: #4498E0;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: 	#3583BF;
  }
`;

const TestWrapepr = styled.div`
background: #000;
`;

const WidgetWrapper = styled.div`
  display: block; 
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const width = props.widgetBarWidth ? props.widgetBarWidth : "300";
const { theme, infoTitle, infoText, linkText, linkUrl } = props;

//theme can be dark or light, if someone misspel letter or insert anythign elese this is safe checking
const currTheme = theme === "dark" ? "dark" : "light";
const defaultInfoTitle = infoTitle ? infoTitle : "I am human Signup progress";
return (
  <SectionWrapper width={width}>
    <ContentWrapper>
      <WidgetHeading currTheme={currTheme}>{defaultInfoTitle}</WidgetHeading>

      {infoText && (
        <WidgetContent currTheme={currTheme}>{infoText}</WidgetContent>
      )}
    </ContentWrapper>
    <WidgetWrapper>
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressBarWidget"
        props={{ widgetBarWidth: width, currTheme: currTheme }}
      />
    </WidgetWrapper>
    {linkUrl && (
      <CTAButton currTheme={currTheme} href={linkUrl}>
        {linkText ? linkText : "Sign Up"}
      </CTAButton>
    )}
  </SectionWrapper>
);

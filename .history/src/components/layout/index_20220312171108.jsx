import styled from 'styled-components';
import Colour from '../lib/color';
import TextContent from './textContent';

const Layout = ({ children }) => {
  const LayoutWrapper = styled.div`
    display: flex;
    min-height: 100vh;

    > div:last-child {
      flex: 1;
    }
  `;
  const NavContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background: ${Colour.LightGrayBG};
    color: ${Colour.LightrayWrite};
    display: flex;
    justify-content: space-between;
  `;
  const RightNav = styled.div`
    width: 100%;
    height: 100%;
    background: #262729;
    color: #93979e;
    display: flex;
  `;
  const NavLogo = styled.div`
    ${'' /* position: relative; */}
  `;
  const NavList = styled.ul`
    list-style-type: none;
    padding: 10px;

    > li {
      display: inline;
      padding: 10px;
    }
  `;
  const LeftNav = styled.div`
    width: 100%;
    height: 100%;
    background: #262729;
    color: #93979e;
  `;

  const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `;

  const Body = styled.div`
    padding: 32px 32px 16px 32px;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  `;

  const Footer = styled.div`
    border-top: 1px solid ${Colour.DarkGrayBG};
    padding: 16px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 32px;
  `;

  const Copyright = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${Colour.DarkGrayWrite};
  `;

  const TermsAndPrivacy = styled.span`
    font-weight: 600;
    font-size: 12px;
    color: ${Colour.DarkGrayWrite};

    > a {
      text-decoration: none;
      color: ${Colour.DarkGrayWrite};
    }
  `;
  return (
    <LayoutWrapper>
      <NavContainer>
        <RightNav>
          <NavLogo>
            <TextContent fontSize="24" fontWeight="700">
              Logo
            </TextContent>
          </NavLogo>
          <NavList>
            <li>Assets</li>
            <li>Exchange</li>
            <li>Coverter</li>
            <li>Watchlist</li>
          </NavList>
        </RightNav>
        <LeftNav>hell</LeftNav>
      </NavContainer>
      <Main>
        {/* <TobBar>
                    <UserName onClick={show}>
                        <span>{authContextProps.user?.fullname}</span>
                        <span><i className="fas fa-chevron-down" /></span>
                    </UserName>
                </TobBar> */}
        <Body>{children}</Body>
        <Footer>
          <Copyright>&copy; {new Date().getFullYear()}. Muzingo</Copyright>
          <TermsAndPrivacy>
            <a href="#" target="_blank" rel="noreferrer">
              Terms of Use
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </TermsAndPrivacy>
        </Footer>
      </Main>
    </LayoutWrapper>
  );
};

export default Layout;

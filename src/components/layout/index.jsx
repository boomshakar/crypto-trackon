import { MenuItem, Select } from '@material-ui/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { CryptoState } from '../../CryptoContext.js';
import Colour from '../../lib/color.js';
import AuthModal from '../auth/AuthModal.js';
import TextContent from '../textContent';

const LayoutWrapper = styled.div`
  ${'' /* display: flex; */}
  width: 100%;
  min-height: 100vh;

  ${
    '' /* > div:last-child {
  flex: 1;
} */
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
  display: flex;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${'' /* background: radial-gradient(circle at 50% 300px,hsla(var(--delta-hsl),.1),transparent 50vw),#000; */}
  background: rgb(255,0,0);
  background: radial-gradient(
    circle at 50% 600px,
    rgba(119, 10, 61, 1) 0%,
    rgba(121, 9, 62, 1) 16%,
    rgba(40, 33, 33, 1) 50%
  );
`;

const Body = styled.div`
  padding: 32px 32px 16px 32px;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  /* From https://css.glass */
  background: rgba(40, 40, 40, 0.05);
  ${'' /* border-radius: 16px; */}
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(40, 40, 40, 0.27);
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

const Layout = ({ children }) => {
  const { currency, setCurrency, user } = CryptoState();
  const history = useHistory();
  return (
    <LayoutWrapper>
      <NavContainer>
        <RightNav>
          <NavLogo onClick={() => history.push(`/`)}>
            <TextContent fontSize={24} fontWeight="700">
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
        <LeftNav>
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            style={{ width: 100, height: 40, marginLeft: 15 }}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={'NGN'}>NGN</MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
          </Select>
          {user ? 'Logout' : <AuthModal />}
        </LeftNav>
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

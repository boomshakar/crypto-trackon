import styled from 'styled-components';
import Colour from '../lib/color';
import TextContent from './textContent';

const Layout = () => {
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
    </LayoutWrapper>
  );
};

export default Layout;

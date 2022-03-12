import styled from 'styled-components';
import Colour from '../lib/color';

const HeaderN = () => {
  const NavContainer = styled.div`
    width: 100%;
    height: 100%;
    background: Colour.LightGrayBG;
    color: Colour.LightGrayBG;
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
  const NavLogo = styled.div``;
  const NavList = styled.ul``;
  const LeftNav = styled.div`
    width: 100%;
    height: 100%;
    background: #262729;
    color: #93979e;
  `;
  return (
    <NavContainer>
      <RightNav>
        <NavLogo>Logo</NavLogo>
        <NavList>
          <line>Assets</line>
          <line>Exchange</line>
          <line>Coverter</line>
          <line>Watchlist</line>
        </NavList>
      </RightNav>
      <LeftNav>hell</LeftNav>
    </NavContainer>
  );
};

export default HeaderN;

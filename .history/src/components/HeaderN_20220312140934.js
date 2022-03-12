import styled from 'styled-components';
import Colour from '../lib/color';

const HeaderN = () => {
  const NavContainer = styled.div`
    width: 100%;
    ${'' /* height: 100%; */}
    padding: 10px;
    background: ${Colour.LightGrayBG};
    color: ${Colour.LightrayWrite};
    display: flex;
    justify-content: space-between;
  `;
  const RightNav = styled.div`
    width: 100%;
    height: 60px;
    background: #262729;
    color: #93979e;
    display: flex;
  `;
  const NavLogo = styled.div`
    ${'' /* position: relative; */}
  `;
  const NavList = styled.ul`
    list-style-type: none;

    > li {
      display: inline;
    }
  `;
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
          <li>Assets</li>
          <li>Exchange</li>
          <li>Coverter</li>
          <li>Watchlist</li>
        </NavList>
      </RightNav>
      <LeftNav>hell</LeftNav>
    </NavContainer>
  );
};

export default HeaderN;

import styled from 'styled-components';

const HeaderN = () => {
  const NavContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #262729;
    color: #93979e;
  `;
  const RightNav = styled.div`
    width: 100%;
    height: 100%;
    background: #262729;
    color: #93979e;
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
        <NavList>List</NavList>
      </RightNav>
      <LeftNav>hell</LeftNav>
    </NavContainer>
  );
};

export default HeaderN;

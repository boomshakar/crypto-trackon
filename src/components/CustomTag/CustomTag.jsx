import React from 'react';
import styled from 'styled-components';
import Colour from '../../lib/color';

const CustomTag = ({ src, title, marginR, borderActive, onClick }) => {
  const TagContainer = styled.div`
    ${'' /* display: flex; */}
    ${'' /* display:inline-block; */}
    display: inline-flex;
    ${'' /* justify-content: center; */}
    ${'' /* align-items: center; */}
    background: #ffffff14;
    padding: 6px 12px;
    font-size: 13px;
    border: 1px solid ${() => (borderActive ? Colour.PinkWrite : Colour.LightrayWrite)};
    border-radius: 9999px;
    margin-right: ${() => marginR};
    cursor: pointer;
  `;
  const TagLogo = styled.img`
    margin-right: 5px;
    font-size: 13px;
  `;
  const TagTitle = styled.span``;
  return (
    <TagContainer onClick={onClick}>
      <TagLogo src={src} />
      <TagTitle>{title}</TagTitle>
    </TagContainer>
  );
};

export default CustomTag;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colour from '../../lib/color.jsx';

const Text = styled.span`
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.colour || Colour.LightrayWriteBold};
  text-align: ${(props) => props.textAlign};
  display: ${(props) => props.display};
  ${(props) => (props.onClick ? 'cursor: pointer;' : '')};
`;

export default function TextContent(props) {
  return (
    <Text
      colour={props.colour}
      block={props.block}
      textAlign={props.textAlign}
      onClick={props.onClick}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      display={props.display}
    >
      {props.children}
    </Text>
  );
}

TextContent.defaultProps = {
  fontSize: 16,
  fontWeight: 'normal',
  display: 'inline',
};

TextContent.propTypes = {
  colour: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element, PropTypes.number]).isRequired,
  fontSize: PropTypes.number,
  //   fontWeight: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'right', 'center']),
  display: PropTypes.oneOf(['inline', 'block']),
  onClick: PropTypes.func,
};

import React from 'react';
import TextContent from '../textContent';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colour from '../../lib/colour';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  margin-bottom: 32px;

  > span:first-child {
    margin-bottom: 32px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

function PageTitle(props) {
  function onGoBack() {
    props.history.goBack();
  }

  return (
    <Container>
      {props.canGoBack && (
        <TextContent fontSize={12} fontWeight="700" colour={Colour.DarkGrayWrite} onClick={onGoBack}>
          <i className="fas fa-arrow-left" />
          &nbsp;&nbsp;{props.goBackText}
        </TextContent>
      )}
      <TitleWrapper>
        {props.replaceComponent ? (
          props.replaceComponent
        ) : (
          <TextContent fontSize={24} fontWeight="700">
            {props.title}
          </TextContent>
        )}
        {props.rightComponent}
      </TitleWrapper>
      {props.subtitle && (
        <TextContent fontSize={13} fontWeight="400">
          {props.subtitle}
        </TextContent>
      )}
    </Container>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
  rightComponent: PropTypes.element,
  replaceComponent: PropTypes.element,
  canGoBack: PropTypes.bool,
  goBackText: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

export default withRouter(PageTitle);

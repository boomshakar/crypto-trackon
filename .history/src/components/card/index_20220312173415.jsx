import styled from 'styled-components';
import Colour from '../../lib/color.js';
import TextContent from '../textContent';

const Card = (props) => {
  const AnalyticsCard = styled.div`
    border-radius: 5px;
    padding: 48px;
    background-color: ${(props) => props.colour};
    flex: 1;
  `;

  const AnalyticsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      margin: 0 16px;

      ${
        '' /* :last-child {
    margin-right: none;
  } */
      }
    }
  `;
  return (
    <AnalyticsWrapper>
      <AnalyticsCard color={props.colour}>{props.children}</AnalyticsCard>
    </AnalyticsWrapper>
  );
};

export default Card;

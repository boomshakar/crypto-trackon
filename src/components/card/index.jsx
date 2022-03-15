import styled from 'styled-components';
import Colour from '../../lib/color.js';
import TextContent from '../textContent';

const Card = (props) => {
  const AnalyticsCard = styled.div`
    border-radius: 5px;
    border: 1px solid rgba(240, 240, 255, 0.1);
    ${'' /* background-color: transparent; */}
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    padding: 15px 18px 18px 18px;
    flex: 1;
    max-height: 100px;
  `;

  return (
    // <AnalyticsWrapper>
    <AnalyticsCard>
      <div>
        <TextContent fontWeight="700" fontSize={13} color={Colour.LightrayWrite}>
          {props.title}
        </TextContent>
      </div>
      <div>
        <TextContent fontWeight="400" fontSize={20} color={Colour.DarkGrayWrite}>
          {props.leadFigure}
        </TextContent>
      </div>
      <div>
        <TextContent fontSize={13} color={Colour.LightrayWrite}>
          {props.subTitle}
        </TextContent>
      </div>
    </AnalyticsCard>
    // </AnalyticsWrapper>
  );
};

export default Card;

import styled from 'styled-components';
import Colour from '../lib/color.js';
import Card from '../components/card';
import TextContent from '../components/textContent';

const Home = () => {
  const Dashboard = styled.div``;
  const DashboardLead = styled.div`
    text-align: center;
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
    <div>
      <Dashboard>
        <TextContent>tag</TextContent>
        <DashboardLead>
          <div>
            <TextContent>Top Cryptocurrencies by Market Cap</TextContent>
            <span>41,819 (14,826 are Activeky Traded)</span>
          </div>
        </DashboardLead>
        <AnalyticsWrapper>
          <Card>
            <TextContent>1</TextContent>
            <TextContent>2</TextContent>
            <TextContent>3</TextContent>
          </Card>
          <Card>
            <TextContent>1</TextContent>
            <TextContent>2</TextContent>
            <TextContent>3</TextContent>
          </Card>
          <Card>
            <TextContent>1</TextContent>
            <TextContent>2</TextContent>
            <TextContent>3</TextContent>
          </Card>
          <Card>
            <TextContent>1</TextContent>
            <TextContent>2</TextContent>
            <TextContent>3</TextContent>
          </Card>
        </AnalyticsWrapper>
      </Dashboard>
    </div>
  );
};

export default Home;

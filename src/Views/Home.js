import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Colour from '../lib/color.js';
import Card from '../components/card';
import TextContent from '../components/textContent';
import Carousel from '../components/carousel/index.jsx';
import DataTable from '../components/dataTable/index.jsx';
import { GlobalCoins } from '../config/api.js';

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
  const DashboardSlider = styled.div``;
  const CoinTableWrapper = styled.div``;

  const [globalCoinsData, setGlobalCoinsData] = useState(null);
  const [globalCoinsLoad, setGlobalCoinsLoad] = useState(false);

  useEffect(() => {
    fetchGlobalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchGlobalData = async () => {
    const response = await axios.get(GlobalCoins());
    // setGlobalCoinsLoad(true);
    setGlobalCoinsData(response?.data.data);
  };
  console.log({ globalCoinsData });
  return (
    <div>
      <Dashboard>
        <TextContent>tag</TextContent>
        <DashboardLead>
          <div>
            <TextContent>Top Cryptocurrencies by Market Cap</TextContent>
          </div>
          <span>41,819 (14,826 are Activeky Traded)</span>
        </DashboardLead>
        <AnalyticsWrapper>
          <Card
            title="Bitcoin Market Cap"
            leadFigure={`${globalCoinsData?.market_cap_percentage.btc.toFixed(2).toString()}%`}
          />
          <Card title="№ of Coins" leadFigure={globalCoinsData?.active_cryptocurrencies.toString()} />
          <Card
            title="Bitcoin Market Cap"
            leadFigure={`${globalCoinsData?.market_cap_percentage.btc.toFixed(2).toString()}%`}
          />
          <Card title="№ of Coins" leadFigure={globalCoinsData?.active_cryptocurrencies.toString()} />

          {/* <Card>
            {!globalCoinsData ? (
              'Loading'
            ) : (
              <>
                <TextContent>{globalCoinsData?.market_cap_percentage.btc.toString()}</TextContent>
                <TextContent>Bitcoin Market Cap Dominance</TextContent>
              </>
            )}
          </Card>
          <Card>
            {!globalCoinsData ? (
              'Loading'
            ) : (
              <>
                <TextContent>{globalCoinsData?.active_cryptocurrencies.toString()}</TextContent>
                <TextContent>№ of Coins</TextContent>{' '}
              </>
            )}
          </Card> */}
        </AnalyticsWrapper>
        <DashboardSlider>
          <Carousel />
        </DashboardSlider>
      </Dashboard>
      <CoinTableWrapper>
        <DataTable />
      </CoinTableWrapper>
    </div>
  );
};

export default Home;

import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Colour from '../lib/color.js';
import Card from '../components/card';
import TextContent from '../components/textContent';
import Carousel from '../components/carousel/index.jsx';
import DataTable from '../components/dataTable/index.jsx';
import { GlobalCoins } from '../config/api.js';
import { Typography } from '@material-ui/core';

const Home = () => {
  const Dashboard = styled.div``;
  const DashboardLead = styled.div`
    text-align: center;
    margin: 20px auto;
  `;
  const AnalyticsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      ${'' /* margin: 0 16px; */}
      ${'' /* margin: 0; */}

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
        <DashboardSlider>
          <Carousel />
        </DashboardSlider>
        <DashboardLead>
          <div>
            {/* <TextContent fontSize={35} fontWeight={450} style={{ margin: 18, fontFamily: 'Montserrat' }}>
              Top Cryptocurrencies by Market Cap
            </TextContent> */}
            <Typography
              variant="h3"
              style={{ fontSize: '40px', margin: 18, fontFamily: 'Montserrat', fontWeight: '500' }}
            >
              Top Cryptocurrencies by Market Cap
            </Typography>
          </div>
          <TextContent>41,819 (14,826 are Actively Traded)</TextContent>
        </DashboardLead>
        <AnalyticsWrapper>
          <Card
            title="Bitcoin Market Cap"
            marginR="16"
            leadFigure={`${globalCoinsData?.market_cap_percentage.btc.toFixed(2).toString()}%`}
          />
          <Card title="№ of Coins" marginR="16" leadFigure={globalCoinsData?.active_cryptocurrencies.toString()} />
          <Card
            title="Bitcoin Market Cap"
            marginR="16"
            leadFigure={`${globalCoinsData?.market_cap_percentage.btc.toFixed(2).toString()}%`}
          />
          <Card title="№ of Coins" leadFigure={globalCoinsData?.active_cryptocurrencies.toString()} />
        </AnalyticsWrapper>
      </Dashboard>
      <CoinTableWrapper>
        <DataTable />
      </CoinTableWrapper>
    </div>
  );
};

export default Home;

import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Colour from '../lib/color.js';
import Card from '../components/card';
import TextContent from '../components/textContent';
import Carousel from '../components/carousel/index.jsx';
import DataTable from '../components/dataTable/index.jsx';
import CryptoTable from '../components/CryptoTable/CrytoTable';
import { CoinList, GlobalCoins } from '../config/api.js';
import { Typography } from '@material-ui/core';
import { CryptoState } from '../CryptoContext.js';
import WishlistTable from '../components/WishlistTable/WishlistTable.jsx';
import CustomTag from '../components/CustomTag/CustomTag.jsx';

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
const Home = () => {
  const [globalCoinsData, setGlobalCoinsData] = useState(null);
  const [cryptodataTBL, setCryptoDataTBL] = useState([]);
  const [dataTab, setDataTab] = useState({
    id: 'all-crypto',
  });
  const [globalCoinsLoad, setGlobalCoinsLoad] = useState(false);

  const { currency } = CryptoState();

  useEffect(() => {
    fetchGlobalData();
    (async () => {
      const { data } = await axios.get(CoinList(currency));
      setCryptoDataTBL(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(cryptodataTBL);

  const fetchGlobalData = async () => {
    const response = await axios.get(GlobalCoins());
    // setGlobalCoinsLoad(true);
    setGlobalCoinsData(response?.data.data);
  };
  console.log({ globalCoinsData });
  return (
    <div>
      <Dashboard>
        <DashboardSlider>
          <Carousel />
        </DashboardSlider>
        <DashboardLead>
          <div>
            {/* <TextContent fontSize={35} fontWeight={450} style={{ margin: 18, fontFamily: 'Montserrat' }}>
              Top Cryptocurrencies by Market Cap
            </TextContent> */}
            <CustomTag
              title="Wishlist"
              src="data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.8925 7.81178C17.0503 7.66199 17.1622 7.47043 17.2153 7.25944C17.2684 7.04846 17.2604 6.82673 17.1923 6.62011C17.1235 6.41157 16.9974 6.22656 16.8285 6.0862C16.6597 5.94584 16.4547 5.85578 16.2371 5.82628L12.2423 5.25428C12.1589 5.2426 12.0795 5.21091 12.0111 5.1619C11.9426 5.11289 11.887 5.04803 11.849 4.97286L10.0615 1.3997C9.96161 1.20426 9.80966 1.04022 9.62243 0.925666C9.4352 0.81111 9.21998 0.750488 9.00048 0.750488C8.78099 0.750488 8.56576 0.81111 8.37853 0.925666C8.19131 1.04022 8.03936 1.20426 7.93944 1.3997L6.15286 4.96828C6.1149 5.04345 6.0593 5.10831 5.99082 5.15732C5.92233 5.20632 5.84301 5.23802 5.75961 5.2497L1.76477 5.8217C1.54716 5.85119 1.34222 5.94126 1.17334 6.08162C1.00445 6.22198 0.878413 6.40699 0.809608 6.61553C0.741484 6.82215 0.733491 7.04387 0.786563 7.25486C0.839634 7.46585 0.951582 7.6574 1.10936 7.8072L3.99961 10.5847C4.06043 10.6428 4.10597 10.7151 4.13219 10.795C4.15842 10.875 4.16451 10.9602 4.14994 11.043L3.46794 14.9654C3.43709 15.1324 3.44422 15.3041 3.48882 15.4678C3.53341 15.6316 3.61431 15.7832 3.72552 15.9114C3.90225 16.1145 4.14176 16.2527 4.406 16.304C4.67025 16.3553 4.94406 16.3168 5.18394 16.1947L8.75894 14.343C8.83445 14.3051 8.9178 14.2853 9.00232 14.2853C9.08683 14.2853 9.17018 14.3051 9.24569 14.343L12.8207 16.1947C13.0599 16.3196 13.3345 16.3596 13.5994 16.3082C13.8644 16.2567 14.104 16.1168 14.2791 15.9114C14.3903 15.7832 14.4712 15.6316 14.5158 15.4678C14.5604 15.3041 14.5675 15.1324 14.5367 14.9654L13.8547 11.043C13.84 10.9602 13.8461 10.875 13.8723 10.795C13.8985 10.715 13.9441 10.6428 14.005 10.5847L16.8925 7.81178Z' fill='%23FFD559'/%3e%3c/svg%3e"
              marginR="10px"
              borderActive={dataTab.id === 'wishlist'}
              onClick={() => setDataTab({ id: 'wishlist' })}
            />
            <CustomTag
              title="All Crypto"
              borderActive={dataTab.id === 'all-crypto'}
              onClick={() => {
                setDataTab({ id: 'all-crypto' });
              }}
            />
            <Typography
              variant="h3"
              style={{ fontSize: '40px', margin: '8px 18px', fontFamily: 'Montserrat', fontWeight: '500' }}
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
        {dataTab.id === 'wishlist' ? <WishlistTable /> : <DataTable dataTBL={cryptodataTBL} />}
      </CoinTableWrapper>
    </div>
  );
};

export default Home;

import styled from 'styled-components';
import Colour from '../lib/color.js';
import Card from '../components/card';
import TextContent from '../components/textContent';
import Carousel from '../components/carousel/index.jsx';
import DataTable from '../components/dataTable/index.jsx';

const AssetPage = () => {
  const CoinInfoLayout = styled.div``;
  const BriefCoinInfo = styled.div``;
  const MidSection = styled.div``;
  const CoinChart = styled.div``;
  const CoinExchange = styled.div``;
  return (
    <CoinInfoLayout>
      <BriefCoinInfo>BriefCoinInfo</BriefCoinInfo>
      <MidSection>
        <CoinChart>CoinChart</CoinChart>
        <CoinExchange>CoinExchange</CoinExchange>
      </MidSection>
    </CoinInfoLayout>
  );
};

export default AssetPage;

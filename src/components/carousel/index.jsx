import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { numberWithCommas, profitLoss } from '../../lib/helpers';
import Colour from '../../lib/color';
import TextContent from '../textContent';

const Carousel = () => {
  const carouselItem = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  };
  const carousel = {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  };
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
  };

  // const useStyles = makeStyles((theme) => ({
  //   carousel: {
  //     height: '50%',
  //     display: 'flex',
  //     alignItems: 'center',
  //   },
  //   carouselItem: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     cursor: 'pointer',
  //     textTransform: 'uppercase',
  //     color: 'white',
  //   },
  // }));

  // const classes = useStyles();

  const items = trending.map((coin) => {
    return (
      <Link style={carouselItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="40" style={{ marginBottom: 10, borderRadius: '50%' }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <TextContent colour={profitLoss(coin?.price_change_percentage_24h)} fontWeight={500}>
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </TextContent>
        </span>
        <TextContent fontSize={15} fontWeight={400}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </TextContent>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 6,
    },
  };

  return (
    <div style={carousel}>
      <AliceCarousel
        mouseTracking={true}
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;

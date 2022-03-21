import { LinearProgress, Box, makeStyles, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import styled from 'styled-components';
import TextContent from '../components/textContent';
import { notification, numberWithCommas, profitLoss } from '../lib/helpers';
import Colour from '../lib/color';
import { addDoc, collection, doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';

const TopSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const CoinCapSummary = styled.div`
  width: 63%;
`;
const CoinInfoLinks = styled.div`
  width: 33%;
`;
const CoinInfoLinksList = styled.div``;
const CoinInfoLinkTag = styled.a``;
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [progress, setProgress] = useState(0);

  const { currency, symbol, user, watchlist } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
      // setProgress(100);
    };
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] }, { merge: true });
      notification(`${coin.name} Added to the Watchlist`, 'success');
    } catch (error) {
      console.error(error.message);
      notification(error.message, 'error');
    }
    // const collectionRef = collection(db, `watchlist`).doc(user?.uid);
    // const payload = { coin };
    // await addDoc(collectionRef, payload)
    //   .then((res) => {
    //     console.log(res);
    //     notification(`${res.name} Added to the Watchlist`, 'success');
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     notification(err.message, 'error');
    //   });

    // db.child('watchlist').push(coin, (err) => {
    //   if (err) {
    //     notification(err.message, 'error');
    //   } else {
    //     notification('Added success', 'success');
    //   }
    // });
  };
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist.filter((watch) => watch !== coin?.id) }, { merge: true });
      notification(`${coin.name} Removed from the Watchlist`, 'success');
    } catch (error) {
      notification(error.message, 'error');
    }
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    },
  }));

  const classes = useStyles();

  if (!coin && progress < 100) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress style={{ backgroundColor: 'gold' }} variant="determinate" value={progress} />
      </Box>
    );
  }

  return (
    <>
      <TopSection>
        <CoinCapSummary>
          <div>
            <span
              // bgColour="green"
              style={{
                borderRadius: '12px',
                border: '1px solid gold',
                color: Colour.LightrayWriteBold,
                backgroundColor: Colour.LightGrayBG,
                padding: '2px 6px',
                fontSize: '12px',
              }}
            >
              Rank #{coin.market_cap_rank}
            </span>
          </div>

          <div style={{ display: 'flex', alignContent: 'center', margin: '12px 0' }}>
            <img src={coin?.image.large} alt={coin?.name} height="28" style={{ marginRight: '6px' }} />
            <TextContent fontWeight={500} fontSize={20}>{`${coin?.name} (${coin?.symbol})`}</TextContent>
          </div>

          <div>
            <TextContent fontWeight={500} fontSize={30}>
              {numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
            </TextContent>
            <TextContent
              margin="0 10px"
              fontWeight={500}
              fontSize={20}
              colour={profitLoss(coin?.market_data?.price_change_percentage_24h)}
            >
              {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
            </TextContent>
          </div>

          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '50%' }}>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  borderBottom: `1px solid ${Colour.LightrayWrite}`,
                  justifyContent: 'space-between',
                }}
              >
                <TextContent fontSize={13}>Market Cap</TextContent>
                <TextContent fontSize={13} fontWeight={500}>
                  {numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()]) || '∞'}
                </TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  borderBottom: `1px solid ${Colour.LightrayWrite}`,
                  justifyContent: 'space-between',
                }}
              >
                <TextContent fontSize={13}>24 Hour Trading Vol</TextContent>
                <TextContent fontSize={13} fontWeight={500}>
                  {numberWithCommas(coin?.market_data?.total_volume[currency.toLowerCase()]) || '∞'}
                </TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  borderBottom: `1px solid ${Colour.LightrayWrite}`,
                  justifyContent: 'space-between',
                }}
              >
                <TextContent fontSize={13}>Fully Diluted Valuation</TextContent>
                <TextContent fontSize={13} fontWeight={500}>
                  {numberWithCommas(coin?.market_data?.fully_diluted_valuation[currency.toLowerCase()]) || '∞'}
                </TextContent>
              </div>
            </div>
            <div style={{ width: '50%', marginLeft: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  borderBottom: `1px solid ${Colour.LightrayWrite}`,
                  justifyContent: 'space-between',
                }}
              >
                <TextContent fontSize={13}>Circulating Supply</TextContent>
                <TextContent fontSize={13} fontWeight={500}>
                  {numberWithCommas(coin?.market_data?.circulating_supply) || '∞'}
                </TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  borderBottom: `1px solid ${Colour.LightrayWrite}`,
                  justifyContent: 'space-between',
                }}
              >
                <TextContent fontSize={13}>Total Supply</TextContent>
                <TextContent fontSize={13} fontWeight={500}>
                  {numberWithCommas(coin?.market_data?.total_supply) || '∞'}
                </TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  borderBottom: `1px solid ${Colour.LightrayWrite}`,
                  justifyContent: 'space-between',
                }}
              >
                <TextContent fontSize={13}>Max Supply</TextContent>
                <TextContent fontSize={13} fontWeight={500}>
                  {numberWithCommas(coin?.market_data?.max_supply) || '∞'}
                </TextContent>
              </div>
            </div>
          </div>
        </CoinCapSummary>
        <CoinInfoLinks>
          <div>
            <TextContent fontSize={20} fontWeight={500}>
              Info
            </TextContent>
          </div>
          <div>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Website</TextContent>
              <CoinInfoLinkTag href={coin?.links?.homepage[0]}>{coin?.links?.homepage[0]}</CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Explorers</TextContent>
              <CoinInfoLinkTag href={coin?.links?.blockchain_site[0]}>Link</CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Community</TextContent>
              <div>
                <CoinInfoLinkTag href={coin?.links?.subreddit_url}>Reddit</CoinInfoLinkTag>
                <CoinInfoLinkTag href={`https://twitter.com/${coin?.links?.twitter_screen_name}`}>
                  Twitter
                </CoinInfoLinkTag>
                <CoinInfoLinkTag href={coin?.links?.telegram_channel_identifier}>Link</CoinInfoLinkTag>
                <CoinInfoLinkTag href={coin?.links?.official_forum_url[0]}>
                  {coin?.links?.official_forum_url[0]}
                </CoinInfoLinkTag>
              </div>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Search on</TextContent>
              <CoinInfoLinkTag href={`https://twitter.com/search?q=${coin?.links?.symbol}`}>
                Twitter search
              </CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Source Code</TextContent>
              <CoinInfoLinkTag href={`https://github.com/${coin?.id}`}>Github</CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>API id</TextContent>
              <CoinInfoLinkTag href={coin?.asset_platform_id}>Link</CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Tags</TextContent>
              <CoinInfoLinkTag href={coin?.categories[0]}>for each</CoinInfoLinkTag>
            </CoinInfoLinksList>
          </div>
        </CoinInfoLinks>
      </TopSection>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
            {user && (
              <Button
                variant="outlined"
                style={{
                  height: 40,
                  backgroundColor: inWatchlist ? 'red' : 'gold',
                }}
                onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              >
                {inWatchlist ? 'Remove from Wachlist' : 'Add to Watchlist'}
              </Button>
            )}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: 'flex' }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>

            <span style={{ display: 'flex' }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {symbol} {numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {symbol}{' '}
                {numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
              </Typography>
            </span>
          </div>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;

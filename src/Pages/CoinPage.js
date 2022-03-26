import { useEffect, useState } from 'react';
import { LinearProgress, Box, makeStyles, Typography, Button, Tooltip } from '@material-ui/core';
import axios from 'axios';
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
import AuthModalComp from '../components/Modal/Modal';
import { ModalState } from '../context/ModalContext';

const TopSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media only screen and (max-width: 930px) {
    flex-direction: column;
  }
`;
const CoinCapSummary = styled.div`
  width: 63%;

  @media (max-width: 930px) {
    width: 90%;
    margin: 0 auto 1rem auto;
  }
`;
const MarketShortInfo = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 685px) {
    flex-direction: column;
    > div {
      width: 100% !important;
      margin-left: 0px !important;
    }
  }
`;
const CoinInfoLinks = styled.div`
  width: 33%;
  @media only screen and (max-width: 930px) {
    width: 90%;
    margin: 0.5rem auto 1rem auto;
  }
`;
const CoinInfoLinksList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0.2rem auto;

  > span {
    display: flex;
    min-width: 30%;
  }
  > a,
  button {
    margin: 2px 4px 2px 0;
    padding: 4px 10px;
    border: 1px solid gold;
    border-radius: 0.375rem;
    background: ${Colour.DarkGrayBG};
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      color: ${Colour.DarkGrayWrite};
    }
  }
`;
const CoinInfoLinkTag = styled.a`
  display: inline-flex;
  margin: 2px 4px 2px 0;
  padding: 4px 10px;
  border: 1px solid gold;
  border-radius: 0.375rem;
  background: ${Colour.DarkGrayBG};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${Colour.DarkGrayWrite};
  }
`;
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [progress, setProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');

  const { currency, symbol, user, watchlist } = CryptoState();
  const { modalOpen } = ModalState();

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

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
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

  // if (modalOpen) return <AuthModalComp />;
  return (
    <>
      {modalOpen && <AuthModalComp />}
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
              {numberWithCommas(symbol, coin?.market_data?.current_price[currency.toLowerCase()])}
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

          <MarketShortInfo>
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
                  {numberWithCommas(symbol, coin?.market_data?.market_cap[currency.toLowerCase()]) || '∞'}
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
                  {numberWithCommas(symbol, coin?.market_data?.total_volume[currency.toLowerCase()]) || '∞'}
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
                  {numberWithCommas(symbol, coin?.market_data?.fully_diluted_valuation[currency.toLowerCase()]) || '∞'}
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
                  {numberWithCommas(symbol, coin?.market_data?.circulating_supply) || '∞'}
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
                  {numberWithCommas(symbol, coin?.market_data?.total_supply) || '∞'}
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
                  {numberWithCommas(symbol, coin?.market_data?.max_supply) || '∞'}
                </TextContent>
              </div>
            </div>
          </MarketShortInfo>
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
              <CoinInfoLinkTag href={coin?.links?.blockchain_site[0]}>Explore...</CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Community</TextContent>
              <div>
                <CoinInfoLinkTag href={coin?.links?.subreddit_url}>
                  <img
                    alt=""
                    style={{ width: '20px' }}
                    src="data:image/png;base64,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"
                  />
                  Reddit
                </CoinInfoLinkTag>
                <CoinInfoLinkTag href={`https://twitter.com/${coin?.links?.twitter_screen_name}`}>
                  <img
                    alt=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAADMUlEQVQ4jd2UXUxbdRjGf6c9rNSutXwUlZHpZGk6hrtZ1sQYNzAyP5bMuOGFNoQsMbp4NbxwiXBBRJRwsc0scYlcGBInMZMYdaMj0U02VCyROsPquhRtRU5XevpBv08p53jhwGkhu9bn8v345Xmff/KH/5U0TTMmk8ndqVTKoWmaeLsmrDucTqd3yLJ8zu/3d6wDEhOJRJ8sx/LemRvaTX9QW1xcXJAk6Uw8Hg9HIpFfh4aGGgDE1SVFUd4f/Wy6pe2J5sMej2eL0+kcWO0lEonTM97Q0ZEvf0LXsB0KOQyJhXr7w7VHJ76+Rv/bLqxW6xGgT/zbQfLxqz/OMz0rCcdebnk3EAjsE0XxdavVWkwmMq+OXPwF88FOEP66cKWQZ3r6W3KZHN9N3WTnzq0tQL/utgm9qqoYq6u551kXJ856+fzC9afRRJ+qqlNTnjlB98ijazAAfaUR40Pbue/BLbQ9uas4Ojo6BqgigCAISjweT5nUfNWKqmJ56jCBxVv0f+hhU2GpNiFFsD7fVJa7Gg5x7LU23BfPnxkcHPxgLcNoNGouKiVr4Gc/ltIF6g60Y6i7H0PdQQDqNnh1IZehpsaM2+3+AkgD6ABsNltarNBJ9fZt2J45tMF6ufTZBJXGiuzY2Ngfq7XVDIlGoyc6X3CSOv8xSky+K6yUzWKzbCIYDHoVRYmUAR0Ox3tNTQ1KKhRE8V+7KzDvucRL7XsYHx93A0tlQEEQVmKx2CcvuloRlByqUtgQpsz/hv3eEhqF2Z6enrN39nQAqVTKLsvyR2azuX5/2y4OOWsJnOxDuSWVwxZCGGev0Ol6LN3d3d0P/H5nXwCQZfnc5cvX27+5eoMKs4Ws3oRhTwviZvPaoLZcJPvDJbaKGV45sjdz6tTJtwYGBk4D/zhFBAiHw5/u29t0IJtfNn4/E0I1Gcj5vOgrKyGzBMkoVQYN13O7qa6qCBw//sY7w8PDI/+GrTkE6O3ttbe2tr7Z2Ni4X6ereCAsxVkulqiptWCtMi2Hw9Ls5OTkV11dXUOKogQAbb181/t6Nnd0dDiam5t36PV609zcnDQxMTHv8/nmgdhGoP+O/gQKfmtWuck+iwAAAABJRU5ErkJggg=="
                  />
                  Twitter
                </CoinInfoLinkTag>
                <CoinInfoLinkTag href={`https://facebook.com/${coin?.links?.facebook_username}`}>
                  <img
                    alt=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACYklEQVQ4jb2TP2hTURTGv3vzqhRDaYutbWyNtYipxU0FFxcj6ipdHERwLNKhYKXg8JaiFJx0ENShgouICI4ODlEc6p8KUsQqQoiNTW3SkNqY93K/49C+5OUlsQjimQ68j9875/7uBf5xqT9+tUUP7Vs7aAz3lAEoY5JfUh3zsBX/Cjj8MN/JUmiC5AUR6SEFpEBEQEraUGa0WNPJ0fbclsChB4XjIB6R0rUJ8MP8fUaIkfRYd6IpcBP2jJRtW8C83qFhfHk8kqgDbqypPzaarHO7wuUjrTjcY2FbCHjyqYSplwUvkyk7biw/Gc0BgOUB6YSukGy45s0TYRyLtFQ2iYS1L8NuhPQEgMnqhLboAwOFbw0EoKtVYfZ8BwDgztw67r5fR6FEZNYMROhll/LF/ghsRQ0AsejP4UYwUrB7R/WY738o4muuHISBlF1hnRwCAA0A1KavmQDLp63oeBDWZxX7K2doCJFA4OTeFtw73VZzpV5f7AIA3Jot4Orz1ZofG0KqUoxJiaAmIE3fArCQdevEiTKpGinR3myKlF4vEG4Bom0hHNpp4UZ8Y9Jzj38gvWbwecXFatH4NuKiYw/2AUr0BlDRUGb8K+d/EXPfHSxk3cpk88su3i6WAjABoGYAJRUpAKDFmiYlEzxsiFSAlAbiIEsO9HSF4zXJ0facECMi4vguLegDBsUJpCSuGoE9sFoHBID0WHeChnFSMv6rUQEGJhNXxctTgy/8jBogACyPRxJlx40ZynWIpP1ATwCAay5CsSCsarlZ2aLPxrJHz+y3TgEat1+tPH1zKfrOE/Bf6jfqoGfDhy3C+QAAAABJRU5ErkJggg=="
                  />
                  Facebook
                </CoinInfoLinkTag>
                <CoinInfoLinkTag href={`https://t.me/${coin?.links?.telegram_channel_identifier}`}>
                  <img
                    alt=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACjklEQVQ4jb3TS0hVURTG8f8+nmNWKFzBR2aWoKlJhYGERA3iTiJoEM2ywqhJNCrQScSdFc2CoGFIBA0aNBTKkTWLHlDaQzIf+YI8KaIe795rNdB7vQ9Lg2hNzoYNv7PX/taGf1zmj7sJ9Q60hftUqAGLdf7IwKtYPwkjfwW29cyWLvuu0zouqGiliKJOEVFEdEJFu5ei6M7I2d3hhmBLb3jMwBNxWiarSAaGOEVXvtPqODN0rqrvt2BLb3jMKM9EtHADbGVPWBZn4qMda2gabOuZLY0C+biJk6Ww1Hq6IJLGkSsr7XspMPJd10aYn4w4UeZoLU6mYXFanjR0phwvlaZznF8Xs0Klt8y1vQW8PL2Te/FqTu7ZlvUjJ9pBQj0AH2D/kbBZbXaaai2txUp7/Xbieyr4Gi6RFAXg26zNvYKK0pLBphn44AOQpFp0BQtsxKkdPu0NMepjRVhR7r+eYosxXD5UAcCnmQgVb61tUcDsAj54AKKq6hRxjku1ATcPl1MfK+LTzCKnnw6xzS9IYwCfQ5uFqVOsqKZbFjVjiCJquPvF8eDzKNVb4X0oXG3azsWDZWlsISl8nxPEy7lvy1g6lIFXsX4RnRCnqBpCF/BuzscS0Du8wOhclAYHfyxi1cvGnI7Pd9X1Z6RsREW78+ZM4M1cwPHHY3S/nUaBd5MLCF4mhgjdGKNZg13zaDjmm+CjiJZnDO1amklLc4llcl6YjAozMJ0KoqDxZ6L2Z97Tq304flRUn4vTwvVeR06biGgkTuOLNxpeZA/2ag2dq+oTZ+IiOr0JbCoXywMBRjuq+goiacTpbXE6sQ42LsKtIAoac7G8lvMqoV5pyWCTGlPjHAg6PH+9biAVwH+pX7P1ii40Ycg2AAAAAElFTkSuQmCC"
                  />
                  Telegram
                </CoinInfoLinkTag>
                <CoinInfoLinkTag href={coin?.links?.official_forum_url[0]}>
                  {coin?.links?.official_forum_url[0]}
                </CoinInfoLinkTag>
              </div>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Search on</TextContent>
              <CoinInfoLinkTag href={`https://twitter.com/search?q=${coin?.links?.symbol}`}>
                <img
                  alt=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACVUlEQVQ4ja2UTUhUURiGn+86TXPvHQdCK/rBwlJcJVH0XyhSRIRGUgvpR0nQEoJqUbSIoWVERS0yDCKiTS0Eq1X0u6goK8gKF0FtosJISRqbe86dr5U1laOj9e7OOc/3cL7DOQf+cyTnSlKdOQNMHwz59uWMfJ2wsKJNiwI4LBmmAh+BGDBNlBtv2uXSWEIne1DZqrMiAee9NNc8i/FDSjzLbM/y0jV4C5r15LiE0YDjfshZz9K8poauuh086umQza7lgR9SUxjyammTbstLWLVdF3uG57E0LU313FtaRGf5EDsBHl+Q267hXNQwJR6wMS+hZ1gRD3gbD3lVCQfnDyHzUr/AO5flVtywzLX01dZqYS5h5KfQ4qoiBdA/M2CrhIhGSGXDnsUgpKIFuMDg6MI0vU4BCVWWzK2Xvw6/uVanhwGD4jCjZCGf6Ryj5Rjc9AwbXUNv2wbdng3t26LuZMvpqKHTM3xIJiWTq+Xf7uGBdbpJleUIKQcqUJ6IMAWoVOhAabSGXafuykBeQoAj1VonQoOF645gFKyTocyBMiBBMQ304VBFMNJOR3x6J5arayaxVqFcoF/h8aH70nNsta5UZa8IUVFSiSEaW56Kya6NjCTc/1CGgK4/531LiSqfHOWlCjU2whlFdwuiw4zzZ9FocQMq/JAizxLzLS/8kMTFRSSzmXEJ46UcdQNCz7LKM7xu7JYG15C+skDXT0i49aqEfoRW1+L4Ac8A4hmeeIbSYSb3fzhK7pRrsQrtwHugUNLsqX4n3yfi+hlFpbtci/9Jkk9+AJjI2eRb3xXVAAAAAElFTkSuQmCC"
                />
                Twitter search
              </CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Source Code</TextContent>
              <CoinInfoLinkTag href={`https://github.com/${coin?.id}`}>
                <img
                  alt=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAADgklEQVQ4ja2US0xcZRTHf9+dYV5wB7BjYYwpUBh5iYRShBmMURsflal1YepOdyyL6crZ6a4LVxq7m8TUIKY7GzphIcWmtIbh1ZYyPEpCFZiWV+kdbse5M869LuYB0k7jwpPc3NzvfN/vnPM/57vwP5so5FBVtcIwjNOJROKErutVhmEIXddXDcMYcTqdl2RZ3vhPQMMw7IqifJXUUmevX4vYwuNLaFoaAKvVRGenB193fTK2qwQ9Hs85IUSiIFBV1cpUKnVlZPjusVBoGuGoxFHqQggpG0wnrmxB/CEf+o9xvKNqfm1t7d2urq7VHMO0LzNbPB7/9ceLv7XfCD+gpKIei60YIfZiCiGw2IqxyBXMzizzeGvb1fF6/UcNDQ0XBwcHNQApt1lRlK9Hhu+2z8wpFLuqC0mbtxJXFbcjCpMTf9a1tLR8l1uXcg1IaqmzodB0HlbmtFBzRH4KZCmSeLWhHCGg5MVqrgxOU3u07kwgEGgCMGfL/fj6tYhNOCrzBxtfKePkOy/zYP0vDAwcdjOPlSQvlFtxlhTxzQWVmJpC2Cu4OTpv9Xq9nwFfmgE0TTsRHl/CUVqzT6/M211hz6+VOS1P+R2lLsbG7vHJp60+INO+dDp9JJFI57sJ4G0//FwNu7J+IUkktDSyLB8C7FK2ZPY1EyHAKVuexdnLtvTffl3XAYqk7EfUajVhGDqZALCjaM8Fbj/K+A1dx2Y1oarqIyCRy/BqZ6cnM7RZuzoaxTCeDdtVU4RvZfbGlS06uzxEIpE7gCYBOJ3OS743GpNGfB2A+tpSlFiKCz/McSO8ngfvKElCwyt8G4wQ201m5Els4Otu0AYGBi5Ddg5lWd6IxXaCPf421K0/uLcc4+1uN+7DdtL6nr7FDjNjU5v5u/1k8z49p9qYmp4MDQ0N/Q7ZOQTweDznbDbbW6srm423I8v8MlTEm95KDpXb8qVaiiTMZolUSufJ5n1am8p5rfWlZb+/9zwQy2cIIIRIRKPR906dblvwv1/HytwkP/08wcStvb/U36k0se2HqNE7+E96+KCneam3t/eL2dnZ8TznoODBYFBubm7+vqb66Jmbo/PWsfASejqNSRKYzCaOd9Ti7W7UpqYmQn19fecXFxfHAaMgMGeBQKDJ5/N97na7vbIsuwAURdlaWFiY6e/vv5zVLHbwXEHggT02wAoksk9B+wdYWXhyoCY26AAAAABJRU5ErkJggg=="
                />
                Github
              </CoinInfoLinkTag>
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>API id</TextContent>
              <Tooltip
                title="Copy to clipboard"
                arrow
                placement="top-start"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <button onClick={() => copyToClipBoard(coin?.id)}>
                  <TextContent fontSize={16}>{coin?.id}</TextContent>
                  <img
                    alt=""
                    style={{ width: '24px' }}
                    src={
                      copySuccess === ''
                        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADc0lEQVR4nO2az08TQRTH3267EoGU8iNFq2C7BXaRSqGaiCZtvfojgeD/wImrNw4cvBA5mOjBgBgNkhhIjTFE0URIEKL8iAVMSiK/QkJraGi6pQFKoV0PwlIrSqdMGQ3zOe1MZt5+33en+zbpA6BQKBQK5djCpLKpwVxn8kYCzrmw1xzcXlPhFpVIviYnKhr5yVN52toHXV1LOGMjG9BgrjONhr65fVvSCZxCkuGMrnDzYmmJ6VFPjwdXTBZ1g2fd7ySRPACAx7ecEdjY7MUZU426YS7y3bx73aC/BfYCC6g5NTAcA4yaBUbNAMOxwKp3xnHzLMf+vobbGcevVTHKXIyRoW9sCFo6OwAAYHph7gLG/NFPQCi2ofzmbdpKYBnkEEioWBauX7EpY78kYX3nIKuXQd7bnObkd1Gxe/eRZfkvK9E5mgz+YZDfAQcRiqxDt7sfRgJuCGyFcIcHAAC9Xq8cg3xNTlTkTV8FvaH+7uOHC6ixsJ6AUGQdmsbboM83krbkE/GvBlXDE1+q3o0PTzc1NhpR92M1oHv2A3gjfpwhk8bjW86YWVx0ou7D+hMYCU4r16mVyN35nbmENQx3QImcna9E1Yz1BASja8o1kRK5il4isSr8H0vksS+D1ADSAkhDDSAtgDTUANICSEMNIC2ANNQA0gJIQw0gLYA01ADSAkhDDSAtgDTUANICSEMNIC2ANNQA0gJIQw0gLYA0yAYwcX1VMTmGVQwJkP8c1bCZ0WDsZ2vcoDQFjgILsGk+SE8GXkH3p/ewHY1ij41sAJ9xetK1MWsFAGj39kK7F2vT1r4kmzzLoLc9Ij86bVZBrY7TbiLf6RAk++QtgojcP4hsQNfUyyUxr4S3ZpdN5Kqz8Z/JAxho6YD+1g64UWP7Zb7caJKuWautqPFSapB44XrtBYDqxPn43p10Icsy3Hc+hzefPypzwjlD8PIlq3intdWHGg97k1S6ued8Cm/HhpSxaOAl+9UaoTmF5AEwfwccRYmMT14oNgbs5vOlqSYPgNkADZupvBMGpam0ficIxcaAo7KirLmtbeUwcVJql/8TN3mHyxWeqcIZcz+EIkPAYTEfOnkAzCfAmK2rL+Ry01oihbP4kgcAwNp4PLrslm7zts4s5qQjHIvowrEIVoPLi/gVu6lCbH6GJ3kKhUKhUI45PwC4jQtyU243HQAAAABJRU5ErkJggg=='
                        : 'data:image/png;base64,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'
                    }
                  />
                </button>
              </Tooltip>
              {/* <CoinInfoLinkTag href={coin?.asset_platform_id}>Link</CoinInfoLinkTag> */}
            </CoinInfoLinksList>
            <CoinInfoLinksList>
              <TextContent fontSize={13}>Tags</TextContent>
              {coin?.categories.map((dat, i) => {
                return (
                  <CoinInfoLinkTag href={`https://www.google.com/search?q=${dat}`} target="_blank" key={i}>
                    {dat}
                  </CoinInfoLinkTag>
                );
              })}
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
              <Typography variant="h6" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span style={{ display: 'flex' }}>
              <Typography variant="h6" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {numberWithCommas(symbol, coin?.market_data?.current_price[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant="h6" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {numberWithCommas(
                  symbol,
                  coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                )}
                M
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

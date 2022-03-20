import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../../config/api.js';
import { CryptoState } from '../../CryptoContext.js';
import { numberWithCommas } from '../../lib/helpers.js';
import DataTable from '../dataTable';

const WishlistTable = () => {
  const [wishlistDataTBL, setWishlistDataTBL] = useState([]);
  const { symbol, currency, watchlist, coins } = CryptoState();
  let wishlistArray = [];
  useEffect(() => {
    (() => {
      coins.filter((coin) => {
        if (watchlist.includes(coin.id)) {
          console.log(coin);
          return wishlistArray.push(coin);
          // return setWishlistDataTBL([...wishlistDataTBL, coin]);
        }
        return false;
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(wishlistArray);

  return (
    <>
      <DataTable dataTBL={wishlistArray} />
      {/* {coins.map((coin) => {
        if (watchlist.includes(coin.id)) return <DataTable dataTBL={wishlistDataTBL} />;
        else return <></>;
      })} */}
    </>
  );
};

export default WishlistTable;

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { CoinList } from './config/api';
import { auth, db } from './firebase';
import { doc, onSnapshot } from '@firebase/firestore';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('NGN');
  const [symbol, setSymbol] = useState('₦');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      const coinRef = doc(db, 'watchlist', user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists) {
          setWatchlist(coin.data().coins);
          console.log(coin.data().coins);
        } else {
          console.log('No items in the watchlist');
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    if (currency === 'NGN') setSymbol('₦');
    else if (currency === 'USD') setSymbol('$');
    fetchCoins();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  console.log({ coinlist: coins });
  console.log({ watch: watchlist });
  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@material-ui/core';
import axios from 'axios';
import { CoinList } from '../../config/api';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import { numberWithCommas } from '../../lib/helpers';
import Colour from '../../lib/color';

const DataTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        color: 'gold',
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '1h Change', '24h Change', '7d Change', 'Total Vol', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 20 + 20)
                  .map((row) => {
                    {
                      /* const profit = row.price_change_percentage_24h > 0; */
                    }
                    const profitLoss = (price) => {
                      if (price >= 0.5) {
                        return Colour.GreendWrite;
                      } else if (price >= 0.15) {
                        return Colour.GreendWrite;
                      } else if (price >= 0.05) {
                        return Colour.BlueWrite;
                      } else if (price >= 0.0) {
                        return Colour.PurpleWrite;
                      } else if (price >= -0.09) {
                        return Colour.PinkWrite;
                      } else if (price < -0.09) {
                        return Colour.RedWrite;
                      }
                    };
                    return (
                      <TableRow onClick={() => history.push(`/coins/${row.id}`)} className={classes.row} key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price.toString())}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: `${profitLoss(row.price_change_percentage_1h_in_currency)}`,
                            fontWeight: 500,
                          }}
                        >
                          {row.price_change_percentage_1h_in_currency.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: `${profitLoss(row.price_change_percentage_24h_in_currency)}`,
                            fontWeight: 500,
                          }}
                        >
                          {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: `${profitLoss(row.price_change_percentage_7d_in_currency)}`,
                            fontWeight: 500,
                          }}
                        >
                          {row.price_change_percentage_7d_in_currency.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.total_volume.toString())}
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.market_cap.toString())}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default DataTable;

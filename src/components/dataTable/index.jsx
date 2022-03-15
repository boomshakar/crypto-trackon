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
import ChartJsImage from 'chartjs-to-image';
import { CoinList } from '../../config/api';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import { getChartUri, numberWithCommas } from '../../lib/helpers';
import Colour from '../../lib/color';

const DataTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles({
    tableHaed: {
      '& .MuiTableCell-head': {
        color: Colour.LightrayWrite,
        backgroundColor: Colour.LightGrayBG,
      },
    },
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      // height: '100px',
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

  ((str) => {
    const myChart = new ChartJsImage();
    myChart.setConfig({
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        datasets: [
          {
            data: [
              38360.23140030268, 38665.02487425728, 38946.022921521035, 38990.64833695661, 39060.35262308791,
              38854.68221821108, 38830.4807462585, 38088.635146086766, 37387.923708175374, 37626.91418746491,
            ],
            fill: false,
            backgroundColor: 'transparent',
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
    myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
    console.log(myChart.getUrl());
  })();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };
  const columns = [
    {
      id: 'coin',
      label: 'Coin',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'price',
      label: 'Price',
      minWidth: 120,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: '1h',
      label: '1h',
      minWidth: 70,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: '24h',
      label: '24h ',
      minWidth: 70,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: '7d',
      label: '7d ',
      minWidth: 70,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'totalVolume',
      label: 'Total Volume',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'marketCap',
      label: 'Market Cap',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: '1dChart',
      label: '1d Chart',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
  ];

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
        <Paper>
          <TableContainer style={{ maxHeight: 500 }}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: 'gold' }} />
            ) : (
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow className={classes.tableHaed}>
                    {columns.map((head) => (
                      <TableCell
                        style={{
                          // color: 'black',
                          fontWeight: '700',
                          fontFamily: 'Montserrat',
                          minWidth: head.minWidth,
                        }}
                        key={head.id}
                        align={head.align}
                      >
                        {head.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 20 + 20)
                    .map((row) => {
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
                        <TableRow
                          onClick={() => history.push(`/coins/${row.id}`)}
                          className={classes.row}
                          // hover
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: 'flex',
                              gap: 15,
                              alignItems: 'center',
                            }}
                          >
                            <img src={row?.image} alt={row.name} height="24" />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ color: Colour.DarkGrayWrite, fontSize: '12px', marginRight: '8px' }}>
                                {row.name}
                              </span>
                              <span
                                style={{
                                  textTransform: 'uppercase',
                                  color: Colour.LightrayWriteBold,
                                  fontSize: '8px',
                                  marginTop: '2px',
                                }}
                              >
                                {row.symbol}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right" style={{ fontSize: '12px', color: Colour.LightrayWriteBold }}>
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
                          <TableCell
                            align="right"
                            style={{
                              fontSize: '12px',
                              color: Colour.LightrayWriteBold,
                            }}
                          >
                            {symbol} {numberWithCommas(row.total_volume.toString())}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontSize: '12px',
                              color: Colour.LightrayWriteBold,
                            }}
                          >
                            {symbol} {numberWithCommas(row.market_cap.toString())}
                          </TableCell>
                          <TableCell style={{ color: Colour.LightrayWriteBold }}>
                            {getChartUri(
                              row.sparkline_in_7d.price,
                              profitLoss(row.price_change_percentage_7d_in_currency)
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={Number((handleSearch()?.length / 10).toFixed(0))}
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

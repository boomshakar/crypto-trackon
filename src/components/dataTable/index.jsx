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
import { getChartUri, numberWithCommas, profitLoss } from '../../lib/helpers';
import Colour from '../../lib/color';
import TextContent from '../textContent';
import styled from 'styled-components';

const CustomInput = styled.input`
  visibility: hidden;
  cursor: pointer;

  &:before {
    position: absolute;
    top: 50%;
    left: 70%;
    ${'' /* font-size: 15px; */}
    transform: translate(-50%, -50%);
    ${'' /* content: '☆'; */}
    content: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.8925 7.81178C17.0503 7.66199 17.1622 7.47043 17.2153 7.25944C17.2684 7.04846 17.2604 6.82673 17.1923 6.62011C17.1235 6.41157 16.9974 6.22656 16.8285 6.0862C16.6597 5.94584 16.4547 5.85578 16.2371 5.82628L12.2423 5.25428C12.1589 5.2426 12.0795 5.21091 12.0111 5.1619C11.9426 5.11289 11.887 5.04803 11.849 4.97286L10.0615 1.3997C9.96161 1.20426 9.80966 1.04022 9.62243 0.925666C9.4352 0.81111 9.21998 0.750488 9.00048 0.750488C8.78099 0.750488 8.56576 0.81111 8.37853 0.925666C8.19131 1.04022 8.03936 1.20426 7.93944 1.3997L6.15286 4.96828C6.1149 5.04345 6.0593 5.10831 5.99082 5.15732C5.92233 5.20632 5.84301 5.23802 5.75961 5.2497L1.76477 5.8217C1.54716 5.85119 1.34222 5.94126 1.17334 6.08162C1.00445 6.22198 0.878413 6.40699 0.809608 6.61553C0.741484 6.82215 0.733491 7.04387 0.786563 7.25486C0.839634 7.46585 0.951582 7.6574 1.10936 7.8072L3.99961 10.5847C4.06043 10.6428 4.10597 10.7151 4.13219 10.795C4.15842 10.875 4.16451 10.9602 4.14994 11.043L3.46794 14.9654C3.43709 15.1324 3.44422 15.3041 3.48882 15.4678C3.53341 15.6316 3.61431 15.7832 3.72552 15.9114C3.90225 16.1145 4.14176 16.2527 4.406 16.304C4.67025 16.3553 4.94406 16.3168 5.18394 16.1947L8.75894 14.343C8.83445 14.3051 8.9178 14.2853 9.00232 14.2853C9.08683 14.2853 9.17018 14.3051 9.24569 14.343L12.8207 16.1947C13.0599 16.3196 13.3345 16.3596 13.5994 16.3082C13.8644 16.2567 14.104 16.1168 14.2791 15.9114C14.3903 15.7832 14.4712 15.6316 14.5158 15.4678C14.5604 15.3041 14.5675 15.1324 14.5367 14.9654L13.8547 11.043C13.84 10.9602 13.8461 10.875 13.8723 10.795C13.8985 10.715 13.9441 10.6428 14.005 10.5847L16.8925 7.81178Z' fill='%23C4C4C4'/%3e%3c/svg%3e ");
    color: transparent;
    visibility: visible;
  }

  &:checked:before {
    ${'' /* content: '★'; */}
    content: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='15' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.8925 7.81178C17.0503 7.66199 17.1622 7.47043 17.2153 7.25944C17.2684 7.04846 17.2604 6.82673 17.1923 6.62011C17.1235 6.41157 16.9974 6.22656 16.8285 6.0862C16.6597 5.94584 16.4547 5.85578 16.2371 5.82628L12.2423 5.25428C12.1589 5.2426 12.0795 5.21091 12.0111 5.1619C11.9426 5.11289 11.887 5.04803 11.849 4.97286L10.0615 1.3997C9.96161 1.20426 9.80966 1.04022 9.62243 0.925666C9.4352 0.81111 9.21998 0.750488 9.00048 0.750488C8.78099 0.750488 8.56576 0.81111 8.37853 0.925666C8.19131 1.04022 8.03936 1.20426 7.93944 1.3997L6.15286 4.96828C6.1149 5.04345 6.0593 5.10831 5.99082 5.15732C5.92233 5.20632 5.84301 5.23802 5.75961 5.2497L1.76477 5.8217C1.54716 5.85119 1.34222 5.94126 1.17334 6.08162C1.00445 6.22198 0.878413 6.40699 0.809608 6.61553C0.741484 6.82215 0.733491 7.04387 0.786563 7.25486C0.839634 7.46585 0.951582 7.6574 1.10936 7.8072L3.99961 10.5847C4.06043 10.6428 4.10597 10.7151 4.13219 10.795C4.15842 10.875 4.16451 10.9602 4.14994 11.043L3.46794 14.9654C3.43709 15.1324 3.44422 15.3041 3.48882 15.4678C3.53341 15.6316 3.61431 15.7832 3.72552 15.9114C3.90225 16.1145 4.14176 16.2527 4.406 16.304C4.67025 16.3553 4.94406 16.3168 5.18394 16.1947L8.75894 14.343C8.83445 14.3051 8.9178 14.2853 9.00232 14.2853C9.08683 14.2853 9.17018 14.3051 9.24569 14.343L12.8207 16.1947C13.0599 16.3196 13.3345 16.3596 13.5994 16.3082C13.8644 16.2567 14.104 16.1168 14.2791 15.9114C14.3903 15.7832 14.4712 15.6316 14.5158 15.4678C14.5604 15.3041 14.5675 15.1324 14.5367 14.9654L13.8547 11.043C13.84 10.9602 13.8461 10.875 13.8723 10.795C13.8985 10.715 13.9441 10.6428 14.005 10.5847L16.8925 7.81178Z' fill='%23FFD559'/%3e%3c/svg%3e");
    color: ${Colour.YelloWrite};
  }
`;

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
      id: '#',
      label: '#',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
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
      <div style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}>
        {/* <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Cryptocurrency Prices by Market Cap
        </Typography> */}
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
                      return (
                        <TableRow
                          className={classes.row}
                          // hover
                          key={row.name}
                        >
                          <TableCell
                            style={{
                              fontSize: '12px',
                              color: Colour.LightrayWriteBold,
                              // display: 'flex',
                              // flexDirection: 'row',
                              // justifyContent: 'center',
                              position: 'relative',
                            }}
                            align="center"
                          >
                            {/* <TextContent>{row.market_cap_rank}</TextContent> */}
                            {row.market_cap_rank}
                            <CustomInput type="checkbox" />
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            component="th"
                            scope="row"
                            style={{
                              display: 'flex',
                              gap: 15,
                              alignItems: 'center',
                            }}
                          >
                            <img src={row?.image} alt={row.name} height="24" style={{ borderRadius: '50%' }} />
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
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            align="right"
                            style={{ fontSize: '12px', color: Colour.LightrayWriteBold }}
                          >
                            {symbol} {numberWithCommas(row.current_price.toString())}
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            align="center"
                            style={{
                              color: `${profitLoss(row.price_change_percentage_1h_in_currency)}`,
                              fontWeight: 500,
                            }}
                          >
                            {row.price_change_percentage_1h_in_currency.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            align="center"
                            style={{
                              color: `${profitLoss(row.price_change_percentage_24h_in_currency)}`,
                              fontWeight: 500,
                            }}
                          >
                            {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            align="center"
                            style={{
                              color: `${profitLoss(row.price_change_percentage_7d_in_currency)}`,
                              fontWeight: 500,
                            }}
                          >
                            {row.price_change_percentage_7d_in_currency.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            align="right"
                            style={{
                              fontSize: '12px',
                              color: Colour.LightrayWriteBold,
                            }}
                          >
                            {symbol} {numberWithCommas(row.total_volume.toString())}
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            align="right"
                            style={{
                              fontSize: '12px',
                              color: Colour.LightrayWriteBold,
                            }}
                          >
                            {symbol} {numberWithCommas(row.market_cap.toString())}
                          </TableCell>
                          <TableCell
                            onClick={() => history.push(`/coins/${row.id}`)}
                            style={{ color: Colour.LightrayWriteBold }}
                            align="center"
                          >
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
      </div>
    </ThemeProvider>
  );
};

export default DataTable;

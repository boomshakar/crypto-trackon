import { makeStyles } from '@material-ui/core';
import Homepage from './Pages/HomePage';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import CoinPage from './Pages/CoinPage';
import Header from './components/Header';
import HeaderN from './components/HeaderN';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div>
        <Header />
        <HeaderN />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;

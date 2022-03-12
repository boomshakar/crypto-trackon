import { makeStyles } from '@material-ui/core';
import Homepage from './Pages/HomePage';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CoinPage from './Pages/CoinPage';
import Header from './components/Header';
import Home from './Views/Home';
import CoinView from './Views/CoinPage';
import { routes } from './components/navigation/routes';
import Layout from './components/layout';

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
      <div className={classes.App}>
        <Header />
        <Layout>
          <Switch>
            <Route path={routes.home} component={Homepage} exact />
            <Route path={routes.CoinPage} component={CoinPage} exact />
            <Route path={routes.newHome} component={Home} exact />
            <Route path={routes.newCoinPage} component={CoinView} exact />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;

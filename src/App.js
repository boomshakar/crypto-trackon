import { makeStyles } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import Homepage from './Pages/HomePage';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CoinPage from './Pages/CoinPage';
import Header from './components/Header';
import Home from './Views/Home';
import CoinView from './Views/AssetPage';
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
        {/* <Header /> */}

        <Layout>
          <Switch>
            <Route path={routes.coinPage} component={CoinPage} exact />
            <Route path={routes.newCoinPage} component={CoinView} exact />
            <Route path={routes.newHome} component={Home} exact />
            {/* <Route path={routes.home} component={Homepage} exact /> */}
          </Switch>
        </Layout>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;

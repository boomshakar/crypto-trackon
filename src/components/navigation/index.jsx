import { authContext } from "../authWrapper";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../../views/login";
import Layout from "../layout";
import React from "react";
import { routes } from "./routes";
import ForgotPassword from "../../views/forgotPassword";
import Dashboard from "../../views/dashboard";
import Users from "../../views/users";
import Admin from "../../views/admin";
import Playlist from "../../views/playlist";
import Songs from "../../views/songs";
import NewSong from "../../views/newSong";
import ViewPlaylist from "../../views/viewPlaylist";
import Bundles from "../../views/bundles";
import Transactions from "../../views/transactions";
import Settings from "../../views/settingsView";
import TrialView from "../../views/settingsView/TrialView";

export default function Navigation() {
    const authorizationContext = React.useContext(authContext);

    if (!authorizationContext.user) {
        return (
            <Switch>
                <Route exact path={routes.home} component={Login} />
                <Route exact path={routes.login} component={Login} />
                <Route
                    exact
                    path={routes.forgotPassword}
                    component={ForgotPassword}
                />
                <Redirect to={routes.login} />
            </Switch>
        );
    }

    return (
        <Layout>
            <Switch>
                <Route exact path={routes.dashboard} component={Dashboard} />
                <Route exact path={routes.users} component={Users} />
                <Route
                    exact
                    path={routes.viewPlaylist}
                    component={ViewPlaylist}
                />
                <Route exact path={routes.playlist} component={Playlist} />
                <Route exact path={routes.newSong} component={NewSong} />
                <Route exact path={routes.songs} component={Songs} />
                <Route exact path={routes.admin} component={Admin} />
                <Route exact path={routes.bundles} component={Bundles} />
                <Route
                    exact
                    path={routes.transactions}
                    component={Transactions}
                />
                <Route exact path={routes.settings} component={Settings} />
                <Route
                    exact
                    path={routes.settingsFreeTrial}
                    component={TrialView}
                />
                <Redirect from={routes.home} to={routes.dashboard} />
                <Redirect to={routes.dashboard} />
            </Switch>
        </Layout>
    );
}

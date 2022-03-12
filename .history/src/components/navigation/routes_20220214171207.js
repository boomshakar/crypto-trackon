export const routes = {
    home: "/",
    dashboard: "/dashboard",
    login: "/login",
    passwordReset: "/password/reset",
    forgotPassword: "/password/forgot",
    users: "/user",
    viewPlaylist: "/playlist/:playlistId",
    playlist: "/playlist",
    newSong: "/song/add",
    songs: "/song",
    admin: "/admin",
    transactions: "/transaction",
    bundles: "/bundle",
    settings: "/settings",
    settingsFreeTrial: "/settings/free-trial", //could later change to settings/:id
};

export function generateParamUrl(url, param) {
    const firstIndex = 0;
    return `${url.split(":")[firstIndex]}${param}`;
}

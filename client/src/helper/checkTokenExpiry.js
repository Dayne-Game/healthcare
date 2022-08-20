export const checkTokenExpiry = () => {
    var user = JSON.parse(localStorage.getItem('user'));

    let exp = user.tokenInfo.expiry - 120; // Minus 2 Minutes off the expiry.

    if(Date.now() >= exp * 1000) {
        localStorage.clear();
        document.location.href = "/login";
        return true;
    }
}
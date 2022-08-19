import CryptoJS from "crypto-js";


const decryptToken = (token) => {

    // Decoded Token
    let decrypt = CryptoJS.AES.decrypt(token, process.env.CRYPTO_SECRET);
    // Get actual token
    let actual_token = decrypt.toString(CryptoJS.enc.Utf8);

    // Return actual Token
    return actual_token;
};

export default decryptToken;
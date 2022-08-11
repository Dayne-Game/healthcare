import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";


const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    let encrypt_token = CryptoJS.AES.encrypt(token.toString(), process.env.CRYPTO_SECRET);

    return encrypt_token.toString();
};

export default generateToken;
import jwt, { decode } from "jsonwebtoken";
import CryptoJS from "crypto-js";

const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "10s"});

    const { exp } = decode(token);
    console.log(exp);
    let encrypt_token = CryptoJS.AES.encrypt(token.toString(), process.env.CRYPTO_SECRET);

    return {token: encrypt_token.toString(), expiry: exp};
};

export default generateToken;
import CryptoJS from "crypto-js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';


const decryptTokenID = (token) => {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let decrypt = CryptoJS.AES.decrypt(decoded.dW5kZWZpbmVk, process.env.CRYPTO_SECRET);
    const token_id = decrypt.toString(CryptoJS.enc.Utf8);

    const decrypted_id = mongoose.Types.ObjectId(token_id);

    return decrypted_id
};

export default decryptTokenID;
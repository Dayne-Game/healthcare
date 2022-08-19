import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import decryptToken from "../utils/decryptToken.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Grab token from auth header
      token = req.headers.authorization.split(" ")[1];
      // Feed the token into the decrypter
      const decrypted_token = decryptToken(token);
      // Verify the decrypted token
      const decoded = jwt.verify(decrypted_token, process.env.JWT_SECRET);
      // store user data into req.user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export {protect};
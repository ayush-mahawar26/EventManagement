const User = require("../models/user_model.js");
const { ApiResponse } = require("../utils/ApiReponse.js");
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "No token found !!"));

    const isTokenValid = await jwt.verify(token, process.env.JWT_SECURE);

    if (!isTokenValid)
      return res.status(400).json(new ApiResponse(400, {}, "Invalid token"));

    const user = await User.findById(isTokenValid.id).select(
      "-password -refreshToken"
    );
    if (!user)
      return res.status(400).json(new ApiResponse(400, {}, "Not valid user"));

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, error.message));
  }
};

module.exports = { verifyJwt };

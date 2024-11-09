const { ApiResponse } = require("../utils/ApiReponse.js");
const User = require("../models/user_model.js");
const jwt = require("jsonwebtoken");
const z = require("zod");

const express = require("express");
const authRouter = express.Router();

const signinBody = z.object({
  useremail: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
const signupBody = z.object({
  name: z.string(),
  isAdmin: z.boolean().default(false),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// auth signin
authRouter.post("/signin", async (req, res) => {
  const body = req.body;
  console.log(body);

  const user = await User.findOne({
    email: body["email"],
  });

  if (user === null || user === undefined) {
    return res.json(new ApiResponse(400, {}, "No user exist"));
  }

  if (signinBody.safeParse(body)) {
    try {
      if (user.password !== body.password) {
        return res.json(new ApiResponse(400, {}, "Invalid Password"));
      }
      const token = await jwt.sign(
        {
          id: user._id,
          admin: user.isAdmin,
          email: body.email,
        },
        process.env.JWT_SECURE
      );

      return res.json(
        new ApiResponse(
          200,
          {
            token,
          },
          "Signin Successfully"
        )
      );
    } catch (error) {
      throw error;
    }
  } else {
    return res.json(new ApiResponse(400, {}, "Invalid format of data"));
  }
});

// auth - signup
authRouter.post("/signup", async (req, res) => {
  const body = req.body;
  console.log(body);

  const user = await User.findOne({
    email: body["email"],
  });

  if (user) {
    return res.json(new ApiResponse(400, {}, "User already exist"));
  }

  if (signupBody.safeParse(body)) {
    try {
      const user = await User.create({
        ...body,
      });

      if (user) {
        const token = await jwt.sign(
          {
            email: user.email,
            admin: user.isAdmin,
            id: user._id,
          },
          process.env.JWT_SECURE
        );
        return res.json(
          new ApiResponse(
            200,
            {
              token,
              user,
            },
            "User created successfully"
          )
        );
      }
      return res.json(new ApiResponse(500, {}, "Server error"));
    } catch (error) {
      throw error;
    }
  } else {
    return res.json(new ApiResponse(400, {}, "Invalid format of data"));
  }
});

// get user from id
authRouter.get("/:id", async (req, res) => {
  const id = req.params["id"];

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json(new ApiResponse(404, {}, "User not found"));
    }
    return res.json(new ApiResponse(200, { user }, "Fetched user"));
  } catch (err) {
    return res.json(new ApiResponse(400, {}, "Invalid ID"));
  }
});

module.exports = { authRouter };

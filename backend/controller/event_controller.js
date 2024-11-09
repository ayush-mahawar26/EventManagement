const express = require("express");
const z = require("zod");
const { ApiResponse } = require("../utils/ApiReponse");
const eventRouter = express.Router();
const Event = require("../models/event_model.js");
const { verifyJwt } = require("../middleware/auth_middleware.js");
const User = require("../models/user_model.js");

const newEvent = z.object({
  title: z.string(),
  description: z.string().max(300),
  location: z.string(),
});

// create new event
eventRouter.post("/new", verifyJwt, async (req, res) => {
  const body = req.body;

  if (newEvent.safeParse(body)) {
    const admin = req.user;
    if (admin.isAdmin !== true) {
      return res.json(new ApiResponse(400, {}, "You are not admin user"));
    }
    const event = await Event.create({
      ...body,
      createdBy: admin,
    });

    if (!event) {
      return res.json(new ApiResponse(500, {}, "Server Errror"));
    }

    return res.json(
      new ApiResponse(
        200,
        {
          event,
        },
        "Event Created"
      )
    );
  } else {
    return res.json(new ApiResponse(400, {}, "Invalid Input"));
  }
});

// get all event
eventRouter.get("/", async (req, res) => {
  const events = await Event.find();
  if (!events) {
    return res.json(new ApiResponse(500, {}, "Error in server"));
  }

  return res.json(
    new ApiResponse(
      200,
      {
        events,
      },
      "Events Fetched"
    )
  );
});

// get event by id
eventRouter.get("/:id", async (req, res) => {
  const eventId = req.params["id"];

  const event = await Event.findById(eventId);
  if (!event) {
    return res.json(new ApiResponse(500, {}, "Error in server"));
  }
  return res.json(
    new ApiResponse(
      200,
      {
        event,
      },
      "Events Fetched"
    )
  );
});

//get event by use id
eventRouter.get("/user/:id", async (req, res) => {
  const userid = req.params["id"];
  console.log(userid);

  const user = await User.findById(userid);
  if (!user) {
    return res.json(new ApiResponse(500, {}, "Error in server"));
  }
  const event = await Event.find().where({
    createdBy: user,
  });
  if (!event) {
    return res.json(new ApiResponse(500, {}, "Error in server"));
  }
  return res.json(
    new ApiResponse(
      200,
      {
        event,
      },
      "Events Fetched"
    )
  );
});

// add attendes to event
eventRouter.post("/add/:eventid", verifyJwt, async (req, res) => {
  const user = req.user;
  if (user.isAdmin === true) {
    return res.json(new ApiResponse(400, {}, "Admin can't apply for events"));
  }
  const eventId = req.params["eventid"];
  const userId = user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.json(new ApiResponse(400, {}, "Invalid Event"));
    }

    if (event.attendees.includes(userId)) {
      return res.json(new ApiResponse(400, {}, "User is already an attendee"));
    }

    event.attendees.push(userId);
    await event.save();

    return res.json(
      new ApiResponse(
        200,
        { eventId, attendeeId: userId },
        "User successfully added to attendees"
      )
    );
  } catch (error) {
    throw error;
  }
});

eventRouter.get("/contain/:eventid/:id", async (req, res) => {
  const eventid = req.params["eventid"];
  const userid = req.params["id"];

  try {
    const event = await Event.findById(eventid);
    const user = await User.findById(userid);

    if (!event || !user) {
      return res.json(new ApiResponse(400, {}, "Error Occured"));
    }
    console.log(event.attendees.includes(user.id));

    return res.json(
      new ApiResponse(
        200,
        {
          contain: event.attendees.includes(user.id),
          len: event.attendees.length,
        },
        "Checked"
      )
    );
  } catch (err) {
    throw err;
  }
});

module.exports = { eventRouter };

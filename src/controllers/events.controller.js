import Event from "../models/event.model.js";
import notificationQueue from "../queues/notification.queue.js";

export const ingestEvent = async (req, res) => {
  try {
    const { type, payload } = req.body;

    if (!type || !payload) {
      return res.status(400).json({
        error: "Event type and payload are required",
      });
    }

    const event = await Event.create({
      type,
      payload,
    });

    await notificationQueue.add(
      "process-event",
      { eventId: event._id.toString() },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    );

    return res.status(201).json({
      message: "Event accepted",
      eventId: event._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

import {
  createNewEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/events.controller.js";
import { validate as validateUuid } from "uuid";

export const getEventsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const { ok, events, message } = await getEvents(name);
    res.status(200).json({ ok, events, message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getEventByIdHandler = async (req, res) => {
  const eventId = req.params.id;

  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const {event, trips, tickets} = await getEventById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, message: "Event not found" });
    }

    return res.status(200).json({ ok: true, event, trips, tickets });
  } catch (error) {
    console.error("Error in getEventByIdHandler:", error.message);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const postEventHandler = async (req, res) => {
  const { name, date, category, streetName, streetNumber, city, province, country: countryEvent } = req.body;

  const { role: userRole } = req.user;
  const  img  = req.files.img.tempFilePath;  

  if (userRole !== "admin")
    return res.status(401).json({ ok: false, message: "Unauthorized" });

  if (!name || !category || !date || !streetName || !streetNumber || !city || !province || !countryEvent || !img) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, event, message, statusCode } = await createNewEvent(
      name, date, category, streetName, streetNumber, city, province, countryEvent, img
    );
    
    res.status(statusCode).json({ ok, event, message });
  } catch (error) {
    console.error("Error in postEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const putEventHandler = async (req, res) => {
  const eventId = req.params.id;
  const { role: userRole } = req.user;

  let img;

  if (req.files !== null){
    img  = req.files.img.tempFilePath; 
  }
  

  if (userRole !== "admin")
    return res.status(401).json({ ok: false, message: "Unauthorized" });

  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }


  const { name, date, category, streetName, streetNumber, city, province, country: countryEvent } = req.body;
  if (name || category || date || streetName || streetNumber || city || province || countryEvent  || img) {
    try {
      const { ok, event, statusCode, message } = await updateEvent(
        eventId, name, date, category, streetName, streetNumber, city, province, countryEvent, img
      );
  
  
      return res.status(statusCode).json({ ok, event, message });
  
  
    } catch (error) {
      console.error("Error in putEventHandler:", error.message);
      return res.status(500).json({ ok: false, message: "Internal server error" });
    }
    
  }
  return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });

};

export const deleteEventHandler = async (req, res) => {
  const eventId = req.params.id;
  const { role: userRole } = req.user;

  if (userRole !== "admin")
    return res.status(401).json({ ok: false, message: "Unauthorized" });

  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const {ok, statusCode, message} = await deleteEvent(eventId);

    res.status(statusCode).json({ ok, message });
  } catch (error) {
    console.error("Error in deleteEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

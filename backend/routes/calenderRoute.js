const express = require("express");
const Calender = require("../models/calenderModal");
const router = new express.Router();

// add
router.post("/addevent", async (req, res) => {
    const { bookingDate, bookingTime, bookingIntervalTime, label } = req.body;

    try {
        // create a new calendar event entry
        const Addcalender = new Calender({
            calenderId: req.calenderId,
            label,
            bookingDate,
            bookingTime,
            bookingIntervalTime,
            date: Date.now(),
        });

        // Save the calendar event to the database
        const CalenderData = await Addcalender.save();

        res.status(201).send({
            message: `Event Added Succefully `,
            EventDetails: CalenderData,
        });

        console.log(`Event added for date ${bookingDate}`);
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).send("Server error while adding event.");
    }
});

// getall
router.get("/events", async (req, res) => {
    try {
        const events = await Calender.find({});

        res.status(200).send(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Server error while fetching events.");
    }
});

// get by id
router.get("/events/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Calender.findById(id);

        if (!event) {
            return res.status(404).send("Event not found.");
        }

        res.status(200).send(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).send("Server error while fetching event.");
    }
});

module.exports = router;

const mongoose = require("mongoose");

const calenderSchema = new mongoose.Schema(
    {
        bookingDate: { type: String },
        bookingTime: { type: String },
        bookingIntervalTime: { type: String },
        label: { type: String },
    },
    {
        timestamps: true,
    }
);

const Calender = mongoose.model("calender", calenderSchema);

module.exports = Calender;

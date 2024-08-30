import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Import interaction plugin
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Calender = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [meetingLabel, setMeetingLabel] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingInterval, setMeetingInterval] = useState("2");

  useEffect(() => {
    getData();
  }, []);

  //get events
  const getData = () => {
    axios
      .get("http://localhost:7001/api/calender/events", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const formattedEvents = response.data.map((item) => ({
            id: item._id,
            title: item.label,
            start: `${item.bookingDate}T${item.bookingTime}:00`,
            end: `${item.bookingDate}T${(
              parseInt(item.bookingTime.slice(0, 2)) +
              parseInt(item.bookingIntervalTime)
            )
              .toString()
              .padStart(2, "0")}:00:00`,
          }));
          setEvents(formattedEvents);
        }
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
      });
  };

  //  date click
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // add event
  const handleSubmit = () => {
    const newEvent = {
      label: meetingLabel,
      bookingDate: selectedDate,
      bookingTime: meetingTime,
      bookingIntervalTime: meetingInterval,
    };

    axios
      .post("http://localhost:7001/api/calender/addevent", newEvent, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Event Added");
        handleCloseModal();
        resetForm();
        if (response.status === 200 || response.status === 201) {
          setEvents([
            ...events,
            {
              id: response.data._id,
              title: response.data.label,
              start: `${response.data.bookingDate}T${response.data.bookingTime}:00`,
              end: `${response.data.bookingDate}T${(
                parseInt(response.data.bookingTime.slice(0, 2)) +
                parseInt(response.data.bookingIntervalTime)
              )
                .toString()
                .padStart(2, "0")}:00:00`,
            },
          ]);
        }
      })
      .catch((error) => {
        console.log("Error adding event:", error);
      });
  };

  // reset
  const resetForm = () => {
    setMeetingLabel("");
    setMeetingTime("");
    setMeetingInterval("2");
    setSelectedDate("");
  };

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule a Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="meetingLabel">
              <Form.Label>Meeting Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting label"
                value={meetingLabel}
                onChange={(e) => setMeetingLabel(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="bookingDate">
              <Form.Label>Meeting Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group controlId="meetingTime">
              <Form.Label>Meeting Time</Form.Label>
              <Form.Control
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="meetingInterval">
              <Form.Label>Meeting Duration (Hours)</Form.Label>
              <Form.Control
                as="select"
                value={meetingInterval}
                onChange={(e) => setMeetingInterval(e.target.value)}
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Meeting
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calender;

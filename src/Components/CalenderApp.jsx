import { useState } from "react";

const CalenderApp = () => {
  const daysOfWeek = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date(); // create a date object with value of runtime datetime when no arguments provided.

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate); // default currentDate (runtime datetime)
  const [showEventPopup, setShowEventPopup] = useState(false); // default false
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" }); // default object with hours and min.
  const [eventText, setEventText] = useState("");
  // setCurrentMonth is a state updater function returned by the useState hook. It updates the state variable currentMonth whenever it’s called, and itself doesn't return anything.

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  /* (prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1) is a callbackfunction.
     The function passed to setCurrentMonth is a callback that takes the previous state value (prevMonth) as an argument.
     This callback checks the current value of prevMonth and determines what the new value of currentMonth should be.
     Scenario: If the current month (currentMonth) is 5 (June):
     prevMonth() is called.
     The callback checks prevMonth === 0, which is false.
     setCurrentMonth(4) is called, setting currentMonth to 4 (May). */

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    //console.log(clickedDate);

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      //console.log(selectedDate, showEventPopup);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ); // it returns true if all three conditions are met.
  };

  const handleEventSubmit = () => {
    const newEvent = {
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.hours.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    setEvents([...events, newEvent]); // create an array that consists of all elements in array events, and append the newEvent object.
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
  };

  return (
    <div className="calender-app">
      <div className="calender">
        <h1 className="heading">Calender</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1} // day is zero indexed
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={(e) =>
                  setEventTime({ ...eventTime, hours: e.target.value })
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={(e) =>
                  setEventTime({ ...eventTime, minutes: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Ange händelsetext (Max 60 bokstäver)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              Lägg till händelse
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bxs-message-alt-x"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalenderApp;

//1:54 - there is a bug

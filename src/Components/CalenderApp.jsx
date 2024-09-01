import { useState } from "react";

const CalenderApp = () => {
  const daysOfWeek = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
  const monthsOfYears = [
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

  const currentDate = new Date(); // create a date object with value of runtime datetime

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
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

  return (
    <div className="calender-app">
      <div className="calender">
        <h1 className="heading">Calender</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYears[currentMonth]},</h2>
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
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        <div className="event-popup">
          <div className="time-input">
            <div className="event-popup-time">Time</div>
            <input
              type="number"
              name="hours"
              min={0}
              max={24}
              className="hours"
            />
            <input
              type="number"
              name="minutes"
              min={0}
              max={60}
              className="minutes"
            />
          </div>
          <textarea placeholder="Ange händelsetext (Max 60 bokstäver)"></textarea>
          <button className="event-popup-btn">Lägg till händelse</button>
          <button className="close-event-popup">
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">maj 15, 2024</div>
            <div className="event-time">10:00</div>
          </div>
          <div className="event-text">Möte med Lukas</div>
          <div className="event-buttons">
            <i className="bx bxs-edit-alt"></i>
            <i className="bx bxs-message-alt-x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderApp;

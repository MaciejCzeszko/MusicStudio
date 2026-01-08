import { useEffect, useState } from "react";
import Button from "./Button";

const generateDays = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    days.push({
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      date,
    });
  }
  return days;
};
const startHour = 10;
const endHour = 22;
const hours = Array.from(
  { length: endHour - startHour },
  (_, i) => startHour + i
);

export const Schedule = ({ id, price }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const days = generateDays();
  const now = new Date();

  const isSelected = (date, hour) =>
    selectedSlots.some(
      (slot) =>
        slot.hour === hour && slot.date.toDateString() === date.toDateString()
    );

  const toggleSlot = (date, hour) => {
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    if (slotTime < now) return;

    setSelectedSlots((prev) => {
      const exists = prev.some(
        (slot) =>
          slot.hour === hour && slot.date.toDateString() === date.toDateString()
      );

      if (exists) {
        return prev.filter(
          (slot) =>
            !(
              slot.hour === hour &&
              slot.date.toDateString() === date.toDateString()
            )
        );
      }

      return [...prev, { date, hour }];
    });
  };

  const isPast = (date, hour) => {
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    return slotTime < now;
  };

  useEffect(() => {
    console.log(selectedSlots);
  }, [selectedSlots]);

  return (
    <div class=" flex">
      <table>
        <thead>
          <tr>
            <th class="pr-3">Time</th>
            {days.map((day) => (
              <th
                key={day.date.toISOString()}
                class="p-1 w-28 text-center whitespace-nowrap"
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td class="pr-3 text-center">{hour}</td>

              {days.map((day) => {
                const active = isSelected(day.date, hour);
                const past = isPast(day.date, hour);
                return (
                  <td class="p-1" key={`${day.date.toISOString()}-${hour}`}>
                    <button
                      className={`
                        w-full h-12 rounded-lg border shadow-sm transition
                        active:scale-[0.98]
                        ${past ? "bg-gray-700 cursor-not-allowed" : ""}
                        ${
                          !past && active
                            ? "bg-blue-200 border-blue-400"
                            : !past
                            ? "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                            : ""
                        }
                      `}
                      disabled={past}
                      onClick={() => toggleSlot(day.date, hour)}
                      title={`${day.label} ${hour}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div class="flex flex-col justify-top">
        <p class="py-1 font-bold w-[70%] text-center mx-auto">
          You chose to make a reservation for {selectedSlots.length}{" "}
          {selectedSlots.length === 1 ? "hour" : "hours"}
        </p>
        <p class="text-center">
          Price: {Number(price) <= 1 ? 0 : Number(price) * selectedSlots.length}
          PLN
        </p>
        <Button>Book</Button>
      </div>
    </div>
  );
};

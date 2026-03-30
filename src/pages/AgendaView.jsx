import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function AgendaView() {
  return (
    <div>
      <h2 style={{ color: "#FFD700" }}>Agenda dos Doutores</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
      />
    </div>
  );
}

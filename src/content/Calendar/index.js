import React from "react";
import styled from "styled-components";
import { FONTS, COLORS } from "../../constants";
import { Link } from 'gatsby';
import Layout from "../../components/Layout";
import CalendarModal from "../../components/Modal";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import textVersion from "textversionjs";

const TextThemes = {
  fontSize: {
    default: "max(16px,1vw)",
    lg: "max(24px,1.2vw)",
  },
  fontWeight: {
    default: "400",
    lg: "700",
  },
};

const LinkStyled = styled(Link)`
  font-family: ${FONTS.font1};
  font-color: ${COLORS.blue};
  padding-right: 40px;
  font-size: ${(props) => TextThemes.fontSize[props.ver]};
  font-weight: ${(props) => TextThemes.fontWeight[props.ver]};
  text-decoration: none;
  &:link {
    color: ${COLORS.blue};
  }
  &:visited {
    color: ${COLORS.blue};
  }
  &:hover {
    color: ${COLORS.yellow};
    text-decoration: none;
  }
  &:active {
    color: ${COLORS.yellow};
    text-decoration: none;
  }
`;

const Calendar = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleEventClick = (arg) => {
    setOpen(true);
    setTitle(arg.event.title);
    setDate(arg.event.start);
    if (arg.event.extendedProps.description === undefined) {
      setDescription("");
    } else {
      let newDescription = textVersion(arg.event.extendedProps.description);
      while (newDescription.includes("mailto:")) {
        const index = newDescription.indexOf("mailto:");
        const email = newDescription.substring(index + 7, newDescription.indexOf(")", index));
        const length = newDescription.length;
        newDescription = newDescription.substring(0, index - email.length - 4) + email + newDescription.substring(newDescription.indexOf(")", index) + 2, length);
      }
      newDescription = newDescription.substring(newDescription.indexOf(")") + 1)
      setDescription(newDescription);
    }
    setLocation(arg.event.extendedProps.location);
    arg.jsEvent.preventDefault();
  }

  return (

    <Layout>
      <div style={{ display: "flex", maxWidth: "90%", minHeight: "100vh", alignContent: "center", justifyContent: "center", justifySelf: "center", justifyItems: "center", flexDirection: "column", margin: "auto", marginTop: "50px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listYear'
          }}
          googleCalendarApiKey={process.env.API}
          events={{ googleCalendarId: 'c_f8ula62j40p4purc682umjjbmc@group.calendar.google.com' }}
          eventClick={handleEventClick}
          expandRows
        />
        <CalendarModal open={open} handleClose={() => setOpen(false)} title={title} description={description} date={date} location={location} />
      </div>

    </Layout>
  );
};

export default Calendar;

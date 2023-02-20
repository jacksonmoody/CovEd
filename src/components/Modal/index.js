import React from "react";
import styled from "styled-components";
import { Link } from 'gatsby';
import Box from '@material-ui/core/Box';
import Modal from "@material-ui/core/Modal";
import { FONTS, COLORS } from "../../constants";

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


const Wrapper = styled.div`
  p{
    font-family: ${FONTS.font2};
    font-weight: 300;
    color: ${COLORS.white};
    text-align: center;
  }
  h2 {
    font-family: ${FONTS.font1};
    font-weight: 500;
    color: ${COLORS.white};
  }
  a {
    color: ${COLORS.white}
  }
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    outline: 0,
    boxShadow: 24,
    p: 4,
  };

export default function CalendarModal({ open, handleClose, title, date, description, location }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h2>{title}</h2>
            <p>{date.toString()}</p>
            <LinkStyled to={location} ver="default">{location}</LinkStyled>
            <br />
            <br />
            {description}
        </Box>
      </Modal>
    </div>
  );
}
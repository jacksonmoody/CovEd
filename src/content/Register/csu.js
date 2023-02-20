import React from "react";
import { Link } from 'gatsby';
import styled from "styled-components";
import { FONTS, COLORS } from "../../constants";
const GFORM = "https://docs.google.com/forms/d/e/1FAIpQLSc9oAMberVjqZzdBcz9zbTSU7e-fi9zXmyfYkubFcM3AUMCBQ/viewform?embedded=true";

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

const CSUMentee = () => {
    return (
        <div style={{display: "flex", minWidth:"80vw", minHeight:"100vh", alignContent:"center", justifyContent: "center", justifySelf:"center", justifyItems:"center", flexDirection: "column"}}>
          <div style = {{display: "flex", alignContent:"center", height: "50px", lineHeight: "50px", justifyContent: "center"}}><LinkStyled to="/register" ver="default">Are you a college student? Click here to register as a mentor!</LinkStyled></div>
          <div style = {{display: "flex", alignContent:"center", justifyContent: "center"}}> <iframe src={GFORM} width="800" height="900" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> </div>
        </div>
    )
}

export default CSUMentee;

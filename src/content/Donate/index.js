import React from "react";
import styled from "styled-components";
import { FONTS, COLORS } from "../../constants";
import Layout from "../../components/Layout";

import { Link } from 'gatsby';

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

const Title = styled.h1`
  padding-top: 20px;
  font-size: 3em;
  font-weight: 400;
  font-family: ${FONTS.font2};
  left: calc(50% - 267px/2 + 0.5px)
  top: 86px
`;

const Donate = () => {
  return (
    <Layout>
      <div style={{ display: "flex", maxWidth: "90%", alignContent: "center", justifyContent: "center", justifySelf: "center", justifyItems: "center", flexDirection: "column", margin: "auto", marginTop: "25px", marginBottom: "50px" }}>
        <Title> Donate </Title>
        <p>
          We are a nonprofit that offers free tutoring, so if you want to help us out with our operations, please donate!
        </p>
        <LinkStyled to="https://www.paypal.com/donate/?hosted_button_id=JL9NRMP4AU546" ver="default">
          PayPal
        </LinkStyled>
      </div>
    </Layout>
  );
};

export default Donate;

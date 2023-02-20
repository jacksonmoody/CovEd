import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { StaticImage } from "gatsby-plugin-image";

import { Link } from "gatsby";

import MobileNav from "./MobileNav";

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

const useWindowSize = () => {
  const isSSR = typeof window === "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight
  });

  const changeWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    }
  }, []);

  return windowSize;
}

export default function NavBar(props) {
  const { width } = useWindowSize();

  if (width < 1024) {
    return (
      <MobileNav
        links={props.links}
      />
    );
  }

  return (
    <>
      <AppBar
        color="default"
        flex-direction="row"
        position={props.position}
        elevation={0}
      >
        <Toolbar>
          <Grid container
            alignItems="center">
            <LinkStyled to="/" ver="lg">
              <StaticImage src="../../images/coved_logo.png" width={200} />
            </LinkStyled>
            {props.links.map((link) => (
              <LinkStyled key={link.link} to={link.link} ver="default">
                {link.title}
              </LinkStyled>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

NavBar.propTypes = {
  links: PropTypes.array,
  position: PropTypes.string,
  ver: PropTypes.string,
};

NavBar.defaultProps = {
  links: [
    {
      title: "Resources",
      link: "/resources",
    },
    {
      title: "Programs",
      link: "/programs",
    },
    {
      title: "FAQs",
      link: "/faqs",
    },
    {
      title: "About Us",
      link: "/aboutus",
    },
    // {
    //   title: "Meet Our Team",
    //   link: "/team",
    // },
    {
      title: "Contact Us",
      link: "/contactus",
    },
    {
      title: "News",
      link: "/news",
    },
    {
      title: "Calendar",
      link: "/calendar",
    },
    {
      title: "Register",
      link: "/register",
    },
    {
      title: "Donate",
      link: "/donate",
    },
  ],
  position: "sticky",
  ver: "default",
};

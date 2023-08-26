import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedinIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import { HEADERS } from "../helpers/constants";

export default function Footer() {
  return (
    <div className="footer__container">
      <a href="https://www.coved.org" target="_blank" rel="noreferrer">
        <img className="footer__image" src="/static/coved_logo_inverted.png" alt="CovEd Logo" />
      </a>
      <div className="footer__links">
        {HEADERS.map((link, index) => (
          <a
            key={index}
            href={link[1]}
            className="navbar__link contrast"
            target="_blank"
            rel="noreferrer">
            {link[0]}
          </a>
        ))}
      </div>
      <div className="footer__icons">
        <IconButton
          aria-label="facebook.com"
          onClick={() => window.open("https://www.facebook.com/CovEducationInc")}>
          <FacebookIcon sx={{ fontSize: "40px", color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="twitter.com"
          onClick={() => window.open("https://twitter.com/coveducation")}>
          <TwitterIcon sx={{ fontSize: "40px", color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="instagram.com"
          onClick={() => window.open("https://www.instagram.com/coveducation/")}>
          <InstagramIcon sx={{ fontSize: "40px", color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="linkedin.com"
          onClick={() => window.open("https://www.linkedin.com/company/coveducation-inc/")}>
          <LinkedinIcon sx={{ fontSize: "40px", color: "white" }} />
        </IconButton>
      </div>
    </div>
  );
}

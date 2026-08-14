import React from "react";
import styled from "styled-components";
import ProjectHeader from "./UserInterface/ProjectHeader";
import Section from "./UserInterface/Section";
import ImageGroup from "./UserInterface/ImageGroup";
// import Heading from "./UserInterface/Heading";

import { Carousel } from "./UserInterface/Carousel";

const Container = styled.div`
  margin: 0 70px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0 24px;
  }
`;

const P = styled.p`
  text-align: left;
  font-size: 16px;
  line-height: 2;
  letter-spacing: 0.2px;
  color: #1b2c63;

  margin: 24px 104px 0 104px;

  align-self: left;

  font-family: "Noto Sans", sans-serif;

  @media (max-width: 768px) {
    margin: 24px 0 0 0;
    width: 100%;
    max-width: none;
    font-size: 15px;
    letter-spacing: 0.19px;
  }
`;

export const ListingShare = (
  <Container>
    <ProjectHeader
      company="VTS"
      date="2024"
      title="Listing Share"
      responsibilities="Discovery, UX/UI Design, Prototyping, Usability testing, Design QA "
      roleSummary="End-to-end design of mobile
       interfaces for unlocking doors in commercial buildings."
      // pictureFile="VTSAccess/AMgroup.png"
      alt=""
      caption=""
    />
    <Carousel>
      <ImageGroup
        desktop="VTSAccess/HID_Mobile_IDs_-_blur.png"
        mobile=""
        alt=""
        caption="HID’s table does the job, but could benefit from better visual hierarchy and more specific inline actions for efficiency. "
      />
      <ImageGroup
        desktop="VTSAccess/image.png"
        mobile=""
        alt=""
        caption="HID’s user details page is very long, with many different sections (2 screen heights’ worth of content can be seen above). This page would benefit from more efficient use of space and anchor links, which would to allow users to find what they need more quickly. "
      />
      <ImageGroup
        desktop="VTSAccess/HID_Mobile_IDs_-_blur.png"
        mobile=""
        alt=""
        caption="HID’s table does the job, but could benefit from better visual hierarchy and more specific inline actions for efficiency. "
      />
      <ImageGroup
        desktop="VTSAccess/image.png"
        mobile=""
        alt=""
        caption="HID’s user details page is very long, with many different sections (2 screen heights’ worth of content can be seen above). This page would benefit from more efficient use of space and anchor links, which would to allow users to find what they need more quickly. "
      />
      <ImageGroup
        desktop="VTSAccess/HID_Mobile_IDs_-_blur.png"
        mobile=""
        alt=""
        caption="HID’s table does the job, but could benefit from better visual hierarchy and more specific inline actions for efficiency. "
      />
    </Carousel>
  </Container>
);

import React from "react";
import styled from "styled-components";

const Container = styled.img`
  margin: ${(props) => props.margin}px 0 0 ${(props) => props.margin / 2}px;

  width: 90%;
  height: auto;

  display: ${(props) => (props.displayFor === "desktop" ? "block" : "none")};

  @media (max-width: 768px) {
    display: ${(props) => (props.displayFor === "mobile" ? "block" : "none")};
    align-self: center;
    width: 90%;
    height: auto;
    max-width: 240px;
  }
`;

const ProfilePicture = (props) => {
  return (
    <Container
      src="/images/profile.png"
      alt="Me!"
      margin={props.margin}
      dimension={props.dimension}
      displayFor={props.displayFor}
    />
  );
};

export default ProfilePicture;

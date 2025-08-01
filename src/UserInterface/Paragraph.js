import React from "react";
import styled from "styled-components";

const Container = styled.p`
  text-align: left;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  font-size: 16px;
  line-height: 2;
  letter-spacing: 0.2px;
  color: #1b2c63;

  font-family: "Noto Sans", sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const Paragraph = (props) => {
  return (
    <Container width={props.width} maxWidth={props.maxWidth}>
      {props.children}
    </Container>
  );
};

export default Paragraph;

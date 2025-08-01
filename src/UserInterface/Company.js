import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${(props) => (props.footer ? "0 16px" : "0 0 24px 0")};

  padding-bottom: 64px;

  width: ${(props) => (props.footer ? "24%" : "40%")};
  padding-right: ${(props) => (props.footer ? "4%" : "10%")};

  @media (max-width: 768px) {
    margin: 0 0 16px 0;

    width: 100%;
  }
`;

const Title = styled.h3`
  margin: 0;

  font-size: 13px;
  font-weight: 500;
  line-height: 1.85;
  letter-spacing: 0.8px;

  font-family: "Roboto Mono", monospace;

  color: #213571;
`;

const Company = (props) => {
  console.log(props.title, props.children.length);
  return (
    <Container footer={props.footer}>
      <Title>{props.title}</Title>
      {props.children}
    </Container>
  );
};

export default Company;

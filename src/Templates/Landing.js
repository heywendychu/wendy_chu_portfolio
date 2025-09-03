import React from "react";

import styled from "styled-components";

import Section from "../UserInterface/Section";
import Company from "../UserInterface/Company";
import ProjectLink from "../UserInterface/ProjectLink";
import Paragraph from "../UserInterface/Paragraph";
import ProfilePicture from "../ProfilePicture";
import SpanLink from "../UserInterface/SpanLink";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompanyContainer = styled.div`
  margin: 40px 0 0 0;

  display: flex;

  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin: 40px 0 0 0;
    flex-direction: column;
    flex-wrap: no-wrap;
  }
`;

const Headline = styled.h1`
  font-family: CanelaWeb;
  font-size: 56px;
  line-height: 1.3;
  letter-spacing: 0.93px;
  color: #1b2c63;
  font-weight: 400;

  margin: 32px 0 0 0;

  @media (max-width: 768px) {
    line-height: 1.25;
    font-size: 40px;
    letter-spacing: 0.67px;
  }
`;

const MainRow = styled.div`
  width: 100%;
  display: flex;
`;

const Column = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: ${(props) => (props.off ? "none" : "block")};
    width: fit-content;
    align-items: center;
  }
`;
const B = styled.span`
  font-weight: 700;
`;
const Spacer = styled.div`
  height: 100px;
`;

const Landing = (props) => {
  return (
    <Container className="test">
      <span id="about"></span>
      <Section title="ABOUT ME" spaceAbove={80}>
        <MainRow>
          <Column width="60%" maxWidth="500px">
            <Headline>Hi, I'm Wendy Chu.</Headline>
            <ProfilePicture margin={24} dimension={256} displayFor="mobile" />
            <Paragraph width="100%" maxWidth="543px">I’m a staff-level digital product designer in Los Angeles, CA. </Paragraph>
            <Paragraph width="100%" maxWidth="543px">
              I have 14+ years of experience in UX design across B2B SaaS, B2C e-commerce, data visualization, responsive web, native mobile, and design systems.
              I've previously crafted digital experiences at{" "}
              <SpanLink href="https://www.vts.com">View The Space</SpanLink>,{" "}
              <SpanLink href="https://www.primary.com">Primary</SpanLink>,
              and{" "}
              <SpanLink href="https://www.ralphlauren.com/">
                Ralph Lauren
              </SpanLink>
              .{" "}
            </Paragraph>
            <Paragraph width="100%" maxWidth="543px">
              I’m a design Swiss Army knife. {/* I enjoy collaborating with product managers, engineers, and stakeholders in an organization that recognizes the business value of product design. I prefer working at a remote-first or remote-friendly company.*/}
              I research, strategize, prototype, and shepherd my designs all the way to QA and production.
              I enjoy collaborating with product managers, engineers, stakeholders, and users to create solutions that balance everyone's needs.
              Most of all, I love learning new things from my colleagues and teaching them about UX. {" "}
            </Paragraph>
            <Paragraph width="100%" maxWidth="543px">

            </Paragraph>
          </Column>
          <Column width="40%" maxWidth="400px" off={true}>
            <ProfilePicture margin={108} dimension={300} displayFor="desktop" />
          </Column>
        </MainRow>
      </Section>

      <span id="work"></span>
      <Section title="WORK" spaceAbove={48}>
        <CompanyContainer>
          <Company title="VTS">
            <ProjectLink
              text="Access Management"
              route="vts-access-management"
            />
            {/* <ProjectLink
              text="Mobile Access"
              route="vts-mobile-access"
            />*/}
          </Company>
          <Company title="Primary.com">
            <ProjectLink
              text="Navigation Redesign"
              route="primary-navigation-redesign"
            />
            <ProjectLink
              text="Product Detail Page"
              route="primary-product-detail-page"
            />
            <ProjectLink text="Design System" route="primary-style-guide" />
          </Company>
          {/* <Company title="Ralph Lauren">
                        <ProjectLink text="Find a Store" route="ralph-lauren-find-a-store"/>
                        <ProjectLink text="Mobile Webstore" route="ralph-lauren-mobile-webstore"/>
                    </Company> */}
        </CompanyContainer>
      </Section>

      <span id="contact"></span>
      <Section id="contact" title="CONTACT" spaceAbove={40}>
        <Paragraph width="70%">
          I’m currently looking for a full-time <B>senior/staff product design</B> role, preferably remote.
          I'd be most interested in: marketplaces, SaaS tools, design systems,and
          experiences that bridge digital and physical.
          If you think we might be
          a good fit, I'd love to chat! Get in touch with me at{" "}
          <SpanLink href="mailto:hi@wendychu.design">
            hi@wendychu.design
          </SpanLink>
          !
        </Paragraph>
      </Section>

      <Spacer />
    </Container>
  );
};

export default Landing;

import React from 'react'

import styled from 'styled-components'

import Section from '../UserInterface/Section'
import Company from '../UserInterface/Company'
import ProjectLink from '../UserInterface/ProjectLink'
import Paragraph from '../UserInterface/Paragraph'
import ProfilePicture from '../ProfilePicture'
import SpanLink from '../UserInterface/SpanLink'


const Container = styled.div`

    width: 100%;


    display: flex;
    flex-direction: column;
    align-items: center;

`


const CompanyContainer = styled.div`

    margin: 40px 0 0 0;

    display: flex;

    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin: 40px 0 0 0;
        flex-direction: column;
        flex-wrap: no-wrap;
    }

`

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
`

const MainRow = styled.div`

    width: 100%;
    display: flex;

`

const Column = styled.div`
    width: ${props => props.width};
    max-width: ${props => props.maxWidth};
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        display: ${props => props.off ? "none" : "block"};
        width: fit-content;
        align-items: center;
    }

`

const Spacer = styled.div`
    height: 100px;
`



const Landing = props => {
    return (
        <Container className="test">

            <span id="about"></span>
            <Section title="ABOUT ME" spaceAbove={120}>
                
                <MainRow>
                <Column width="60%" maxWidth="500px">
                    <Headline>Hi, I'm Wendy Chu.</Headline>
                    <ProfilePicture margin={24} dimension={256} displayFor="mobile"/>
                    <Paragraph width="100%" maxWidth="543px">I’m a human-centered digital product designer in Brooklyn, NY. I strive to make the world a little bit more thoughtful, inclusive, and beautiful. I've previously created digital experiences at <SpanLink href="https://www.primary.com">Primary</SpanLink>, <SpanLink href="https://tinybeans.com/">Tinybeans</SpanLink>, and <SpanLink href="https://www.ralphlauren.com/">Ralph Lauren</SpanLink>. </Paragraph>
                    <Paragraph width="100%" maxWidth="543px">I research, strategize, wireframe, prototype, push pixels, and write a bit of code. I am always learning more in order to gain a more holistic understanding of design, so I’m happiest when I can collaborate with others and learn from what they do. </Paragraph>
                    <Paragraph width="100%" maxWidth="543px">A few of my favorite things: design systems, seamless cross-channel experiences, mobile design,  and one-on-one chats over coffee or tea.</Paragraph>
                </Column>
                <Column width="40%" maxWidth="400px" off={true}>
                    <ProfilePicture margin={108} dimension={300} displayFor="desktop"/>
                </Column>

                </MainRow>

            </Section>

            <span id="work"></span>
            <Section title="WORK" spaceAbove={104}>
                
                <CompanyContainer>
                    <Company title="Primary.com">
                        <ProjectLink text="Navigation Redesign" route="primary-navigation-redesign" />
                        <ProjectLink text="Product Detail Page" route="primary-product-detail-page" />
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
                <Paragraph width='560px'>
                    I’m currently looking for a full-time senior product/UX designer role at a company with a design-centered culture. If you think we might be a good fit, please get in touch with me at <SpanLink href="mailto:wenxiu.chu@gmail.com">wenxiu.chu@gmail.com</SpanLink>!
                </Paragraph>

            </Section>

            <Spacer/>

            

        </Container>
    );
}

export default Landing

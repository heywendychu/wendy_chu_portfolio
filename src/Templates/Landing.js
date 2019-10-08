import React from 'react'

import styled from 'styled-components'

import Section from '../UserInterface/Section'
import Company from '../UserInterface/Company'
import Link from '../UserInterface/Link'
import Paragraph from '../UserInterface/Paragraph'
import ProfilePicture from '../ProfilePicture'


const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

`


const CompanyContainer = styled.div`

    margin: 40px 0 0 24px;

    display: flex;

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

    @media (max-width: 768px) {
        line-height: 1.25;
        font-size: 40px;
        letter-spacing: 0.67px;
    }
`

const Landing = props => {
    return (
        <Container>
            <Section title="ABOUT ME" spaceAbove={120}>



                <Headline>Hi, I'm Wendy Chu.</Headline>
                <ProfilePicture dimension={300} displayFor="mobile"/>
                <Paragraph width="60%" maxWidth="543px">I’m a human-centered digital product designer in Brooklyn, NY. I strive to make the world a little bit more thoughtful, inclusive, and beautiful. </Paragraph>
                <Paragraph width="60%" maxWidth="543px">I research, strategize, wireframe, prototype, push pixels, write a bit of code, and never stop learning. Although I can do a whole lot on my own, I’m happiest when I collaborate with others. </Paragraph>
                <Paragraph width="60%" maxWidth="543px">A few of my favorite things: design systems, seamless omnichannel experiences, and one-on-one chats over coffee or tea.</Paragraph>



            </Section>

            <Section title="WORK" spaceAbove={120}>
                <CompanyContainer>
                    <Company title="Primary.com">
                        <Link text="Navigation Redesign" />
                        <Link text="Product Detail Page" />
                        <Link text="Style Guide" />
                    </Company>
                    <Company title="Ralph Lauren">
                        <Link text="Find a Store" />
                        <Link text="Mobile Webstore" />
                    </Company>
                </CompanyContainer>
            </Section>

            <Section title="CONTACT" spaceAbove={0}>

                <Paragraph width='560px'>
                    I’m currently looking for a full-time senior product/UX designer role at a company with a design-centered culture. If you think we might be a good fit, please email me at hi@wendychu.design to get in touch!
                </Paragraph>

            </Section>

        </Container>
    );
}

export default Landing

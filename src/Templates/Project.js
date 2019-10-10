import React, { useState } from 'react'

import styled from 'styled-components'


import ProjectHeader from '../UserInterface/ProjectHeader'
import Section from '../UserInterface/Section'
import ImageGroup from '../UserInterface/ImageGroup'

const Container = styled.div`


    margin: 0 70px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {

        margin: 0 24px;

    }

`

const P = styled.p`

    text-align: left;
    font-size: 16px;
    line-height: 2;
    letter-spacing: 0.2px;
    color: #1b2c63;

    margin: 24px 104px 0 104px;

    align-self: left;

    font-family: 'Noto Sans', sans-serif;

    @media (max-width: 768px) {

        margin: 24px 0 0 0;
        width: 100%;
        max-width: none;
        font-size: 15px;
        letter-spacing: 0.19px;

    }

`

const Ul = styled.ul`
    margin: 0 104px 0 104px;
    list-style: none;

    @media (max-width: 768px) {

        margin: 0;
        width: calc(100%-40px);
        max-width: none;

    }
`

const Li = styled.li`

    font-family: 'Noto Sans', sans-serif;

    font-size: 16px;
    line-height: 2;
    color: #1b2c63;

    margin: 8px 0 0 0;

    @media (max-width: 768px) {

        font-size: 15px;
        letter-spacing: 0.19px;

    }

    ::before{
        content: '•';
        font-size: 1.2em;
        color: #de3c2c;

        display: inline-block;

        width: 1em;
        margin-left: -1em;

        

    }

`

const B = styled.span`
    font-weight: 700;
`

const Spacer = styled.div`
    height: 100px;
`


const choosePage = (route, password, setPassword) => {

    const data = [

    {route: "primary-navigation-redesign",
    password: null,
    content:
        <Container>
            <ProjectHeader 
                company="Primary.com"
                date="May 2019"
                title="Navigation Redesign"
                responsibilities="UX Research, Information Architecture, Interaction Design, Visual Design"
                pictureFile="laptop-mockup.png"
                alt="Desktop Navigation Flyout"
                caption="Desktop Navigation Flyout"
            />
            <Section title="PROBLEM STATEMENT" spaceAbove={80} indent={true}>
                
                <P>Primary’s previous navigation had worked when there were only a handful of products being sold, but the product line had been expanding, and it was breaking under the number of products it needed to support.</P>
                
                <P>Furthermore, the need for more editorial spaces had become apparent, which were difficult to make work with the existing structure. It was clear that they needed a more flexible system.</P>

                <ImageGroup desktop="mobile-navigation-d.png" mobile="mobile-navigation-m.png" alt="Mobile Navigation" caption="Mobile Navigation"  />



            </Section>

            <Section title="OBJECTIVES" spaceAbove={80} indent={true}>

                <P>The project was meant to accomplish the following things:</P>

                <Ul>
                    <Li>Create a scalable and adminable navigation system</Li>
                    <Li>Allow spaces for editorial product storytelling</Li>
                    <Li>Follow established patterns and best practices</Li>
                    <Li>Address usability and accessibility issues</Li>
                </Ul>

            </Section>

            <Section title="TEAM" spaceAbove={80} indent={true}>

                <P>
                <B>Research & Design:</B> Wendy Chu (me!)<br/>
                <B>Engineering:</B> Mathieu Lue, Justin Sheckler
                </P>

            </Section>

            <Section title="PROBLEM STATEMENT" spaceAbove={80} indent={true}>

                <P>
                Primary’s previous navigation was very product-centric. It worked very well when there were only a handful of products being sold, but it was breaking under the number of products it needed to support.
                </P>

            </Section>







            <Spacer />
            
        </Container>
    },


    {route: "primary-product-detail-page",
    password: null,
    content:
        <Container>
            <h1>Primary Product Detail Page</h1>
            
        </Container>
    },


    {route: "primary-style-guide",
    password: null,
    content:
        <Container>
            <h1>Primary Style Guide</h1>
            
        </Container>
    },


    {route: "ralph-lauren-find-a-store",
    password: null,
    content:
        <Container>
            <h1>RL Find a Store</h1>
            
        </Container>
    },

    {route: "ralph-lauren-mobile-webstore",
    password: null,
    content:
        <Container>
            <h1>RL Mobile Webstore</h1>
            
        </Container>
    }]






    

    const selected = data.find( d => d.route === route)


    if (selected && (!selected.password || selected.password === password)) {
        return selected.content
    } else if (selected) {
        return (
        <Container>
            <h1>Enter Password</h1>
        </Container>
        )
    } else {
        return (
        <Container>
            <h1>404</h1>
        </Container>
        )        
    }

}


const Project = props => {

    const [password, setPassword] = useState(null)

    return choosePage(props.match.params.name, password, setPassword)
}





export default Project

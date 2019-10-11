import React, { useState } from 'react'

import styled from 'styled-components'


import ProjectHeader from '../UserInterface/ProjectHeader'
import Section from '../UserInterface/Section'
import ImageGroup from '../UserInterface/ImageGroup'
import SpanLink from '../UserInterface/SpanLink'

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
    margin:${props => props.noMargin ? "0" : "0 104px"};
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
                roleSummary="Managed one freelance UX researcher. Worked closely with internal stakeholders and engineers."
                pictureFile="laptop-mockup.png"
                alt="Desktop Navigation Flyout"
                caption="Desktop Navigation Flyout"
            />
           <Section title="" spaceAbove={40} indent={true}>
           <ImageGroup desktop="mobile-navigation-d.png" mobile="mobile-navigation-m.png" alt="Mobile Navigation" caption="Mobile Navigation"  />
           </Section>
          
           <Section title="OBJECTIVES" spaceAbove={80} indent={true}>

                <P>The project was meant to accomplish the following things:</P>

                <Ul>
                    <Li>Create a scalable and adminable navigation system that enables Primary to do more product storytelling. </Li>
                    <Li>Drive desktop users to PLPs rather than PDPs without negatively impacting the key metric: Add to Bag rate. </Li>
                    <Li>Address user-facing experience, accessibility information architecture, and product naming issues present in the existing navigation.</Li>
                    <Li>Align with established interaction patterns and best practices.</Li>
                    <Li>Update visual design to be consistent with refreshed brand style guide.</Li>
                </Ul>

</Section>
            <Section title="BACKGROUND" spaceAbove={80} indent={true}>
  
                <P>Many factors motivated this navigation/landing page redesign project:</P>
               
                <Ul>
                    <Li><B>Product assortment growth: </B>Primary’s navigation had been the same since they launched in 2015 with just a few dozen products. By early 2019, the product assortment had grown to 300+, and it had become more and more challenging to communicate the the assortment within the existing navigation without breaking it.</Li>
                    <Li><B>Desire for more product storytelling: </B>The creative and merchandising teams wanted to do more editorial storytelling and to communicate seasonality. Editorial emails had historically been high performers, but there was no way to leverage that content in the site experience, which seemed like a significant missed opportunity.</Li>
                    <Li><B>Quantitative & qualitative data:</B> Analytics data and usability testing observations showed significant UX issues, especially in the desktop experience:</Li> 
                    <Ul noMargin={true}>
                        <Li>In testing, desktop users (who make up ~70% of purchases) struggled with flyouts because small hover areas required precise mouse movements. </Li>
                        <Li>Within the desktop flyouts, products were shown as small thumbnails that were difficult for users to see. This wasn’t a good way to showcase our products.</Li>
                        <Li>Analytics showed that most desktop users wouldn’t reach a product landing page (PLP) and would instead go directly to product detail pages (PDPs). Once there, it was difficult for users to view more products because they would need to go through the navigation again, amplifying the usability issues.</Li>
                        <Li>Analytics also showed that the default “top 10” category flyout was by far the most interacted-with, which suggests that users might have missed the ability to view other categories for products more specific to their interests. </Li>
                    </Ul>
                    <Li><B>Non-standard product naming:</B>Primary had been using some unconventional terms to refer to its product categories, (e.g. “babysuits” instead of “bodysuits” and “Per4orm” instead of “active”). </Li>
                    <Li><B>Rethinking the product taxonomy:</B>There were also plans in the works to reorganize products according to internally understood attributes like cut and fabric. But I was skeptical and wanted to see how users would naturally categorize our products.</Li>
                          
                </Ul>
            </Section>

            <Section title="DESIGN & IMPLEMENTATION PROCESS" spaceAbove={80} indent={true}>
                <P>The design process was done in a very collaborative agile way, with twice-weekly in-person checkins between design and engineering and daily written standups.</P>
                <P><B>Research</B></P>
                <Ul>
                    <Li>Compiled existing user research & data and conducted stakeholder interviews.</Li>
                    <Li>Conducted visual cardsorting of kids & baby products using Optimalsort.</Li>
                    <Li><B>Results:</B></Li>
                        <Ul noMargin={true}>
                        
                            <Li>Most users talked about how they would organize their children’s closets by seasonality. Instead of arranging things by cut or fabric as merchandising had originally planned, they tended to arrange things by category, and then by seasonal attributes like sleeve length.</Li>
                            <Li>This is important, because most other retailers’ product assortments would naturally reflect seasonality as they phase products in and out of stock, but Primary’s assortment had always been intended to be evergreen, so this was a critical piece of insight for the business.</Li>
                        </Ul>
                    <Li>Conducted competitive analysis and competitive user testing with help from our UX researcher to quickly validate general directions for desktop and mobile. We were trying to decide between a few different interaction models on desktop and mobile, as shown below.
                    <ImageGroup desktop="wclogo.png" mobile="" alt="" caption="..." />
                    </Li>
                    <Li><B>Results:</B></Li> 
                    <Ul noMargin={true}>
                        <Li>I was able to narrow options down to a traditional hamburger menu on mobile and simple text-based flyouts on desktop, with space for some editorial content.</Li> 
                        <Li>These were both the most common patterns in our competitive analysis and the ones that users preferred, likely because of their familiarity. </Li>
                    </Ul>
                </Ul>
                
            </Section>
            <Section title="DESIGN" spaceAbove={80} indent={true}>
                <Ul>
                    <Li>Sketched multiple desktop and mobile concepts based on research to quickly run by engineers and stakeholders.
                        <ImageGroup desktop="wclogo.png" mobile="" alt="" caption="..." />
                    </Li>
                    <Li>Created low fidelity designs in Sketch, which I used to gather feedback from engineers and stakeholders. Made revisions based on their feedback.</Li>
                    <Li>Tested medium-fidelity desktop & mobile InVision prototypeswith help from our UX researcher and made minor visual revisions. <br/>
                    <SpanLink href="https://invis.io/VTRWDNUK6HY">Mobile Prototype</SpanLink> <br/>
                    <SpanLink href="https://invis.io/49RWDNJBTFS">Desktop Prototype</SpanLink>
                        <ImageGroup desktop="wclogo.png" mobile="" alt="" caption="Prototype Screens" />
                    </Li>
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

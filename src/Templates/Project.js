import React, { useState } from 'react'

import styled from 'styled-components'


import ProjectHeader from '../UserInterface/ProjectHeader'
import Section from '../UserInterface/Section'
import ImageGroup from '../UserInterface/ImageGroup'

import SpanLink from '../UserInterface/SpanLink'
import Company from '../UserInterface/Company'
import ProjectLink from '../UserInterface/ProjectLink'

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
    height: ${props=>props.height ? props.height : "16"}px;
`


const CompanyContainer = styled.div`

    display: flex;

    margin: 64px 0 0 0;

    @media (max-width: 768px) {
        margin: 40px 0 0 0;
        flex-direction: column;
    }

`

const Footer = styled.div`
    width: 100%;
    border-top: 1px solid rgba(33, 53, 113, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;

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
                pictureFile="PrimaryNav/laptop-mockup.png"
                alt="Desktop Navigation Flyout"
                caption="Desktop Navigation Flyout"
            />
           <Section title="" spaceAbove={40} indent={true}>
           <ImageGroup desktop="PrimaryNav/mobile-navigation-d.png" mobile="PrimaryNav/mobile-navigation-m.png" alt="Mobile Navigation" caption="Mobile Navigation"  />
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
  
                <P>Many factors motivated this navigation/landing page redesign project:
            
               
                </P>
                <ImageGroup desktop="PrimaryNav/old-desktop-nav-d@2x.jpg" mobile="" alt="" caption="Old Desktop Navigation" />
                <br/>
                <Ul>
                    <Li><B>Product assortment growth: </B> Primary’s navigation had been the same since they launched in 2015 with just a few dozen products. By early 2019, the product assortment had grown to 300+, and it had become more and more challenging to communicate the the assortment within the existing navigation without breaking it.</Li>

                    <Li><B>Desire for more product storytelling: </B> The creative and merchandising teams wanted to do more editorial storytelling and to communicate seasonality. Editorial emails had historically been high performers, but there was no way to leverage that content in the site experience, which seemed like a significant missed opportunity.</Li>

                    <Li><B>Quantitative & qualitative data:</B> Analytics data and usability testing observations showed significant UX issues, especially in the desktop experience:</Li> 
                    
                        <Ul noMargin={true}>
                            <Li>In testing, desktop users (who make up ~70% of purchases) struggled with flyouts because small hover areas required precise mouse movements. </Li>
                            <Li>Within the desktop flyouts, products were shown as small thumbnails that were difficult for users to see. This wasn’t a good way to showcase our products.</Li>
                            <Li>Analytics showed that most desktop users wouldn’t reach a product landing page (PLP) and would instead go directly to product detail pages (PDPs). Once there, it was difficult for users to view more products because they would need to go through the navigation again, amplifying the usability issues.</Li>
                            <Li>Analytics also showed that the default “top 10” category flyout was by far the most interacted-with, which suggests that users might have missed the ability to view other categories for products more specific to their interests. </Li>
                        </Ul>

                    <Li><B>Non-standard product naming:</B> Primary had been using some unconventional terms to refer to its product categories, (e.g. “babysuits” instead of “bodysuits” and “Per4orm” instead of “active”). </Li>
                   
                    <Li><B>Rethinking the product taxonomy:</B> There were also plans in the works to reorganize products according to internally understood attributes like cut and fabric. But I was skeptical and wanted to see how users would naturally categorize our products.</Li>
                          
                </Ul>
            </Section>

            <Section title="DESIGN & IMPLEMENTATION PROCESS" spaceAbove={80} indent={true}>
                <P>The design process was done in a very collaborative agile way, with twice-weekly in-person check-ins between design and engineering and daily written standups. I was heavily involved in all parts of the process, which is detailed below.</P>
            <P><B>1. Research</B></P>
                <Ul>
                    <Li>Compiled existing user research & data and conducted stakeholder interviews.</Li>
                    <Li>Conducted visual cardsorting of kids & baby products using Optimalsort.<Spacer />
                    <B>Results:</B><br/>
                        <Ul noMargin={true}>
                        
                            <Li>Most users talked about how they would organize their children’s closets by seasonality. Instead of arranging things by cut or fabric as merchandising had originally planned, they tended to arrange things by category, and then by seasonal attributes like sleeve length.</Li>
                            <Li>This is important, because most other retailers’ product assortments would naturally reflect seasonality as they phase products in and out of stock, but Primary’s assortment had always been intended to be evergreen, so this was a critical piece of insight for the business.</Li>
                       
                        </Ul> </Li>
                    <Li>Conducted competitive analysis and competitive user testing with help from our UX researcher to quickly validate general directions for desktop and mobile. We were trying to decide between a few different interaction models on desktop and mobile, as shown below. <Spacer/>
                    <B>Results:</B>
                    <Ul noMargin={true}>
                            <Li>I narrowed the options down to a traditional hamburger menu on mobile and simple text-based flyouts on desktop, with space for some editorial content.</Li> 
                            <Li>These were both the most common patterns in our competitive analysis and the ones that users preferred, likely because of their familiarity. </Li>
                        </Ul></Li></Ul>

                    <ImageGroup desktop="PrimaryNav/comp-analysis@2x.png" mobile="" alt="" caption="Competitive Examples Gathered" /><Spacer />
            
                
            <P><B>2. Design</B></P>
                <Ul>
                    <Li>Sketched multiple desktop and mobile concepts based on research to quickly run by engineers and stakeholders.</Li>
                    <ImageGroup desktop="PrimaryNav/sketches-m@2x.png" mobile="" alt="" caption="Navigation Sketches" />
                    </Ul>
                       
                    
                        
                <Ul>
                    <br/>
                    <Li>Created low fidelity designs in Sketch, which I used to gather feedback from engineers and stakeholders. Made revisions based on their feedback.</Li>
                    <Li>Tested medium-fidelity desktop & mobile InVision prototypes with help from our UX researcher and made minor visual revisions. <Spacer/>
                    
                        <SpanLink href="https://invis.io/7GUCJ9RRM3K">Desktop Prototype</SpanLink><Spacer/>
                        <SpanLink href="https://invis.io/XBUCJBHJYN6#/360602640_Navigation_-320--_Main">Mobile Prototype</SpanLink>
                    </Li>

                    </Ul>
                    <ImageGroup desktop="PrimaryNav/invision-desktop-nav@2x.jpg" mobile="" alt="" caption="Invision Desktop Navigation Prototype" />
                    <ImageGroup desktop="PrimaryNav/invision-mobile-nav@2x.jpg" mobile="" alt="" caption="Invision Mobile Navigation Prototype" />
                <Ul>
                    
                    
                    
                    <Li>Created pixel-perfect production-ready designs to communicate with engineers in Zeplin.</Li>
                </Ul>
            <P><B>3. Build</B></P>
                <Ul>
                    <Li>Collaborated with engineers and stakeholders on design & interaction details and reasonable content limits for the CMS</Li>
                    <Li>Lead extensive QA of the design to ensure that it aligned with the design system, and worked with engineers to refine final visual design and animations</Li>
                    <Li>This navigation is currently live at <SpanLink href="http://www.primary.com">Primary.com</SpanLink>!</Li><Spacer height="40" />
                    </Ul>

                    <iframe src="https://player.vimeo.com/video/365849063" width="100%" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title="Desktop navigation animation"></iframe><Spacer height="" />
                    <iframe src="https://player.vimeo.com/video/365849339" width="100%" height="600px" title="Mobile navigation animation" frameborder="0" ></iframe><br/>
                    
                
            <P><B>4. Test</B></P>
                <Ul>
                    <Li>After implementation, we conducted internal usability testing of the final product before releasing it to the public as a 50/50 A/B test for one month.</Li>
                    <Li>We also conducted post-launch usability testing with external users experience to validate that the final product worked as expected for users.</Li>
                </Ul>
            </Section>
            <Section title="RESULTS" spaceAbove={80} indent={true}>
                <P>The project was considered a success, and after the A/B test validation, we <B>released it to 100% of users</B>.</P>

                <P>Metrics-wise, we <B>increased PLP view rate on desktop by 15%</B>, and decreased PDP view rate by only 4%. There were no changes to PDP/PLP view rate on mobile or to our lead metric, add-to-bag rate, on desktop or mobile. Given the unchanged add-to-bag rate, we concluded that it's a positive trade-off since <B>more users are progressing down the funnel</B> than before.</P>

                <P>In usability testing, users didn’t run into any of the previous usability issues, and were able to <B>navigate more quickly</B> to their desired categories. They also had an easier user flow going from Navigation to PLP to PDP and back to PLP.</P>

                <P>With the new design, we were able to <B>double the number of top-level categories</B> that could be shown from 4 to 8, allowing Primary’s navigation to be more seasonal and editorial. Internal stakeholders were thrilled with the new editorial content slots and the ease with which they could change the navigation.</P>
            </Section>
{/* 
            <Section title="TEAM" spaceAbove={80} indent={true}>

                <P>
                <B>Research & Design:</B> Wendy Chu (me!)<br/>
                <B>Engineering:</B> Mathieu Lue, Justin Sheckler
                </P>

            </Section> */}

           







          
            
        </Container>
    },


    {route: "primary-product-detail-page",
    password: null,
    content:
        <Container>
            <ProjectHeader 
                company="Primary.com"
                date="In Progress"
                title="Product Detail Page"
                responsibilities="UX Research, Strategy, UX Design, Visual Design"
                roleSummary="Managed a UX research freelancer and a freelance UI designer for parts of this project. Worked closely with internal stakeholders and engineers."
                pictureFile="PrimaryPDP/pdp-laptop-mockup@2x.png"
                alt="Primary Product Detail Page - Desktop"
                caption="Product Detail Page - Desktop"
            />
        <Section title="" spaceAbove={40} indent={true}>
           <ImageGroup desktop="PrimaryPDP/pdp-i-phone-mockup@2x.png" mobile="" alt="Product Detail Page - Mobile" caption="Product Detail Page - Mobile"  />
           </Section>
             <Section title="OBJECTIVES" spaceAbove={80} indent={true}>
                 <br/>
                <Ul>
                    <Li>Make it easier for users to select their desired size & color of products by displaying more specific availability information (bidirectional stock indication) </Li>
                    <Li>Increase add to bag rate by moving selectors higher up on the page </Li>
                    <Li>Display product photography more prominently and flexibly </Li>
                    <Li>Communicate design details and quality</Li>
                    <Li>Reinforce our commitment to gender-free apparel</Li>
                    <Li>Align with established interaction patterns and best practices</Li>
                    <Li>Update visual design to be consistent with refreshed brand style guide</Li>
                    <Li>Improve accessibility by ensuring that all text passes WCAG 2.0 AAA contrast standards and increasing the smallest text size. </Li>
                 
                </Ul>
             </Section>



            <Section title="BACKGROUND" spaceAbove={80} indent={true}>

           <P> <ImageGroup desktop="PrimaryPDP/old-pdp@2x.png" mobile="" alt="" caption="Old product detail page" /></P>
                <P>The product detail page (PDP) is arguably the most important page at the top of the purchase funnel, and most of our best-performing Facebook ads and emails link directly to PDPs. As a result, a redesign project started and stopped many times before finally being prioritized, and was the result of significant research and thinking. The biggest motivations were: </P>

                <Ul>
                    <Li><B>Usability issues & standard patterns:</B>  On the vast majority of ecommerce product detail pages (PDPs), color selection is positioned above size. Primary’s PDP, however, had size selection before color selection. 
                    <Spacer/>
                    Usability testing I’d conducted on Primary's PDP showed that, despite size being positioned above color,  about half the time users would look through colors before selecting their appropriate size. This works fine if every size and color is in stock, users became confused when a color suddenly went out of stock after they selected a size, because it goes against the color-first convention that they've subconsciously become used to. 
                    </Li>

                    <Li><B>Inefficiency:</B> On mobile (~70% of traffic), positioning color swatches below size selections forced users to repeatedly scroll up and down the page when selecting a color and subsequently viewing an image.<Spacer />
                    On desktop, the product details appeared above the size/color selectors and the add to bag button, causing users to have to scroll in order to view selections and add products to their bag, especially on products with longer descriptions. Changing this would make size/color selection significantly more efficient, and we hoped that it would thereby increase the add to bag rate.</Li>

                    <Li><B>Accessibility:</B> In usability testing, users occasionally mentioned having difficulty reading text or wished that text was bigger. The text in size selectors and the size chart was indeed small, and the text contrast oftentimes did not pass WCAG 2.0 standards.</Li>

                    <Li><B>New and improved photography:</B> Primary used to photograph and retouch every size and color combination for their on-model images. However, I discovered in usability that users typically wouldn’t notice this detail and would occasionally even get distracted by the extra information. As a result, we shifted the photo strategy and began photographing fewer sizes of children and investing in higher quality photos and more angles.
                    <Spacer />
                    The new photos were amazing, but the existing photo slots were both limited in number and fairly small. It also took a significant number of clicks/work for users to look through all of the images. We needed a better way to display all of this new imagery and allow users to easily look through it all. 
                    </Li>

                    <Li><B>Desire to communicate product quality:</B> Although Primary has consistently received high NPS scores (usually in the high 80s to low 90s), a common complaint has been about the prices, which are reasonable, but not quite bargainous. The products are both ethically produced and high quality, with thoughtful design details (pockets on dresses, thumbholes on hoodies, OEKO-Tex certified fabric), but that’s not obvious from looking on the website, which is a huge missed opportunity.
                    <Spacer />
                    We hypothesized that communicating product quality with better imagery and product attribute icon callouts would serve to elevate both the site experience and the products themselves, so that users would believe that they are getting amazing quality for a fair price.     
                    </Li>
                </Ul>

            </Section>



            <Section title="DESIGN & IMPLEMENTATION PROCESS" spaceAbove={80} indent={true}>
            <P><B>1. Research</B></P>
            <Ul>
                <Li>Compiled existing user research & data, and conducted competitive analysis of other ecommerce sites.</Li>
                <Li>With assistance from a freelancer UX researcher, I conducted competitive usability testing on a subset of competitor PDPs that we believed to have a good experience based on usability heuristics. We focused on bi-directional size/color selection (J. Crew), vertically scrolling images on desktop (Everlane, Aritzia, Totokaelo). </Li>

                <P><ImageGroup desktop="PrimaryPDP/Jcrew_Bidirectional_2.gif" mobile="" alt="" caption="J.Crew's bidirectional size/color selectors"  /></P><Spacer/>
                <ImageGroup desktop="PrimaryPDP/EverlaneScroll.gif" mobile="" alt="" caption="Everlane's vertically scrolling product images"  /><Spacer/>
                <ImageGroup desktop="PrimaryPDP/pdp-totokaelo@2x.jpg" mobile="" alt="" caption="Totokaelo's 2-column image layout"  />
                <Ul noMargin={true}>
                    <Li><B>Results:</B> Bidirectional size and color selection was intuitive for all 10 users we tested. Users generally liked the ease of being able to scroll through images vertically and found it intuitive. However, some found Totokaelo’s 2-column layout to be distracting and preferred to view larger images in a single column instead. Users also preferred having thumbnails on the side so that they could preview and jump to their desired image.
                    </Li>
                </Ul>
            </Ul>
            <P><B>2. Design</B></P>
            <Ul>
                <Li>
                After usability testing, I jumped right into rough mockups because I already had some older designs and a good sense of the project objectives, as noted above. I put together some low-fidelity mockups based on the research results to get buy-in and alignment on the design from stakeholders. The response was quite positive, with the only open questions being which product attributes we most wanted to elevate. 
                </Li></Ul>
        <P><ImageGroup desktop="PrimaryPDP/pdp-rough-mocks@2x.png" mobile="" alt="" caption="Rough Mockups"  /> </P>
           <Ul>
            <Li>
            After getting buy-in and feedback, I worked with a freelance UI designer to refine the visual design of the page, using the existing style guide. 
            </Li>
            </Ul>

            <Ul>
            <Li>
            Because a change to the image layout would impact an expensive upcoming photoshoot, I wanted to make extra sure that we were going in the right direction in terms of the image display. With help from a freelance UX researcher, we put together some rough Invision prototypes of the different versions for balanced comparison testing of the image layout.<br/>
            <Ul noMargin={true}>
            <Li>On Desktop: <SpanLink href="https://invis.io/HRS0FHRA86U">single column with thumbnails</SpanLink>, <SpanLink href="https://invis.io/H3UCNABZECR">single column without thumbnails</SpanLink>, and <SpanLink href="https://invis.io/UCUCNBA6935">two-column without thumbnails</SpanLink>. </Li>
            
            <Li>On Mobile: <SpanLink href="https://invis.io/MKUCNFQBT68">visual peek affordance</SpanLink></Li>
            <Li><B>Results: </B> The results of prototype testing were similar to what we saw in competitive testing, so we were able to confidently move forward with a single-column scrollable layout with thumbnails. </Li>
            </Ul>
            </Li>
            <Li>
            I then took the final design from the UI designer, cleaned it up in a few places where things didn’t match the style guide, and made it ready for production in Zeplin. 
            </Li>
            </Ul>
            <ImageGroup desktop="PrimaryPDP/pdp-andrii@2x.png" mobile="" alt="" caption="Final mockups"  />

        <P><B>3. Prioritize</B></P>
            <Ul>
            <Li>
            I worked with a team of two engineers to break down and prioritize the different phases of the PDP project. We initially broke it down into three main phases: 
            <Ul noMargin={true}>
                <Li><B>1.1:</B> Size & color selectors and the add to bag area so that we can isolate the bidirectional behavior for A/B testing purposes.</Li>
                <Li><B>1.2:</B> Refactor the rest of the page — we were gradually transitioning the app from Angular to React.</Li>
                <Li><B>1.3:</B> Implement scrolling images and product attribute icons — these would require more decision-making from other teams, and would thus take longer to finalize</Li>
            </Ul>
            </Li>
            </Ul>
        <P><B>4. Build</B></P>
            <Ul>
                <Li>During the build phase, I collaborated closely with the engineers building the project in an agile process we constantly communicated during this process in order to collaboratively solve new issues and edge cases. <Spacer />

                For example: Our engineer discovered that it was actually extremely difficult to set up the size swatches as originally designed because swatches would require different border styling depending on their position, and it was complicated to determine the position given the responsiveness of the page. We solved this by working through a few design variations together before settling on an option we thought worked best. 
            <P><ImageGroup desktop="PrimaryPDP/PDPSizeSelectors.jpg" mobile="" alt="" caption="Size selector variations"  /></P>
                </Li>
            </Ul>

        <P><B>5. Test</B></P>
            <Ul>
                <Li>We released phase 1.1 internally, and the feedback about the new layout and bidirectional interaction was very positive, as internal users found it more efficient to use.
                <Spacer/>
                However, stakeholders in merchandising were concerned that on some products, we would be mixing in-stock and out of stock colors in a random way. After talking through some possible solutions together, we settled on displaying every color swatch for which there is stock in some size, hiding colors that were out of stock in every size, and moving out of stock colors to the end of the list. This allowed the swatches to behave in a consistent manner while also helping users clearly see which colors were available for their selected size. 
                </Li>
                <Li>
                    At this stage, we realized that separately A/B testing phase 1.1 (refactoring only the size/color selectors while keeping the rest of the page in Angular) was going to be significantly more difficult than anticipated, because it required making sure things didn't break in 3 different environments (version A, version B, and the future all-React page). After discussing as a team, we decided to combine phases 1.1 and 1.2 into one larger release for A/B testing against the old Angular page.  
                </Li>
             
            </Ul>

            </Section>


            <Section title="TO BE CONTINUED" spaceAbove={80} indent={true}>
            <P>
                At the time of writing, this project is still in progress. We pulled back phase 1.1 from internal testing, and an A/B test of the new PDP phases 1.1 & 1.2 vs the current PDP should be coming shortly! 
                </P>
            </Section> 

             
        </Container>
    },


    {route: "primary-style-guide",
    password: null,
    content:
        <Container>
             <ProjectHeader 
                company="Primary.com"
                date=""
                title="Design System Creation"
                responsibilities="System Design, Documentation, Visual Design, Interaction Design"
                roleSummary="Created, iterated on, and maintained Primary's first digital design system in close partnership with engineers. Managed Sketch component library and Zeplin style guide. Advocated for usage and consistency across the organization and discouraged creation of one-offs."
                pictureFile="PrimarySG/Combo-colors-text@2x.png"
                alt="Colors & Text Styles"
                caption="Colors & Text Styles"
            />
            <Section title="" spaceAbove={40} indent={true}>
                <ImageGroup desktop="PrimarySG/Combo-links-buttons@2x.png" mobile="PrimarySG/combo-links-buttons-m@2x.png" alt="" caption="Link & Button Styles"  />
            </Section>
            <Section title="MOVING TOWARD A DESIGN SYSTEM" spaceAbove={80} indent={true}>
            <ImageGroup desktop="PrimarySG/colors-new@2x.jpg" mobile="" alt="" caption="The beginning of the Primary Design System."  />
                <P>As both the design system and the team grew, design system documentation became more fragemented. We had  information in various Confluence pages, Zeplin, the code itself, and, in people's minds and passed down through oral tradition. Onboarding full-time and freelance designers and engineers into the design system became a huge growing pain. We needed to create a more accessible and centralized place to store our style guide.</P>

                <P>Typically, design system documentation written by engineers was written for other engineers, and didn't contain visuals or provide enough detail around use cases for product design. Conversely, the visual documentation I had created had been created for myself and other designers, and didn't always refer to actual code or utility class names. This worked when most of the users of the system were also building the system, and others could be taught piecemeal, but as the team grew and design system knowledge became more diluted, it became harder and more time-consuming to rely on engineers to educate each other on usage. Furthermore, there was simply more nuance to design than anyone could easily commit to memory, and there wasn't a single source of truth other than, well, me. And that certainly would not scale. </P>
                    
                    <P>The engineers working on the styleguide and I had been discussing this issue for a while, and had agreed that a centralized internal styleguide site would be the ideal solution, because it would be fairly simple to manage, new components could be easily added as they were built, any changes would automatically propagate, and all of the relevant information would be easily accessible to internal users. However, none of us had bandwidth or management approval to work on it. As a result, that idea sat in our minds for a while, never becoming reality.</P> 
                    
                    <P>When there was a companywide hackaton a few months later, one of the engineers and I jumped at the opportunity to dedicate some time to fleshing out the idea. We ended up tackling the problem from two different dierctions: he worked on getting an MVP page of the existing components and documentation up in a digital format while I used my usual design process to envision what a better future state might look like.  </P>  </Section>

            <Section title="DESIGNING DESIGN SYSTEM 2.0" spaceAbove={80} indent={true}><Spacer/>
                <Ul>
                <Li><B>Background:</B>  Because of the aforementioned issues with the existing design documentation, I wanted to create a resource to address the needs of both designers and engineers while also adhering to established best practices in design systems.
                </Li>
                <Li><B>Research:</B> I was fortunate to be able to draw on my close working relationships with engineers at Primary. As the only product designer at the companyall design questions would eventually come to me, so I had been able to track trends in the kinds of questions being asked. , but I didn't want to merely stop there. So I looked into design system best practices in order to see how other organizations had done it. 

                <Spacer/>I began by looking at other examples of public design systems in this <SpanLink href="https://designsystemsrepo.com/design-systems-recent/">design system gallery</SpanLink> to gather ideas and identify common methods of documentation. I particularly liked Shopify's <SpanLink href="https://polaris.shopify.com/">Polaris Design System</SpanLink> as well as <SpanLink href="https://etrade.design/colors">Etrade's</SpanLink> and <SpanLink href="https://blocks.cbrebuild.com/styles/colors/">CBRE Build's</SpanLink> representations of colors. And of course, I also looked at Google's <SpanLink href="https://material.io/">Material Design System</SpanLink>, on which the original Primary Design System was loosely based. <Spacer/>

                 My biggest “aha” moment coming out of this was that it's not enough to just document what the components are or how to use them. It was also important to explain the <B>underlying principles</B> of the system alongside. We had just focused on documenting the "what" and "how," and hadn’t given enough time to documenting the “why,” relying instead on ad hoc conversations to communicate this to our internal users. <Spacer/>

                Engineers tend to be natural systems thinkers, and lack of documentation about the conceptual basis for the system made design decisions seem more arbitrary and less, well, systemic. It also failed to support an important personal goal I'd had since starting as the sole product designer at Primary: creating more product design understanding across the organization in order to scale design in the absence of more designers. 
                
                </Li> 
                
                <Li><B>Planning & Information Architecture:</B> After the research, I created an inventory of the components that already existed and organized them into common sections, resulting in a rough information architecture of the existing system. This would simultaneously function as a to-do list for tackling the project a little at a time in the future.</Li>
                </Ul>
                <P></P>
             
            </Section>
            <P>More information coming soon! In the meantime, you can view the full style guide on <SpanLink href="https://sketch.cloud/s/0Go8O/p/style-guide">Sketch Cloud</SpanLink>.</P>

        
        </Container>
    
    },


    {route: "ralph-lauren-find-a-store",
    password: "squiggle",
    content:
        <Container>
            <h1>RL Find a Store</h1>
            
        </Container>
    },

    {route: "ralph-lauren-mobile-webstore",
    password: "squiggle",
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
    
    return (
        <>
        {choosePage(props.match.params.name, password, setPassword)}
        <Spacer height="104"/>
        
        <Footer>
            <CompanyContainer>
                <Company title="More from Primary.com:" footer={true}>
                    <ProjectLink text="Navigation Redesign" route="primary-navigation-redesign" footer={true} currentRoute={props.match.params.name}/>
                    <ProjectLink text="Product Detail Page" route="primary-product-detail-page" footer={true} currentRoute={props.match.params.name}/>
                    <ProjectLink text="Design System Creation" route="primary-style-guide" footer={true} currentRoute={props.match.params.name}/>
                </Company>
                {/* <Company title="Ralph Lauren">
                    <ProjectLink text="Find a Store" route="ralph-lauren-find-a-store"/>
                    <ProjectLink text="Mobile Webstore" route="ralph-lauren-mobile-webstore"/>
                </Company> */}
            </CompanyContainer>
            <Spacer height="104"/>
        </Footer>
        
        </>

    )

}





export default Project

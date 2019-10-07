import React from 'react'

import styled from 'styled-components'

import Section from '../UserInterface/Section'
import Company from '../UserInterface/Company'
import Link from '../UserInterface/Link'
import Paragraph from '../UserInterface/Paragraph'

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

const Landing = props => {
    return (
        <Container>
            <Section title="ABOUT ME" spaceAbove={120}>


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

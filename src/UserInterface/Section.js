import React from 'react'

import styled from 'styled-components'

const Container = styled.div`

    margin: ${props => props.spaceAbove}px 0 0 0;

    width: 80vw;

    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        margin: ${props => props.spaceAbove * 0.7}px 0 0 0;
    }

`

const Title = styled.h2`

    margin: 0 0 0 16px;

    color: #de3c2c;

    font-size: 13px;
    font-weight: 500;
    line-height: 1.85;
    letter-spacing: 2.43px;

    font-family: 'Roboto Mono', monospace;

`

const Row = styled.div`
    display: flex;
    align-items: center;
`

const RedLine = styled.div`
    width: 40px;
    height: 2px;
    background: #de3c2c;
`

const Section = props => {
    return (
        <Container spaceAbove={props.spaceAbove}>
            <Row><RedLine /><Title>{props.title}</Title></Row>
            {props.children}
        </Container>
    );
}

export default Section

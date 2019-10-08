import React from 'react'

import styled from 'styled-components'


const Container = styled.div`

    display: flex;
    flex-direction: column;

    margin: 0 100px 120px 0;

    @media (max-width: 768px) {
        margin: 0 0 80px 0;
    }

`

const Title = styled.h3`

    margin: 0;
    

    font-size: 13px;
    font-weight: 500;
    line-height: 1.85;
    letter-spacing: 0.8px;

    font-family: 'Roboto Mono', monospace;

    color: #213571;

`

const Company = props => {
    return (
        <Container>
            <Title>{props.title}</Title>
            {props.children}
        </Container>
    )
}

export default Company

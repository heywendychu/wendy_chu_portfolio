import React from 'react'

import styled from 'styled-components'

const Container = styled.a`
    width: fit-content;
    
    line-height: 1.5;
    letter-spacing: 0.53px;
    color: #1b2c63;
    font-size: 32px;

    font-family: CanelaWeb;

    margin: 32px 0 0 0;

    

    @media (max-width: 768px) {
        font-size: 28px;
        line-height: 1.71;
        letter-spacing: 0.47px;
    }
`

const Span = styled.span`
    box-shadow: 0 1px 0 rgba(33, 53, 113, 0.26);
`

const Link = props => {
    return (
        <Container><Span>{props.text}</Span></Container>
    )
}

export default Link

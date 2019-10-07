import React from 'react'

import styled from 'styled-components'

const Container = styled.a`
    width: fit-content;
    
    font-size: 28px;
    line-height: 1.71;
    letter-spacing: 0.47px;
    color: #1b2c63;

    margin: 32px 0 0 0;

    text-decoration: underline rgba(33, 53, 113, 0.26);
`

const Link = props => {
    return (
        <Container>{props.text}</Container>
    )
}

export default Link

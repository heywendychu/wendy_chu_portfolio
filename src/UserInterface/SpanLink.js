
import React from 'react'

import styled from 'styled-components'

const Container = styled.a`

    cursor: pointer;

    color: #1b2c63;
    text-decoration-color: rgba(33, 53, 113, 0.5);

    font-weight: 700;

    :hover {
        color: #de3c2c;
        text-decoration: none;
    }

`

const SpanLink = props => {
    return (
        <Container href={props.href} target="_blank">
            {props.children}
        </Container>
    );
}

export default SpanLink;

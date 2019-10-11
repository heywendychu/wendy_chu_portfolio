
import React from 'react'

import styled from 'styled-components'

const Container = styled.a`

    cursor: pointer;

    color: #1b2c63;
    

    font-weight: 700;

`

const SpanLink = props => {
    return (
        <Container href={props.href}>
            {props.children}
        </Container>
    );
}

export default SpanLink;

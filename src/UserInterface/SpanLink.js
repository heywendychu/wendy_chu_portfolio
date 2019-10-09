
import React from 'react'

import styled from 'styled-components'

const Container = styled.a`

    cursor: pointer;

    font-weight: 700;
    text-decoration: underline;

`

const SpanLink = props => {
    return (
        <Container>
            {props.children}
        </Container>
    );
}

export default SpanLink;

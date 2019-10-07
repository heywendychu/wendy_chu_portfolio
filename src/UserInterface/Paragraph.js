import React from 'react'
import styled from 'styled-components'

const Container = styled.p`
    text-align: left;
    width: ${props => props.width};
    font-size: 16px;
    line-height: 2;
    letter-spacing: 0.2px;
    color: #1b2c63;

    @media (max-width: 768px) {

        width: 96%;
        max-width: ${props => props.width};

    }


`

const Paragraph = props => {
    return (
        <Container width={props.width}>
            {props.children}
        </Container>
    );
}

export default Paragraph;

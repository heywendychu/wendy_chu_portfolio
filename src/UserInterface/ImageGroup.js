import React from 'react'

import styled from 'styled-components'



// Two images: one desktop, one mobile. Both full width, auto height. Optional caption.

const Container = styled.div`
    width: 100%;
`

const Picture = styled.img`

    width: 100%;
    height: auto;

    margin: 40px 0 0 0;

    display: ${props => props.toggle === "mobile" ? "none" : "block"}


    @media (max-width: 768px) {

        display: ${props => props.toggle === "desktop" ? "none" : "block"}

    }


`

const Caption = styled.div`

    margin: 16px 0 24px 0;

    font-family: 'Roboto Mono', monospace;
    font-size: 12px;
    line-height: 1.67;
    text-align: center;
    color: #1b2c63;

`



const ImageGroup = props => {
    return (
        <Container>

            <Picture toggle={props.mobile ? "desktop" : null} src={`/images/${props.desktop}`} alt={props.alt} />
            {props.mobile ? <Picture toggle={"mobile"} src={`/images/${props.mobile}`} alt={props.alt} /> : null }
            <Caption>{props.caption}</Caption>
            
        </Container>
    );
}

export default ImageGroup

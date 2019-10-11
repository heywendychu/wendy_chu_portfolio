import React from 'react'

import styled from 'styled-components'

const Container = styled.div`

    margin: 80px 0 0 0;

    width: 100%;
    max-width: 800px;

`

const RedLine = styled.div`
    width: 40px;
    height: 3px;
    background: #de3c2c;
`

const TopInfo = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.85;
    letter-spacing: 0.8px;
    color: #213571;

    margin: 32px 0 0 0;
`

const Title = styled.h1`

    font-family: CanelaWeb;
    font-size: 56px;
    line-height: 1.3;
    letter-spacing: 0.93px;
    color: #1b2c63;
    font-weight: 400;

    margin: 24px 0 0 0;

    @media (max-width: 768px) {
        font-size: 40px;
        line-height: 1.25;
        letter-spacing: 0.67px;
    }

`

const Responsibilities = styled.div`

    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
    line-height: 2;
    color: #1b2c63;

    width: 90%;

    margin: 8px 0 0 0;

    @media (max-width: 768px) {
        font-size: 14px;
    }

`

const BigPicture = styled.img`

    width: 100%;
    height: auto;

    margin: 56px 0 0 0;

    @media (max-width: 768px) {
        margin: 32px 0 0 0;
    }

`

const Caption = styled.div`

    margin: 24px 0 0 0;

    font-family: 'Roboto Mono', monospace;
    font-size: 12px;
    line-height: 1.67;
    color: #1b2c63;

    text-align: center;

    @media (max-width: 768px) {
        margin: 16px 0 0 0;
    }


`

const ProjectHeader = props => {
    return (
        <Container>
            <RedLine />
            <TopInfo>{props.company}{props.date ? ` | ${props.date}` : null}</TopInfo>
            <Title>{props.title}</Title>
            <Responsibilities><span style={{fontWeight: '500'}}>Responsibilities:</span> {props.responsibilities}</Responsibilities>
            <br/>
            <Responsibilities>{props.roleSummary}</Responsibilities>
            <BigPicture src={`/images/${props.pictureFile}`} alt={props.alt}/>
            {props.caption ? <Caption>{props.caption}</Caption> : null}

            
        </Container>
    );
}

export default ProjectHeader

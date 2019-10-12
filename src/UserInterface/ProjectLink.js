import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Container = styled(Link)`

    text-decoration: none;

    width: fit-content;
    
    line-height: 1.5;
    letter-spacing: 0.53px;
    color: #1b2c63;
    font-size: 32px;

    font-family: CanelaWeb;

    margin: 32px 0 0 0;

    cursor: pointer;
    

    

    @media (max-width: 768px) {
        font-size: 28px;
        line-height: 1.71;
        letter-spacing: 0.47px;
    }
`

const Span = styled.span`
    box-shadow: 0 1px 0 rgba(33, 53, 113, 0.26);

    :hover {
        box-shadow: 0 1px 0 #DE3C2C;
    }
`

const ProjectLink = props => {
    return (
        <Container to={`/projects/${props.route}`}><Span>{props.text}</Span></Container>
    )
}

export default ProjectLink

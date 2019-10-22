import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Container = styled(Link)`

    text-decoration: none;

    width: fit-content;
    
    line-height: 1.5;
    
    color:  ${props => props.present ? '#de3c2c' : '#1b2c63'};
    font-size: ${props => props.footer ? '24px' : '28px'};

    font-family: CanelaWeb;

    margin: 32px 0 0 0;

    cursor: ${props => props.present ? "auto" : "pointer"};


        

    @media (max-width: 768px) {
        font-size: ${props => props.footer ? '24px' : '28px'};
        line-height: 1.4;
        letter-spacing: 0.47px;
    }
`

const Span = styled.span`
   
    ${props => props.present ? null : 'box-shadow: 0 1px 0 rgba(33, 53, 113, 0.26);'}

    :hover {
        ${props => props.present ? null : 'box-shadow: 0 1px 0 #DE3C2C;'}
    }

`

const ProjectLink = props => {
    return (
        <Container present={props.route === props.currentRoute} footer={props.currentRoute} to={`/projects/${props.route}`}><Span present={props.route === props.currentRoute}>{props.text}</Span></Container>
    )
}

export default ProjectLink

import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Container = styled(Link)`

    text-decoration: none;

    width: fit-content;
    
    line-height: 1.5;
    letter-spacing: 0.53px;
    color:  ${props => props.present ? 'gray' : '#1b2c63'};
    font-size: ${props => props.footer ? '16px' : '32px'};

    font-family: ${props => props.footer ? "'Roboto Mono'" : 'CanelaWeb'};

    margin: ${props => props.footer ? '16px 0 0 0' : '32px 0 0 0'};

    cursor: ${props => props.present ? "auto" : "pointer"};

    ${props => props.footer ? "text-transform: uppercase" : null}

    ${props => props.footer ? "font-weight: 500;" : null}
    ${props => props.footer ? "letter-spacing: 2.43px;" : null}
    
    

    

    
    

    

    @media (max-width: 768px) {
        font-size: 28px;
        line-height: 1.71;
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
        <Container present={props.route === props.currentRoute} footer={props.footer} to={`/projects/${props.route}`}><Span present={props.route === props.currentRoute}>{props.text}</Span></Container>
    )
}

export default ProjectLink

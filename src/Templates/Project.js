import React, { useState } from 'react'

import styled from 'styled-components'


import ProjectHeader from '../UserInterface/ProjectHeader'

const Container = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

`


const choosePage = (route, password, setPassword) => {

    const data = [


    {route: "template",
    password: null,
    content:
        <Container>
            <ProjectHeader 
                
            />
            
        </Container>
    },


    {route: "primary-navigation-redesign",
    password: null,
    content:
        <Container>
            <ProjectHeader 
                company="Primary.com"
                date="May 2019"
                title="Navigation Redesign"
                responsibilities="UX Research, Information Architecture, Interaction Design, Visual Design"
                pictureFile="laptop-mockup.png"
                alt=" "
                caption=" An informative caption"
            />
            
        </Container>
    },


    {route: "primary-product-detail-page",
    password: null,
    content:
        <Container>
            <h1>Primary Product Detail Page</h1>
            
        </Container>
    },


    {route: "primary-style-guide",
    password: null,
    content:
        <Container>
            <h1>Primary Style Guide</h1>
            
        </Container>
    },


    {route: "ralph-lauren-find-a-store",
    password: null,
    content:
        <Container>
            <h1>RL Find a Store</h1>
            
        </Container>
    },

    {route: "ralph-lauren-mobile-webstore",
    password: null,
    content:
        <Container>
            <h1>RL Mobile Webstore</h1>
            
        </Container>
    }]

    const selected = data.find( d => d.route === route)


    if (selected && (!selected.password || selected.password === password)) {
        return selected.content
    } else if (selected) {
        return (
        <Container>
            <h1>Enter Password</h1>
        </Container>
        )
    } else {
        return (
        <Container>
            <h1>404</h1>
        </Container>
        )        
    }

}


const Project = props => {

    const [password, setPassword] = useState(null)

    return choosePage(props.match.params.name, password, setPassword)
}





export default Project

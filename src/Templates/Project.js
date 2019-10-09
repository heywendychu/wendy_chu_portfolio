import React from 'react'

import styled from 'styled-components'

const Container = styled.div`

`


const choosePage = route => {


    const data = [


    {route: "template",
    password: null,
    content:
        <Container>
            <h1>Template</h1>
            
        </Container>
    },


    {route: "primary-navigation-redesign",
    password: null,
    content:
        <Container>
            <h1>Primary Navigation Redesign</h1>
            
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

    return selected ? selected.content : (
        <Container>
            <h1>404</h1>
        </Container>)


}


const Project = props => {
    return choosePage(props.match.params.name)
}





export default Project

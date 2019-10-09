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
            <h1>Project</h1>
            
        </Container>
    }
    ]

    const selected = data.find( d => d.route === route)

    return selected ? selected.content : (
        <Container>
            <h1>404</h1>
        </Container>)



}


const Project = props => {
    console.log("dynamic route:", props.match.params.name)
    return choosePage(props.match.params.name)
}





export default Project

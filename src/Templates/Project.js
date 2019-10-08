import React from 'react'

import styled from 'styled-components'

const Container = styled.div`

`

const Project = props => {
    console.log("dynamic route:", props.match.params.name)
    return (
        <Container>
            <h1>Project</h1>
            
        </Container>
    )
}





export default Project

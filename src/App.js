import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import styled from 'styled-components'

import Header from './UserInterface/Header'
import Landing from './Templates/Landing'
import Project from './Templates/Project'

const Page = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;

  overflow: scroll;

  background: #ffede5;

  padding: 0 0 200px 0;

`


const App = () => {
  return (
    <Page>
      <Header />
      <Switch>
        <Route path="/projects/:name" component={Project}/>
        <Route path="/" component={Landing}/>
      </Switch>
      
    </Page>
  )
}

export default App

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import styled from 'styled-components'

import Header from './Templates/Header'
import Landing from './Templates/Landing'
import Project from './Templates/Project'

import ScrollToTop from 'react-router-scroll-top'

const Page = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;

  overflow: scroll;

  background: #ffede5;


`


const App = () => {
  return (
    <ScrollToTop>
    <Page>
      
      <Header />
      <Switch>
        <Route path="/projects/:name" component={Project}/>
        <Route path="/" component={Landing}/>
      </Switch>

    </Page>
    </ScrollToTop>
  )
}

export default App

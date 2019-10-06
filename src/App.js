import React from 'react'

import styled from 'styled-components'

import Header from './UserInterface/Header'

const Page = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;

  overflow: scroll;

  background: #ffede5;

`


const App = () => {
  return (
    <Page>
      <Header  />


    </Page>
  )
}

export default App

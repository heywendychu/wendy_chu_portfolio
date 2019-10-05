import React from 'react';

import styled from 'styled-components'

const Page = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

`

const DogFrame = styled.img`
  max-height: 60vh;

`

const App = () => {
  return (
    <Page>
      <DogFrame src="https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg"/>
    </Page>
  )
}

export default App

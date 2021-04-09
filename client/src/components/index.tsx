import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Grid from '../components/grid'


function App() {
  return (
    <div id="main">
      <Grid/>
      <Styled/>
    </div>
  )
}

const Styled = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  #main{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #ddeeff;
  }
`

export default App

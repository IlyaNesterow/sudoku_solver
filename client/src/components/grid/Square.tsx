import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'


const Square = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(({ onKeyDown }, ref) => {
  const [ value, setValue ] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!(parseInt(e.target.value) < 0) && !(parseInt(e.target.value) > 10)){
      setValue(e.target.value)
    } 
  }

  return(
    <Input 
      ref={ ref }
      value={ value }
      onChange={ onChange }
      onKeyDown={ onKeyDown }
      min="1"
      max="9"
      step="1"
      type="number"
    />
  )
})


const Input = styled.input`
  padding: .5rem .6rem; 
  margin: .1rem;
  font-size: 1.2rem;
  text-align: center;
  border: solid 1px #2255ff33;
  border-radius: .2rem;
  border-collapse: collapse;
  transition: border 1s;
  font-family: 'Roboto', sans-serif;

  :active, :focus{
    outline: none;
    border: solid 1px #2255ff88;
  }
`

export default Square

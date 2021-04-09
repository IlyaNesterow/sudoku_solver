import React, { useRef } from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'
import Square from './Square'


const Grid: React.FC<any> = () => {
  const content = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([])

  const clickHandler = () => {
    disableSquares()
    const matrix = content.current.map((row) => 
      row.map((sq) => {
        return sq.current && sq.current.value 
          ? sq.current.valueAsNumber
          : 0
      })
    )

    fetch('http://127.0.0.1:5000/solve', {
      method: 'PUT',
      body: JSON.stringify({ matrix }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if(res.ok) return res.json()
        else throw new Error('Failed to solve')
      })
      .then(res => {
        if(res.solved)
          fillTheGrid(res.solved)
      })
      .catch(err => {})
      .finally(enableSquares)
  } 

  const disable = (element: HTMLInputElement) => {
    element.disabled = true
  }

  const enable = (element: HTMLInputElement) => {
    element.disabled = false
  }

  const setValue = (element: HTMLInputElement, value: string) => {
    element.value = value
  }

  const fillTheGrid = (data: Array<Array<number>>) => {
    let start = 1
    data.forEach((row, i) => 
      row.forEach((item, j) => {
        start += 1
        setTimeout(
          () => setValue(content.current[i][j].current as HTMLInputElement, item.toString()), 
          (50 * start)
        )
      })
    )
  }

  const clear = () => {
    content.current.forEach(row => 
      row.forEach(sq => {
        if(sq.current)
          setValue(sq.current, '')
      })
    )
  }

  const disableSquares = () => {
    content.current.forEach(row => 
      row.forEach(sq => {
        if(sq.current)
          disable(sq.current)
      })
    )
  }

  const enableSquares = () => {
    content.current.forEach(row => 
      row.forEach(sq => {
        if(sq.current)
          enable(sq.current)
      })
    )
  }

  const switchSquares = (key: string, x: number, y: number) => {
    console.log('here')
    switch(key){
      case 'ArrowLeft':
        if(x === 0) if(y > 0) content.current[8][y - 1].current?.focus()
        else content.current[x - 1][y].current?.focus()
        break
      case 'ArrowUp':
        if(y === 0) if(x > 0) content.current[x - 1][8].current?.focus()
        else content.current[x][y - 1].current?.focus()
        break
      case 'ArrowRight':
        if(x === 8) if(y < 8) content.current[0][y + 1].current?.focus()
        else content.current[x + 1][y].current?.focus()
        break
      case 'ArrowDown':
        if(y === 8) if(x < 8) content.current[x + 1][0].current?.focus()
        else content.current[x][y + 1].current?.focus()
        break
    }
  }

  const createSquares = () => {
    const output = []
    content.current = []

    for(let i = 0; i <= 8; i++){
      const row = []
      const refs = []
      for(let j = 0; j <= 8; j++){
        const ref = React.createRef<HTMLInputElement>()
        const elem = (
          <Square
            key={ v4() }
            ref={ ref }
            onKeyDown={(e: React.KeyboardEvent) => switchSquares(e.key, i, j) }
          />
        )
        refs.push(ref)
        row.push(elem)
      }
      content.current.push(refs)
      output.push(
        <div 
          key={ v4() } 
          id="grid"
        >
          { row }
        </div>
      )
    }

    return output
  }

  const elements = useRef(createSquares())

  return(
    <Container>
      { elements.current }
      <div id="btns">
        <div
          id="submit-btn" 
          onClick={ clickHandler }
        >Submit</div>
        <div 
          id="clear-btn"
          onClick={ clear }
        >Clear</div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  #btns{
    display: flex;
    justify-content: center;
    margin: 1rem;
  }
  #btns div{
    text-align: center;
    width: 100%;
    margin: 0 2%;
    color: #fff;
    padding: .5rem 0;
    border-radius: 1.3rem;
    background-color: #3377ff;
    font-family: 'Roboto', sans-serif;
  }
  #grid{
    display: block;
  }
`

export default Grid
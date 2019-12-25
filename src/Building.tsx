import React, { useState } from 'react'
import { Floor } from './Floor'
import Grid from '@material-ui/core/Grid'
import { Paper, Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { enqueue, consumeClosestNode, getNearestStop } from './utils'

export const Building = ({ numFloors }: { numFloors: number }) => {
  const floors = Array(numFloors)
    .fill(0)
    .map((_, i) => i + 1)
  const [currentFloor, setCurrentFloor] = useState<number>(floors[0])
  const [queue, setQueue] = useState<number[]>([])
  const addFloorToQueue = (floor: number) => enqueue(floor, queue, setQueue)
  const goToNextFloor = () =>
    consumeClosestNode(currentFloor, setCurrentFloor, queue, setQueue)

  const nextFloor = getNearestStop(currentFloor, queue)

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {'Floors'}
        </Grid>
        {floors.map(e => (
          <Grid item xs={2} key={e}>
            <Floor
              floorNum={e}
              isCurrentFloor={e === currentFloor}
              enqueue={addFloorToQueue}
              isInQueue={queue.includes(e)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper variant={'outlined'}>
            <Stepper orientation='horizontal' alternativeLabel>
              {[currentFloor].concat(queue).map((label, i) => {
                const isNext = label === nextFloor
                const isCurrent = label === currentFloor
                return (
                  <Step key={i} completed={isNext}>
                    <StepLabel>{`Floor ${label}${isNext ? ' (next)' : ''}${
                      isCurrent ? ' (current)' : ''
                    }`}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </Paper>
          <Paper variant={'outlined'}>
            <Button
              variant='contained'
              color='primary'
              onClick={goToNextFloor}
              disabled={queue.length === 0}
            >
              Go to next floor
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

import React from 'react'
import { Button } from '@material-ui/core'

export const Floor = ({
  floorNum,
  isCurrentFloor,
  enqueue,
  isInQueue,
}: {
  floorNum: number
  isCurrentFloor: boolean
  enqueue: (v: number) => void
  isInQueue: boolean
}) => (
  <Button
    variant={'outlined'}
    color={isCurrentFloor ? 'primary' : isInQueue ? 'default' : 'inherit'}
    onClick={() => enqueue(floorNum)}
    disabled={isInQueue}
  >
    {floorNum}
  </Button>
)

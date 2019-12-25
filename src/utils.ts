// Stop if [a, b, from, queued number,... to] or the other way around
const canStopOnWay = (from: number, to: number, queuedFloor: number) =>
  (from > queuedFloor && queuedFloor > to) ||
  (from < queuedFloor && queuedFloor < to)

const closestToCurrent = (from: number) => (x: number, y: number) => {
  const xDistance = Math.abs(x - from)
  const yDistance = Math.abs(y - from)
  if (xDistance > yDistance) {
    return 1
  }
  if (xDistance < yDistance) {
    return -1
  }
  return 0
}

// Next stop is either the next intermediate stop or the destination
export const getNearestStop = (from: number, queue: number[]): number =>
  queue
    .filter(floor => canStopOnWay(from, queue[0], floor))
    .sort(closestToCurrent(from))[0] || queue[0]

export const enqueue = (
  floor: number,
  queue: number[],
  setQueue: (v: number[]) => void,
) => {
  if (!queue.includes(floor)) {
    setQueue([...queue, floor])
  }
}

export const consumeClosestNode = (
  currentFloor: number,
  setCurrentFloor: (v: number) => void,
  queue: number[],
  setQueue: (v: number[]) => void,
) => {
  if (queue.length >= 1) {
    const nextStop = getNearestStop(currentFloor, queue)
    setCurrentFloor(nextStop)
    setQueue(queue.filter(e => e !== nextStop))
  }
}

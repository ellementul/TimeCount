class Time {
  constructor() {
    this._limit = Math.pow(2, 31)
    this._current = [0, this._limit - 1]
  }
  toArray() {
    return [...this._current]
  }
  toJSON() {
    return this.toArray()
  }
  
  next() {
    this._current = nextTimeMark(this._current, this._limit)
    return this
  }
  prev() {
    this._current = prevTimeMark(this._current, this._limit)
    return this
  }
  
  equal(time) {
    if(!(time instanceof Time))
      throw "It isn't time instance!"

    const time_mark = time.toArray()
    return equalTimeMarks(this._current, time_mark)
  }
  compare(time) {
    if(!(time instanceof Time))
      throw "It isn't time instance!"

    return compareTimeMarks(this._current, time.toArray(), this._limit)
  }
}

function nextTimeMark(timeMark, limit) {
  const [ fisrtPartOfTime, secondPartOfTime ] = timeMark
  let newTime = fisrtPartOfTime + secondPartOfTime

  if(newTime >= limit) 
  newTime -= limit

  return [secondPartOfTime, newTime]
}

function prevTimeMark(timeMark, limit) {
  const [ fisrtPartOfTime, secondPartOfTime ] = timeMark
  let diff = secondPartOfTime - fisrtPartOfTime

  if(diff < 0)
    diff += limit
  
  return [diff, fisrtPartOfTime]
}

function equalTimeMarks(firstTimeMark, secondTimeMark) {
  return (firstTimeMark[0] === secondTimeMark[0]) && (firstTimeMark[1] === secondTimeMark[1])
}

function compareTimeMarks(fisrtMark, secondMark, limit) {
  if(equalTimeMarks(fisrtMark, secondMark))
    return 0

  const limit_step = limit / 2;

  let featureMark = fisrtMark
  let pastMark = fisrtMark
  let step = 0

  while(step++ < limit_step) {
    featureMark = nextTimeMark(featureMark, limit)
    if(equalTimeMarks(featureMark, secondMark))
      break

    pastMark = prevTimeMark(pastMark, limit)
    if(equalTimeMarks(pastMark, secondMark)) {
      step *= -1
      break
    }
  }

  return step
}

module.exports = { Time }

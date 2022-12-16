class Time {
  constructor(limit = 0) {
    this._limit = limit || Math.pow(2, 32)
    this._current = [0, this._limit - 1]
  }
  toArray() {
    return [...this._current]
  }
  toJSON() {
    return this.toArray()
  }
  _next(fisrt_part_of_time, second_part_of_time) {
    let new_time = fisrt_part_of_time + second_part_of_time

    if(new_time >= this._limit) 
      new_time -= this._limit

    return [second_part_of_time, new_time]
  }
  _prev(fisrt_part_of_time, second_part_of_time) {
    let diff = second_part_of_time - fisrt_part_of_time

    if(diff < 0)
      diff += this._limit
    
    return [diff, fisrt_part_of_time]
  }
  next() {
    this._current = this._next(...this._current)
    return this
  }
  prev() {
    this._current = this._prev(...this._current)
    return this
  }
  equal(time) {
    if(time instanceof Time)
      throw "It isn't time instance!"

    const time_mark = time.toArray()
    return (time_mark[0] === this._current[0]) && (time_mark[1] === this._current[1])
  }
  compare(time) {
    if(time instanceof Time)
      throw "It isn't time instance!"
  }
}

module.exports = { Time }

const { Time } = require('./index')

describe('Time', () => {
  test('equaling', () => {
    const oneTime = new Time
    const twoTime = new Time

    expect(oneTime.equal(twoTime)).toBe(true)
    expect(oneTime.equal(twoTime.next())).toBe(false)
  });
  test('limiting', () => {
    const time = new Time
    const times = Math.pow(2, 20)

    let count = 0

    let currnet_i = 0
    const limit = Math.pow(2, 32)

    while(currnet_i++ < times) {
      const pair = time.next().toArray()
      if(pair[0] >= limit || pair[1] >= limit)
        count++
    }

    expect(count).toBe(0)
  });
  test('linearity', () => {
    const time = new Time
    const times = Math.pow(2, 16)

    let count = 0

    let currnet_i = 0

    while(currnet_i++ < times) {
      time.next()
      if(JSON.stringify(time) !== JSON.stringify(time.next().prev()))
        count++
    }
    expect(count).toBe(0)
  });
  test('compare', () => {
    const firstTime = new Time
    const secondTime = new Time

    const diff = Math.pow(2, 20)
    let step = 0
    while(step++ < diff) secondTime.next()

    expect(firstTime.compare(firstTime)).toBe(0)
    expect(firstTime.compare(secondTime)).toBe(diff)
    expect(secondTime.compare(firstTime)).toBe(-diff)
  });
  test('collision', () => {
    const time = new Time
    const times = Math.pow(2, 16)

    const values = new Set

    let currnet_i = 0
    while(currnet_i++ < times) {
      values.add(JSON.stringify(time.next()))
    }

    expect(values.size).toBe(times)
  });
});
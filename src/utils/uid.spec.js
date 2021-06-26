import { uid } from './uid'

describe('Utils: uid', () => {
  describe('#uid', () => {
    it.each`
        expected
        ${1}
        ${2}
        ${3}
        ${4}
        ${5}
        `('should return incremented number - $expected when called expected times', ({
      expected
    }) => {
      const id = uid()

      expect(id).toBe(expected)
    })
  })
})

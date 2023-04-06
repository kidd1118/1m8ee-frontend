/**
    Dictionary=["Hi","Hello","HelloWorld", "HiWorld", "HelloWorldWideWeb", "HelloWWW"]
    Output="HelloWorldWideWeb"

    Dictionary=["Oursky","OurSky","OurskyLimited", "OurskyHK", "SkymakersDigitalLTD", "SkymakersDigitalLtd"]
    Output="SkymakersDigitalLTD"
 */

function findLongestWords(dict) {
  let maxWord = ''
  let maxWordNumber = 0
  for (let i = 0; i < dict.length; i++) {
    let words = dict[i]
    let match = words.match(/[A-Z]+/g)

    if (!match || !match.length) continue

    if (maxWordNumber < match.length) {
      maxWord = words
      maxWordNumber = match.length
    }
  }
  return maxWord
}

class Cache {
  constructor(capacity) {
    this.capacity = capacity
    this.size = 0
    this.data = {}
    this.dataSortByScore = []
  }

  get(key) {
    if (key in this.data) {
      let value = this.data[key].value
      let weight = this.data[key].weight
      let currentTime = new Date().getTime()
      let lastAccessedTime = this.data[key].lastAccessedTime
      let score = weight / (Math.log(currentTime - lastAccessedTime + 1) + 1)
      this.data[key].lastAccessedTime = currentTime
      this.dataSortByScore[this.dataSortByScore.indexOf(key)].score = score
      this.dataSortByScore.sort((a, b) => a.score - b.score)
      return value
    } else {
      return -1
    }
  }

  put(key, value, weight) {
    let currentTime = new Date().getTime()
    let score = weight / (Math.log(currentTime + 1) + 1)
    if (key in this.data) {
      this.data[key] = { value, weight, lastAccessedTime: currentTime }
      this.dataSortByScore[this.dataSortByScore.indexOf(key)].score = score
      this.dataSortByScore.sort((a, b) => a.score - b.score)
    } else {
      if (this.size === this.capacity) {
        let lowestScoreKey = this.dataSortByScore.pop().key
        delete this.data[lowestScoreKey]
        this.size--
      }
      this.data[key] = { value, weight, lastAccessedTime: currentTime }
      this.dataSortByScore.push({ key, score })
      this.dataSortByScore.sort((a, b) => a.score - b.score)
      this.size++
    }
  }
}
/**
 * get and put method => Because need to call sort function, time complexity is O(n log n).
 *
 */

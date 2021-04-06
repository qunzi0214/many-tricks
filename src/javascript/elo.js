// 模拟游戏rank分计算方法
const elo = ([...ratings], kFactor = 32) => {
  const [a, b] = ratings
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400))
  const newRating = (rating, i) => rating + kFactor * (i - expectedScore(i ? a : b, i ? b : a))
  if (ratings.length === 2) return [newRating(a, 1), newRating(b, 0)]

  for (let i = 0, len = ratings.length; i < len; i++) {
    let j = i
    while (j < len - 1) {
      j++
      ;[ratings[i], ratings[j]] = elo([ratings[i], ratings[j]], kFactor)
    }
  }
  return ratings
}

// 1v1，
elo([1200, 1200]) // [1216, 1184] 玩家分相同时，赢家吃16分
elo([1200, 1200], 64) // [1232, 1168] 玩家分相同时，赢家吃32分
elo([1400, 1200]).map(Math.round) // [1408, 1192] 赢家分高输家分底时，赢家仅吃8分
elo([1200, 1400]).map(Math.round) // [1224, 1376] 赢家分低输家分高时，赢家吃24分

// 多人场景
elo([1200, 1200, 1200, 1200]).map(Math.round) // [1246, 1215, 1185, 1154] 排名第一的玩家同时赢二三四名玩家，以此类推

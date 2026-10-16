import confetti from 'canvas-confetti'

const colors = ['#ff6b9d', '#ffd166', '#06d6a0', '#4cc9f0', '#c77dff']

export function burst() {
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors })
  setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors }), 250)
  setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors }), 250)
}

export function rain(duration = 3000) {
  const end = Date.now() + duration
  const tick = () => {
    confetti({ particleCount: 4, angle: 90, spread: 120, startVelocity: 20, origin: { x: Math.random(), y: -0.1 }, colors })
    if (Date.now() < end) requestAnimationFrame(tick)
  }
  tick()
}

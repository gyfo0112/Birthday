import { useEffect, useState } from 'react'
import { config } from './config.js'

// 0부터 나이까지 올라가다 멈춤
export default function AgeCounter({ age }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (n >= age) return
    const t = setTimeout(() => setN((v) => v + 1), 1400 / age)
    return () => clearTimeout(t)
  }, [n, age])

  return (
    <p className={`age ${n >= age ? 'done' : ''}`}>
      <span className="age-num">{n}</span>
      <span className="age-label">{config.ageLabel}</span>
    </p>
  )
}

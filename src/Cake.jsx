import { useState } from 'react'
import { config } from './config.js'
import { useBlow } from './useBlow.js'

export default function Cake({ onDone }) {
  const [lit, setLit] = useState(() => Array(config.candleCount).fill(true))

  const blow = (i) => {
    setLit((prev) => {
      if (!prev[i]) return prev
      const next = prev.map((v, idx) => (idx === i ? false : v))
      if (!next.some(Boolean)) onDone()
      return next
    })
  }

  const blowAll = () => {
    if (!lit.some(Boolean)) return
    mic.stop()
    setLit(lit.map(() => false))
    onDone()
  }

  const mic = useBlow(blowAll)

  const allOut = !lit.some(Boolean)

  return (
    <section className="screen fade-in">
      <p className="hint">{allOut ? '🎉 와!! 🎉' : config.cakeHint}</p>
      <div className="cake">
        <div className="candles">
          {lit.map((on, i) => (
            <button key={i} className="candle" onClick={() => blow(i)} aria-label={`촛불 ${i + 1}`}>
              <span className={`flame ${on ? '' : 'out'}`} />
              <span className="wick" />
              <span className="stick" style={{ background: i % 2 ? '#4cc9f0' : '#ff6b9d' }} />
              {!on && <span className="smoke" />}
            </button>
          ))}
        </div>
        <div className="layer top" />
        <div className="layer bottom" />
        <div className="plate" />
      </div>
      <div className="actions">
        <button className="btn" onClick={mic.start} disabled={allOut || mic.status === 'listening'}>
          {mic.status === 'listening' ? config.micListening : config.micButton}
        </button>
        <button className="btn ghost" onClick={blowAll} disabled={allOut}>
          {config.blowAllButton}
        </button>
        {(mic.status === 'denied' || mic.status === 'unsupported') && (
          <p className="note">{config.micFail}</p>
        )}
      </div>
    </section>
  )
}

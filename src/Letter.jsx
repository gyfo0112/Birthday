import { useState } from 'react'
import { config } from './config.js'

export default function Letter({ onOpened, onNext }) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    if (open) return
    setOpen(true)
    onOpened()
  }

  return (
    <section className="screen fade-in">
      {!open && <p className="hint">{config.letterHint}</p>}
      <button className={`envelope ${open ? 'open' : ''}`} onClick={toggle} aria-label="편지 열기">
        <span className="paper">
          <span className="paper-text">{config.message}</span>
        </span>
        <span className="env-back" />
        <span className="env-front" />
        <span className="env-flap" />
      </button>
      {open && (
        <button className="btn next" onClick={onNext}>
          {config.nextButton}
        </button>
      )}
    </section>
  )
}

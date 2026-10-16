import { useState } from 'react'
import { config } from './config.js'
import Cake from './Cake.jsx'
import Letter from './Letter.jsx'
import { burst, rain } from './confetti.js'

export default function App() {
  const [stage, setStage] = useState('intro') // intro | cake | letter | end
  const [round, setRound] = useState(0)

  const onCandlesOut = () => {
    burst()
    setTimeout(() => setStage('letter'), 1800)
  }

  const onLetterOpened = () => rain()

  const replay = () => {
    setRound((r) => r + 1)
    setStage('intro')
  }

  return (
    <main className="stage" key={round}>
      <div className="stars" aria-hidden="true" />
      {stage === 'intro' && (
        <section className="screen fade-in">
          <div className="emoji-big">🎂</div>
          <h1 className="title">{config.introTitle}</h1>
          <button className="btn" onClick={() => setStage('cake')}>
            {config.introButton}
          </button>
        </section>
      )}
      {stage === 'cake' && <Cake onDone={onCandlesOut} />}
      {stage === 'letter' && <Letter onOpened={onLetterOpened} onNext={() => setStage('end')} />}
      {stage === 'end' && (
        <section className="screen fade-in">
          <div className="emoji-big">🎁</div>
          <h1 className="title">Happy Birthday,{'\n'}{config.name}!</h1>
          <button className="btn ghost" onClick={replay}>
            {config.replayButton}
          </button>
        </section>
      )}
    </main>
  )
}

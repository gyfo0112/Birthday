import { useCallback, useRef, useState } from 'react'
import { config } from './config.js'
import Cake from './Cake.jsx'
import Letter from './Letter.jsx'
import AgeCounter from './AgeCounter.jsx'
import { burst, rain } from './confetti.js'
import { requestMotion, useShake } from './useShake.js'

export default function App() {
  const [stage, setStage] = useState('intro') // intro | cake | letter | end
  const [round, setRound] = useState(0)
  const [muted, setMuted] = useState(false)
  const [shakeOn, setShakeOn] = useState(false)
  const audioRef = useRef(null)

  if (!audioRef.current) {
    const a = new Audio(`${import.meta.env.BASE_URL}song.mp3`)
    a.loop = true
    a.preload = 'auto'
    audioRef.current = a
  }

  // iOS는 사용자 탭 안에서 한 번 재생해 둬야 이후 자동으로 틀 수 있음
  const unlockAudio = () => {
    const a = audioRef.current
    a.play().then(() => { a.pause(); a.currentTime = 0 }).catch(() => {})
  }

  const toggleMute = () => {
    const a = audioRef.current
    a.muted = !muted
    setMuted(!muted)
  }

  const onCandlesOut = () => {
    audioRef.current.play().catch(() => {})
    burst()
    setTimeout(() => setStage('letter'), 1800)
  }

  const onLetterOpened = () => rain()

  // 탭 핸들러 안에서 바로 권한 요청 (iOS)
  const goEnd = () => {
    requestMotion().then((r) => setShakeOn(r === 'granted'))
    setStage('end')
  }

  const onShake = useCallback(() => burst(), [])
  useShake(stage === 'end' && shakeOn, onShake)

  const replay = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setRound((r) => r + 1)
    setStage('intro')
  }

  return (
    <main className="stage" key={round}>
      <div className="stars" aria-hidden="true" />
      {(stage === 'letter' || stage === 'end') && (
        <button className="mute" onClick={toggleMute} aria-label="소리 켜기/끄기">
          {muted ? '🔇' : '🔊'}
        </button>
      )}
      {stage === 'intro' && (
        <section className="screen fade-in">
          <div className="emoji-big">🎂</div>
          <h1 className="title">{config.introTitle}</h1>
          {config.age > 0 && <AgeCounter age={config.age} />}
          <button className="btn" onClick={() => { unlockAudio(); setStage('cake') }}>
            {config.introButton}
          </button>
        </section>
      )}
      {stage === 'cake' && <Cake onDone={onCandlesOut} />}
      {stage === 'letter' && <Letter onOpened={onLetterOpened} onNext={goEnd} />}
      {stage === 'end' && (
        <section className="screen fade-in">
          <div className="emoji-big">🎁</div>
          <h1 className="title">Happy Birthday,{'\n'}{config.name}!</h1>
          {shakeOn && <p className="hint shake">{config.shakeHint}</p>}
          <button className="btn" onClick={burst}>
            {config.shakeButton}
          </button>
          <button className="btn ghost" onClick={replay}>
            {config.replayButton}
          </button>
        </section>
      )}
    </main>
  )
}

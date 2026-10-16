import { useEffect } from 'react'

const SHAKE_DELTA = 30 // x,y,z 가속도 변화량 합. 낮을수록 민감
const COOLDOWN_MS = 900

// iOS 13+ 는 사용자 탭 안에서 권한을 요청해야 함 (탭 핸들러에서 바로 호출할 것)
export function requestMotion() {
  if (typeof DeviceMotionEvent === 'undefined') return Promise.resolve('unsupported')
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    return DeviceMotionEvent.requestPermission().catch(() => 'denied')
  }
  return Promise.resolve('granted')
}

export function useShake(enabled, onShake) {
  useEffect(() => {
    if (!enabled) return
    let last = null
    let lastShake = 0
    const handler = (e) => {
      const a = e.accelerationIncludingGravity
      if (!a || a.x == null) return
      if (last) {
        const delta = Math.abs(a.x - last.x) + Math.abs(a.y - last.y) + Math.abs(a.z - last.z)
        const now = Date.now()
        if (delta > SHAKE_DELTA && now - lastShake > COOLDOWN_MS) {
          lastShake = now
          onShake()
        }
      }
      last = { x: a.x, y: a.y, z: a.z }
    }
    window.addEventListener('devicemotion', handler)
    return () => window.removeEventListener('devicemotion', handler)
  }, [enabled, onShake])
}

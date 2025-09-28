import { useState, useEffect, useCallback } from 'react'

export function useAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState('bounce')
  const [animationSpeed, setAnimationSpeed] = useState(1)

  const toggleAnimation = useCallback(() => {
    setIsAnimating(prev => !prev)
  }, [])

  const startAnimation = useCallback((type = animationType) => {
    setAnimationType(type)
    setIsAnimating(true)
  }, [animationType])

  const stopAnimation = useCallback(() => {
    setIsAnimating(false)
  }, [])

  const changeSpeed = useCallback((speed) => {
    setAnimationSpeed(speed)
  }, [])

  // 키보드 접근성 지원
  useEffect(() => {
    const handleKeyPress = (event) => {
      // 스페이스바로 애니메이션 토글
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault()
        toggleAnimation()
      }

      // 숫자 키로 애니메이션 타입 변경
      const animationMap = {
        'Digit1': 'bounce',
        'Digit2': 'spin',
        'Digit3': 'wobble',
        'Digit4': 'dance'
      }

      if (animationMap[event.code]) {
        event.preventDefault()
        startAnimation(animationMap[event.code])
      }

      // ESC로 애니메이션 정지
      if (event.code === 'Escape') {
        event.preventDefault()
        stopAnimation()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [toggleAnimation, startAnimation, stopAnimation])

  return {
    isAnimating,
    animationType,
    animationSpeed,
    toggleAnimation,
    startAnimation,
    stopAnimation,
    changeSpeed,
    setAnimationType
  }
}
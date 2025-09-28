import { useEffect } from 'react'
import { useAnimation } from '../hooks/useAnimation'
import catImage from '../assets/images/cat.svg'
import './DancingCat.css'

function DancingCat() {
  const {
    isAnimating,
    animationType,
    animationSpeed,
    toggleAnimation,
    startAnimation,
    stopAnimation,
    changeSpeed
  } = useAnimation()

  // 애니메이션 속도 CSS 변수로 적용
  useEffect(() => {
    document.documentElement.style.setProperty('--animation-speed', `${1 / animationSpeed}`)
  }, [animationSpeed])

  const changeAnimationType = (type) => {
    startAnimation(type)
  }

  return (
    <div className="dancing-cat-container">
      {/* 키보드 안내 */}
      <div className="keyboard-hints" aria-live="polite">
        <p>키보드 조작: 스페이스바(시작/정지), 1-4(애니메이션 변경), ESC(정지)</p>
      </div>

      <div
        className={`cat-wrapper ${isAnimating ? `animate-${animationType}` : ''}`}
        role="img"
        aria-label={`고양이가 ${isAnimating ? animationType + ' 애니메이션으로 춤추고 있습니다' : '정지해 있습니다'}`}
      >
        <img
          src={catImage}
          alt="Dancing Cat"
          className="cat-image"
        />
      </div>

      <div className="control-panel">
        <button
          className={`main-button ${isAnimating ? 'stop' : 'start'}`}
          onClick={toggleAnimation}
          aria-label={isAnimating ? '춤추기 멈추기' : '춤추기 시작'}
          aria-pressed={isAnimating}
        >
          {isAnimating ? '🛑 멈추기' : '🕺 춤추기'}
        </button>

        <div className="speed-control">
          <label htmlFor="speed-slider" className="speed-label">
            애니메이션 속도: {animationSpeed}x
          </label>
          <input
            id="speed-slider"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => changeSpeed(parseFloat(e.target.value))}
            className="speed-slider"
            aria-label="애니메이션 속도 조절"
          />
        </div>

        <div className="animation-buttons" role="group" aria-label="애니메이션 타입 선택">
          <button
            className={`animation-btn ${animationType === 'bounce' ? 'active' : ''}`}
            onClick={() => changeAnimationType('bounce')}
            aria-label="통통 뛰기 애니메이션 (키보드: 1)"
            aria-pressed={animationType === 'bounce'}
          >
            🦘 통통
          </button>
          <button
            className={`animation-btn ${animationType === 'spin' ? 'active' : ''}`}
            onClick={() => changeAnimationType('spin')}
            aria-label="빙글빙글 애니메이션 (키보드: 2)"
            aria-pressed={animationType === 'spin'}
          >
            🌪️ 빙글
          </button>
          <button
            className={`animation-btn ${animationType === 'wobble' ? 'active' : ''}`}
            onClick={() => changeAnimationType('wobble')}
            aria-label="좌우 흔들기 애니메이션 (키보드: 3)"
            aria-pressed={animationType === 'wobble'}
          >
            🎵 흔들
          </button>
          <button
            className={`animation-btn ${animationType === 'dance' ? 'active' : ''}`}
            onClick={() => changeAnimationType('dance')}
            aria-label="자유로운 댄스 애니메이션 (키보드: 4)"
            aria-pressed={animationType === 'dance'}
          >
            💃 댄스
          </button>
        </div>

        {/* 상태 표시 */}
        <div className="status-display" aria-live="polite">
          {isAnimating ?
            `🎶 ${animationType} 애니메이션 실행 중 (${animationSpeed}x 속도)` :
            '😴 애니메이션 정지 상태'
          }
        </div>
      </div>
    </div>
  )
}

export default DancingCat
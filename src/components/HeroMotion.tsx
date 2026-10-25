import { useLayoutEffect, useRef } from 'react'
import sceneMarkup from '@/assets/golden-days-hero-scene.svg?raw'
import './HeroMotion.css'

const HeroMotion = () => {
  const root = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = root.current
    if (!element) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let intro: Animation[] = []
    const animate = (selector: string, frames: Keyframe[], delay: number, duration: number) => {
      element.querySelectorAll<SVGElement>(selector).forEach(target => {
        const animation = target.animate(frames, {
          delay, duration, fill: 'both', easing: 'cubic-bezier(.22,1,.36,1)',
        })
        intro.push(animation)
      })
    }
    const enter = (selector: string, delay: number, distance: number, duration: number) => {
      animate(selector, [{ opacity: 0, transform: `translateY(${distance}px)` }, { opacity: 1, transform: 'translateY(0)' }], delay, duration)
    }
    const build = () => {
      intro.forEach(animation => animation.cancel())
      intro = []
      if (reduce.matches) return
      animate('[data-scene="frame"]', [{ opacity: 0 }, { opacity: 1 }], 0, 1800)
      enter('[data-scene="sun"]', 250, 410, 3100)
      element.querySelectorAll<SVGElement>('[data-ray]').forEach((ray, index) => {
        ray.style.transformBox = 'fill-box'
        ray.style.transformOrigin = 'center'
        animate(`[data-ray="${index}"]`, [{ opacity: 0, transform: 'scale(.6) translateY(30px)' }, { opacity: 1, transform: 'scale(1) translateY(0)' }], 1250 + index * 110, 1500)
      })
      enter('[data-scene="home"]', 1650, 48, 1600)
      const horizon = element.querySelector<SVGElement>('[data-scene="horizon"]')
      if (horizon) horizon.style.transformOrigin = '1573px 780px'
      animate('[data-scene="horizon"]', [{ opacity: 0, transform: 'scaleX(.2)' }, { opacity: 1, transform: 'scaleX(1)' }], 1250, 1900)
      ;['back', 'middle', 'front'].forEach((part, index) => enter(`[data-scene="${part}"]`, index * 170, 65, 1900))
      enter('[data-scene="contours"]', 1000, 10, 2100)
      enter('[data-scene="botanical"]', 1500, 18, 2200)
      enter('[data-scene="particles"]', 3000, 0, 2000)
    }
    build()
    reduce.addEventListener('change', build)
    return () => {
      reduce.removeEventListener('change', build)
      intro.forEach(animation => animation.cancel())
    }
  }, [])

  return (
    <div
      ref={root}
      className="hero-motion"
      onPointerMove={event => {
        if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const bounds = event.currentTarget.getBoundingClientRect()
        scene.current?.style.setProperty('--px', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 9}px`)
        scene.current?.style.setProperty('--py', `${(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 7}px`)
      }}
      onPointerLeave={() => {
        scene.current?.style.setProperty('--px', '0px')
        scene.current?.style.setProperty('--py', '0px')
      }}
    >
      <div role="img" aria-label="A golden sunrise over a heart-windowed home, green hills, and gently swaying leaves.">
        <div ref={scene} className="gd-hero-scene" aria-hidden="true" dangerouslySetInnerHTML={{ __html: sceneMarkup }} />
      </div>
    </div>
  )
}

export default HeroMotion

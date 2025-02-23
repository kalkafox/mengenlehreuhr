import {
  clockToggleAtom,
  glowAtom,
  reduceMotionAtom,
  timeAtom,
} from '@/lib/atom'
import { useAtom, useAtomValue } from 'jotai'

const Mengenlehreuhr = () => {
  const [time] = useAtom(timeAtom)
  const [clockToggle] = useAtom(clockToggleAtom)
  const [reducedMotion] = useAtom(reduceMotionAtom)
  const glow = useAtomValue(glowAtom)

  const hours = time.hour
  const minutes = time.minute
  const seconds = time.second

  // Determine which lights should be on
  const secondLight = !clockToggle ? 0 : seconds % 2 !== 0
  const hourRow1 = !clockToggle ? 0 : Math.floor(hours / 5)
  const hourRow2 = !clockToggle ? 0 : hours % 5
  const minuteRow1 = !clockToggle ? 0 : Math.floor(minutes / 5)
  const minuteRow2 = !clockToggle ? 0 : minutes % 5

  const activeStyleRed = `bg-red-600 ${glow ? 'glow-red' : ''}`
  const activeStyleYellow = `bg-yellow-500 ${glow ? 'glow-yellow' : ''}`

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      {/* Seconds Indicator */}
      <div
        className={`w-8 h-8 rounded-full  ${
          reducedMotion ? '' : 'transition-colors'
        } ${secondLight ? activeStyleYellow : 'bg-yellow-950'}`}
      />

      {/* Hour Rows */}
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => {
          const key = `hour1-${i}`

          return (
            <div
              key={key}
              className={`w-10 h-6 ${
                reducedMotion ? '' : 'transition-colors'
              } ${
                i === 0 || i === 3 ? `rounded-${i === 0 ? 'l' : 'r'}-lg` : ''
              } ${i < hourRow1 ? activeStyleRed : 'bg-red-950'}`}
            />
          )
        })}
      </div>
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => {
          const key = `hour2-${i}`
          return (
            <div
              key={key}
              className={`w-10 h-6 ${
                reducedMotion ? '' : 'transition-colors'
              } ${
                i === 0 || i === 3 ? `rounded-${i === 0 ? 'l' : 'r'}-lg` : ''
              } ${i < hourRow2 ? activeStyleRed : 'bg-red-950'}`}
            />
          )
        })}
      </div>

      {/* Minute Rows */}
      <div className="flex gap-1">
        {[...Array(11)].map((_, i) => {
          const key = `minute1-${i}`

          // Extracted conditions
          const roundedClass =
            i === 0 ? 'rounded-l-lg' : i === 10 ? 'rounded-r-lg' : ''
          let colorClass = [2, 5, 8].includes(i)
            ? 'bg-red-950'
            : 'bg-yellow-950'
          if (i < minuteRow1) {
            colorClass = [2, 5, 8].includes(i)
              ? activeStyleRed
              : activeStyleYellow
          }

          return (
            <div
              key={key}
              className={`w-3 h-6 ${
                reducedMotion ? '' : 'transition-colors'
              } ${roundedClass} ${colorClass}`}
            />
          )
        })}
      </div>
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => {
          const key = `minute2-${i}`
          return (
            <div
              key={key}
              className={`w-10 h-6 ${
                reducedMotion ? '' : 'transition-colors'
              } ${
                i === 0 || i === 3 ? `rounded-${i === 0 ? 'l' : 'r'}-lg` : ''
              } ${i < minuteRow2 ? activeStyleYellow : 'bg-yellow-950'}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Mengenlehreuhr

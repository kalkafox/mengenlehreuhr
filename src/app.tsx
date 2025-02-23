import { useAtom, useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { AnimatePresence, motion, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Kitsune from './components/kitsune'
import Mengenlehreuhr from './components/mengenlehreur'
import TimeSyncChecker from './components/time-sync-checker'
import Toolbar from './components/toolbar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'
import {
  clockPauseAtom,
  clockToggleAtom,
  fontAtom,
  languageAtom,
  lightSwitchShowAtom,
  reduceMotionAtom,
  timeAtom,
  timezoneAtom,
} from './lib/atom'
import { isTouchDevice } from './lib/touch'

function App() {
  const { i18n } = useTranslation()
  const [clockToggle] = useAtom(clockToggleAtom)
  const [timezone] = useAtom(timezoneAtom)
  const [clockPause] = useAtom(clockPauseAtom)
  const [reduceMotion] = useAtom(reduceMotionAtom)
  const [time, setTime] = useAtom(timeAtom)
  const setLightSwitchShow = useSetAtom(lightSwitchShowAtom)
  const [, setFont] = useAtom(fontAtom)
  const [language] = useAtom(languageAtom)

  const appOpacity = useSpring(0)
  const appScale = useSpring(1, { bounce: 0 })

  const preload = document.getElementById('preload')!

  useEffect(() => {
    const unsubscribe = appOpacity.on('change', (e) => {
      if (e === 1) {
        preload.remove()
      }
    })

    if (!preload) return

    preload.style.opacity = '0'
    appOpacity.set(1)
    appScale.jump(0.95)
    appScale.set(1)

    return () => unsubscribe()
  }, [appOpacity, preload, appScale])

  useEffect(() => {
    if (!clockToggle && clockPause) {
      return
    } else {
      const dt = DateTime.local({ locale: i18n.language }).setZone(
        timezone.utc[0]
      )
      setTime(dt)
    }

    const interval = setInterval(() => {
      setTime(
        DateTime.local({ locale: i18n.language }).setZone(timezone.utc[0])
      )
    }, 1000)
    if (clockPause) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [clockToggle, setTime, timezone.utc, clockPause, i18n.language])

  useEffect(() => {
    setFont(
      language === 'ko'
        ? 'Noto Sans KR Variable'
        : language === 'ja'
          ? 'Murecho'
          : 'Inter Variable'
    )
  }, [language, setFont])

  return (
    <motion.div
      onAnimationComplete={(v) => {
        console.log(v)
      }}
      className="w-full h-full fixed"
      style={{ opacity: appOpacity, scale: appScale }}
    >
      <div
        className={`${clockPause ? 'border-blue-500 border-2' : ''} ${
          reduceMotion ? '' : 'transition-colors'
        } w-full h-full fixed -z-50 circuit-board`}
      />
      <div className="flex items-center justify-center">
        <div className="bg-neutral-950 m-4 rounded-lg">
          {isTouchDevice() ? (
            <Popover onOpenChange={(e) => setLightSwitchShow(e)}>
              <PopoverTrigger>
                <Mengenlehreuhr />
              </PopoverTrigger>
              <PopoverContent>
                {time.toFormat('HH:mm:ss a (ZZZZZ)')}
              </PopoverContent>
            </Popover>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Mengenlehreuhr />
                </TooltipTrigger>
                <TooltipContent>
                  {time.toFormat('HH:mm:ss a (ZZZZZ)')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <Toolbar />
      <TimeSyncChecker />

      <AnimatePresence>
        {language === 'ja' ? (
          <div className="bottom-0 fixed ">
            <Kitsune />
          </div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export default App

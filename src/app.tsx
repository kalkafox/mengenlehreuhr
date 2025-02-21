import { useEffect } from 'react'
import Mengenlehreuhr from './components/mengenlehreur'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'
import { useAtom, useSetAtom } from 'jotai'
import {
  clockPauseAtom,
  clockToggleAtom,
  lightSwitchShowAtom,
  reduceMotionAtom,
  timeAtom,
  timezoneAtom,
} from './lib/atom'
import TimeSyncChecker from './components/time-sync-checker'
import { DateTime } from 'luxon'
import Toolbar from './components/toolbar'
import { isTouchDevice } from './lib/touch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'

function App() {
  const [clockToggle] = useAtom(clockToggleAtom)
  const [timezone] = useAtom(timezoneAtom)
  const [clockPause] = useAtom(clockPauseAtom)
  const [reduceMotion] = useAtom(reduceMotionAtom)
  const [time, setTime] = useAtom(timeAtom)
  const setLightSwitchShow = useSetAtom(lightSwitchShowAtom)

  useEffect(() => {
    document.getElementById('preload')?.remove()
  }, [])

  useEffect(() => {
    console.log(clockPause)
    if (!clockToggle && clockPause) {
      return
    } else {
      const dt = DateTime.now().setZone(timezone.utc[0])
      setTime(dt)
    }

    const interval = setInterval(() => {
      setTime(DateTime.now().setZone(timezone.utc[0]))
    }, 1000)
    if (clockPause) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [clockToggle, setTime, timezone.utc, clockPause])

  return (
    <>
      <div
        className={`${clockPause ? 'border-blue-500' : ''} ${
          reduceMotion ? '' : 'transition-colors'
        } border-2 w-full h-full fixed -z-50`}
      />
      <div className='flex items-center justify-center'>
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
      <Toolbar />
      <TimeSyncChecker />
    </>
  )
}

export default App

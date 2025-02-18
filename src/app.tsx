import { useEffect, useState } from 'react'
import Mengenlehreuhr from './components/mengenlehreur'
import { Button } from './components/ui/button'
import { motion } from 'motion/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'
import { useAtom } from 'jotai'
import {
  clockPauseAtom,
  clockToggleAtom,
  reduceMotionAtom,
  timeAtom,
  timezoneAtom,
} from './lib/atom'
import TimeSyncChecker from './components/time-sync-checker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'
import { TimezoneCombobox } from './components/timezone-combobox'
import { DateTime } from 'luxon'
import { Slider } from './components/ui/slider'
import { Icon } from '@iconify/react'
import { Separator } from './components/ui/separator'
import { Toggle } from './components/ui/toggle'
import LightSwitch from './components/light-switch'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './components/ui/hover-card'
import WikipediaHover from './components/wikipedia-hover'

function App() {
  const [clockToggle] = useAtom(clockToggleAtom)
  const [timezone] = useAtom(timezoneAtom)
  const [clockPause, setClockPause] = useAtom(clockPauseAtom)
  const [reduceMotion, setReduceMotion] = useAtom(reduceMotionAtom)
  const [time, setTime] = useAtom(timeAtom)

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

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
      </div>
      <div className='flex justify-center items-center gap-2'>
        <LightSwitch />
        <Popover
          onOpenChange={(e) => {
            console.log(e)
            setSettingsOpen(e)
          }}>
          <PopoverTrigger className='cursor-pointer'>
            <motion.div
              className='my-2'
              whileHover={{ rotateZ: settingsOpen ? 75 : 5 }}
              animate={{ rotateZ: settingsOpen ? 75 : 0 }}>
              <Icon icon='material-symbols:settings' width='24' height='24' />
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className='w-auto'>
            <div className='flex flex-col items-center gap-1'>
              <TimezoneCombobox />
              Hour: {time.hour}
              <Slider
                defaultValue={[time.hour]}
                onValueChange={(e) => {
                  console.log(e)
                  setClockPause(true)
                  setTime((prev) => prev.set({ hour: e[0] }))
                }}
                max={24}
                step={1}
              />
              Minute: {time.minute}
              <Slider
                defaultValue={[time.minute]}
                onValueChange={(e) => {
                  console.log(e)
                  setClockPause(true)
                  setTime((prev) => prev.set({ minute: e[0] }))
                }}
                max={60}
                step={1}
              />
              Second: {time.second}
              <Slider
                defaultValue={[time.second]}
                onValueChange={(e) => {
                  console.log(e)
                  setClockPause(true)
                  setTime((prev) => prev.set({ second: e[0] }))
                }}
                max={60}
                step={1}
              />
              <Separator className='my-2' />
              <div className='flex gap-2'>
                <LightSwitch />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Toggle
                        pressed={reduceMotion}
                        onPressedChange={(e) => {
                          setReduceMotion(e)
                        }}
                        aria-label='Reduce motion'>
                        <Icon icon='mdi:motion' width='24' height='24' />
                      </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                      Turn {reduceMotion ? 'off' : 'on'} reduced motion
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.div
                        style={{
                          opacity: 0,
                        }}
                        animate={{
                          scale: clockPause ? 1 : 0.9,
                          opacity: clockPause ? 1 : 0.8,
                        }}>
                        <Button
                          disabled={!clockPause}
                          onClick={() => {
                            setClockPause(false)
                            setTime(DateTime.now().setZone(timezone.utc[0]))
                          }}
                          className='cursor-pointer'>
                          <Icon
                            icon='qlementine-icons:reset-16'
                            width='16'
                            height='16'
                          />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>Reset clock</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <HoverCard
          onOpenChange={(e) => {
            setInfoOpen(e)
          }}>
          <HoverCardTrigger>
            <motion.div
              style={{ scale: 1 }}
              whileHover={{ scale: infoOpen ? 1.5 : 1.1 }}>
              <Icon icon='mingcute:question-fill' width='24' height='24' />
            </motion.div>
          </HoverCardTrigger>
          <HoverCardContent>
            <h1 className="font-['Poppins']">What is this?</h1>
            <p>
              This is a digital representation of the{' '}
              <a
                target='_blank'
                className='text-neutral-400'
                href='https://en.wikipedia.org/wiki/Mengenlehreuhr'>
                <WikipediaHover text='Mengenlehreuhr' />
              </a>{' '}
              with the help of open-source libraries like{' '}
              <a className='text-neutral-400' href='https://motion.dev/'>
                motion
              </a>
              ,{' '}
              <a className='text-neutral-400' href='https://react.dev'>
                React
              </a>{' '}
              and{' '}
              <a className='text-neutral-400' href='https://tailwindcss.com'>
                Tailwind.
              </a>
            </p>
          </HoverCardContent>
        </HoverCard>
        <a href='https://github.com/kalkafox/mengenlehreuhr' target='_blank'>
          <Icon icon='mdi:github' width='24' height='24' />
        </a>
      </div>
      <TimeSyncChecker />
    </>
  )
}

export default App

import { useToast } from '@/hooks/use-toast'
import {
  clockPauseAtom,
  fontAtom,
  glowAtom,
  languageAtom,
  reduceMotionAtom,
  timeAtom,
  timezoneAtom,
} from '@/lib/atom'
import { languageNames } from '@/lib/i18n'
import { isTouchDevice } from '@/lib/touch'
import { Icon } from '@iconify/react'
import { useAtom, useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import LightSwitch from './light-switch'
import { TimezoneCombobox } from './timezone-combobox'
import ToolbarButton from './toolbar-button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'
import { Slider } from './ui/slider'
import { ToastAction } from './ui/toast'
import { Toggle } from './ui/toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import WikipediaHover from './wikipedia-hover'

type LanguageCode = keyof typeof languageNames

const Toolbar = () => {
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const tapRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  const [time, setTime] = useAtom(timeAtom)
  const [reduceMotion, setReduceMotion] = useAtom(reduceMotionAtom)
  const [clockPause, setClockPause] = useAtom(clockPauseAtom)
  const [timezone] = useAtom(timezoneAtom)
  const [glow, setGlow] = useAtom(glowAtom)
  const [language, setLanguage] = useAtom(languageAtom)
  const [font, setFont] = useAtom(fontAtom)

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [tapRegistered, setTapRegistered] = useState(false)

  const iconSize = isTouchDevice() ? 36 : 24

  const tapNotifyWidth = tapRef.current?.clientWidth ?? 0

  const currentLanguage = languageNames[language as LanguageCode]

  const toolbarWidthStyle =
    isTouchDevice() && !tapRegistered ? tapNotifyWidth + 20 : 'auto'

  useEffect(() => {
    if (clockPause) {
      toast({
        title: t('toast.clock_paused.title'),
        description: t('toast.clock_paused.description'),
        action: (
          <ToastAction
            onClick={() => setClockPause(false)}
            altText={t('info.resetclock')}
          >
            {t('info.resetclock')}
          </ToastAction>
        ),
      })
    }
  }, [clockPause, toast, setClockPause, t])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n, setFont])

  return (
    <div className="flex items-center justify-center">
      <motion.div
        ref={toolbarRef}
        style={{
          width: toolbarWidthStyle,
        }}
        animate={{
          width: toolbarWidthStyle,
        }}
        className="flex items-center justify-center gap-2 bg-neutral-900 rounded-lg p-4"
      >
        <Popover
          onOpenChange={(e) => {
            console.log(e)
            setSettingsOpen(e)
          }}
        >
          <PopoverTrigger className="cursor-pointer">
            <motion.div
              className="my-2"
              onTap={() => setTapRegistered(true)}
              whileHover={{ rotateZ: settingsOpen ? 75 : 5 }}
              animate={{ rotateZ: settingsOpen ? 75 : 0 }}
            >
              <Icon
                icon="material-symbols:settings"
                width={iconSize}
                height={iconSize}
              />
            </motion.div>
            {isTouchDevice() ? (
              <motion.div
                style={{ rotate: 180, y: -85 }}
                animate={{
                  y: -75,
                  opacity: tapRegistered ? 0 : 1,
                  display: tapRegistered ? 'none' : 'block',
                  scale: tapRegistered ? 1.2 : 1,
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 1, // Adjust the duration to control speed
                    ease: 'easeInOut', // Easing function for smoothness
                  },
                }}
                className="absolute"
              >
                <Icon
                  icon="guidance:up-arrow"
                  width={iconSize}
                  height={iconSize}
                />
              </motion.div>
            ) : null}
          </PopoverTrigger>
          <PopoverContent className="w-auto" style={{ fontFamily: font }}>
            <div className="flex flex-col items-center gap-1">
              <TimezoneCombobox />
              {t('toolbar.hour')}: {time.hour}
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
              {t('toolbar.minute')}: {time.minute}
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
              {t('toolbar.second')}: {time.second}
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
              {time.toLocaleString()}
              <Separator className="my-2" />
              <div className="flex gap-2">
                <LightSwitch />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.div animate={{ scale: reduceMotion ? 0.9 : 1 }}>
                        <Toggle
                          className="cursor-pointer"
                          pressed={reduceMotion}
                          onPressedChange={(e) => {
                            setReduceMotion(e)
                          }}
                          aria-label="Reduce motion"
                        >
                          <Icon
                            icon="mdi:motion"
                            width={iconSize}
                            height={iconSize}
                          />
                        </Toggle>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t('hover.reducemotion')}{' '}
                      {reduceMotion ? t('generic.off') : t('generic.on')}
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
                        }}
                      >
                        <Toggle
                          disabled={!clockPause}
                          onPressedChange={() => {
                            setClockPause(false)
                            setTime(DateTime.now().setZone(timezone.utc[0]))
                          }}
                          className="cursor-pointer"
                        >
                          <Icon
                            icon="qlementine-icons:reset-16"
                            width="16"
                            height="16"
                          />
                        </Toggle>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>{t('info.resetclock')}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.div animate={{ scale: glow ? 0.9 : 1 }}>
                        <Toggle
                          pressed={glow}
                          onPressedChange={(e) => {
                            setGlow(e)
                          }}
                          className="cursor-pointer"
                        >
                          <Icon
                            icon="material-symbols:fluorescent"
                            width="16"
                            height="16"
                          />
                        </Toggle>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t('hover.glow')}{' '}
                      {glow ? t('generic.off') : t('generic.on')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Select
                  onValueChange={(e) => {
                    setLanguage(e)
                  }}
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder={currentLanguage} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageNames).map(([k, l]) => (
                      <SelectItem key={l} value={k}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {isTouchDevice() ? (
          <Popover onOpenChange={(e) => setInfoOpen(e)}>
            <PopoverTrigger>
              <motion.div
                style={{ scale: 1 }}
                whileHover={{ scale: infoOpen ? 1.5 : 1.1 }}
                animate={{ scale: infoOpen ? 1.5 : 1 }}
              >
                <Icon
                  icon="mingcute:question-fill"
                  width={iconSize}
                  height={iconSize}
                />
              </motion.div>
            </PopoverTrigger>
            <PopoverContent>
              <InfoSection />
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard
            onOpenChange={(e) => {
              setInfoOpen(e)
            }}
          >
            <HoverCardTrigger>
              <motion.div
                className="cursor-help"
                style={{ scale: 1 }}
                animate={{ scale: infoOpen ? 1.5 : 1 }}
                whileHover={{ scale: infoOpen ? 1.5 : 1.1 }}
              >
                <Icon
                  icon="mingcute:question-fill"
                  width={iconSize}
                  height={iconSize}
                />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent>
              <InfoSection />
            </HoverCardContent>
          </HoverCard>
        )}
        <ToolbarButton>
          <a href="https://github.com/kalkafox/mengenlehreuhr" target="_blank">
            <Icon icon="mdi:github" width={iconSize} height={iconSize} />
          </a>
        </ToolbarButton>
        {isTouchDevice() ? (
          <motion.div
            ref={tapRef}
            style={{ y: 30, fontFamily: font }}
            animate={{
              y: tapRegistered ? 40 : 30,
              opacity: tapRegistered ? 0 : 1,
            }}
            className={`absolute text-lg`}
          >
            {t('toolbar.touch.info')}
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  )
}

const InfoSection = () => {
  const [moreInfo, setMoreInfo] = useState(false)
  const font = useAtomValue(fontAtom)

  return (
    <>
      <h1 style={{ fontFamily: font }} className={`text-lg font-bold`}>
        <Trans i18nKey="toolbar.whatisthis.title" />
      </h1>
      <Separator />
      <p>
        <Trans
          i18nKey="toolbar.whatisthis.description_1"
          components={{
            wikiLink: <WikipediaHover text="Mengenlehreuhr" />,
            motionLink: (
              <a className="text-neutral-400" href="https://motion.dev/">
                motion
              </a>
            ),
            reactLink: (
              <a className="text-neutral-400" href="https://react.dev">
                React
              </a>
            ),
            tailwindLink: (
              <a className="text-neutral-400" href="https://tailwindcss.com">
                Tailwind
              </a>
            ),
          }}
        />
        {moreInfo ? (
          <>
            {' '}
            <Trans
              i18nKey="toolbar.whatisthis.why"
              components={{
                youtubeVideo: (
                  <a
                    className="text-neutral-400"
                    href="https://youtu.be/jVpsLMCIB0Y"
                  ></a>
                ),
                wikiLink: <WikipediaHover text="Kryptos" />,
              }}
            />
          </>
        ) : (
          <>
            {' '}
            <button
              className="text-neutral-500 text-sm cursor-pointer"
              onClick={() => setMoreInfo(true)}
            >
              <Trans i18nKey="generic.why" />
            </button>
          </>
        )}
      </p>
    </>
  )
}

export default Toolbar

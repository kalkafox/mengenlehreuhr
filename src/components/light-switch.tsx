import { motion } from 'motion/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { clockToggleAtom, lightSwitchShowAtom } from '@/lib/atom'
import { useAtom, useAtomValue } from 'jotai'
import { isTouchDevice } from '@/lib/touch'
import { useTranslation } from 'react-i18next'

const LightSwitch = () => {
  const { t } = useTranslation()
  const [clockToggle, setClockToggle] = useAtom(clockToggleAtom)
  const lightSwitchShow = useAtomValue(lightSwitchShowAtom)

  if (isTouchDevice() && lightSwitchShow) return <></>

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className='h-10 w-4 outline-1 bg-[#101010] rounded-sm'>
            <motion.div
              className={`h-8 w-4 relative cursor-pointer transition-colors ${
                !clockToggle ? 'bg-neutral-900' : 'bg-neutral-200'
              } rounded-sm`}
              style={{
                transformStyle: 'preserve-3d',
                translateZ: '75px',
                y: 0,
              }}
              animate={{
                y: clockToggle ? 0 : 6,
              }}
              onClick={() => setClockToggle((prev) => !prev)}></motion.div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {t('hover.lightswitch')}{' '}
          {!clockToggle ? t('generic.on') : t('generic.off')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default LightSwitch

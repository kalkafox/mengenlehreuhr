import { motion } from 'motion/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { clockToggleAtom } from '../lib/atom'
import { useAtom } from 'jotai'

const LightSwitch = () => {
  const [clockToggle, setClockToggle] = useAtom(clockToggleAtom)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            className={`h-10 w-4 cursor-pointer transition-colors ${
              !clockToggle ? 'bg-neutral-900' : 'bg-neutral-200'
            } rounded-sm`}
            style={{
              transformStyle: 'preserve-3d',
              translateZ: '75px',
              y: 0,
            }}
            animate={{
              rotateX: clockToggle ? 0 : 50,
            }}
            onClick={() => setClockToggle((prev) => !prev)}></motion.div>
        </TooltipTrigger>
        <TooltipContent>
          Turn clock {!clockToggle ? 'on' : 'off'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default LightSwitch

import { motion, useSpring } from 'motion/react'

const ToolbarButton = ({ children }: { children: React.ReactNode }) => {
  const scale = useSpring(1)

  return (
    <motion.div
      style={{ scale }}
      onMouseDown={() => {
        scale.set(0.9)
      }}
      onMouseUp={() => {
        scale.set(1)
      }}
      className="hover:bg-neutral-400/20 p-1 rounded-lg transition-colors"
    >
      {children}
    </motion.div>
  )
}

export default ToolbarButton

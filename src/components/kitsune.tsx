import { fontAtom, loadedImagesAtom } from '@/lib/atom'
import { FoxResponse } from '@/types/app'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import ky from 'ky'
import { AnimatePresence, motion, useSpring } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from './image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

const Kitsune = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const scale = useSpring(1)
  const [font] = useAtom(fontAtom)
  const loadedImages = useAtomValue(loadedImagesAtom)

  const foxQuery = useQuery({
    queryKey: ['fox'],
    queryFn: async () => {
      const response = await ky
        .get('https://randomfox.ca/floof/')
        .json<FoxResponse>()

      return response.image
    },
  })

  return (
    <HoverCard
      onOpenChange={(e) => {
        scale.set(e ? 1.2 : 1)
        setOpen(e)
      }}
    >
      <HoverCardTrigger>
        <motion.div
          className={`p-1 m-2 rounded-lg ${open ? '' : 'hover:'}bg-neutral-800/80 transition-colors`}
          exit={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: open ? 1.2 : 1, opacity: 1 }}
          style={{ scale: scale, opacity: 0 }}
          whileHover={{ scale: open ? 1.2 : 1.05 }}
        >
          <Icon icon="noto:fox" width={32} height={32} />
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent
        style={{ fontFamily: font }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div>
          {t('widget.kitsune.congrats')}
          {foxQuery.isLoading ||
          !loadedImages.find((e) => e === foxQuery.data) ? (
            <motion.div style={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t('widget.kitsune.loading')}
            </motion.div>
          ) : null}
          <AnimatePresence>
            {foxQuery.isLoading &&
            !loadedImages.find((e) => e === foxQuery.data) ? (
              <motion.div style={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {t('widget.kitsune.loading')}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <Image className="rounded-lg" src={foxQuery.data} />
      </HoverCardContent>
    </HoverCard>
  )
}

export default Kitsune

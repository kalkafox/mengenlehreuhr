import { loadedImagesAtom } from '@/lib/atom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [, setLoadedImages] = useAtom(loadedImagesAtom)

  const [dimensions, setDimensions] = useState<{
    width?: number
    height?: number
  }>({})

  // Query to fetch image dimensions from headers
  useEffect(() => {
    const fetchImageHeaders = async () => {
      if (!props.src) return

      try {
        const res = await ky.head(props.src)

        const width =
          res.headers.get('X-Image-Width') || res.headers.get('Content-Width')
        const height =
          res.headers.get('X-Image-Height') || res.headers.get('Content-Height')

        if (width && height) {
          setDimensions({ width: parseInt(width), height: parseInt(height) })
        } else {
          // just do the default
          setDimensions({ width: 100, height: 200 })
        }
      } catch (error) {
        console.error('Failed to fetch image headers:', error)
      }
    }

    fetchImageHeaders()
  }, [props.src])

  const imageQuery = useQuery({
    queryKey: ['image', props.src],
    queryFn: async () => {
      if (!props.src) throw new Error('Image source is undefined')

      const res = await ky(props.src)
      const blob = await res.blob()

      setLoadedImages((prev) => [...prev, props.src!])

      return URL.createObjectURL(blob)
    },
    enabled: !!props.src, // Prevent query if src is undefined
  })

  if (imageQuery.isFetching) {
    return (
      <Skeleton
        style={{
          width: props.width ?? dimensions.width,
          height: props.height ?? dimensions.height,
        }}
      />
    )
  }

  return (
    <img
      onLoad={(e) => {
        setDimensions({
          width: e.currentTarget.naturalWidth,
          height: e.currentTarget.naturalHeight,
        })
      }}
      alt={props.alt}
      src={imageQuery.data}
      width={props.width ?? dimensions.width}
      height={props.height ?? dimensions.height}
      {...props}
    />
  )
}

export default Image

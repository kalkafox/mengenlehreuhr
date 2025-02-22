import { atom, WritableAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { DateTime } from 'luxon'
import i18next from './i18n'
import timezones from './timezones.json'

export function atomWithToggleAndStorage(
  key: string,
  initialValue?: boolean,
  storage?: any
): WritableAtom<boolean, [boolean?], void> {
  const anAtom = atomWithStorage(key, initialValue, storage)
  const derivedAtom = atom(
    (get) => get(anAtom),
    (get, set, nextValue?: boolean) => {
      const update = nextValue ?? !get(anAtom)
      void set(anAtom, update)
    }
  )

  return derivedAtom as WritableAtom<boolean, [boolean?], void>
}

export const timeAtom = atom<DateTime<true> | DateTime<false>>(DateTime.now())

export const clockToggleAtom = atom(true)

const clientTimezone = timezones.find((tz) =>
  tz.utc.find((s) =>
    s.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
  )
)!

console.log(clientTimezone)

export const timezoneAtom = atom(clientTimezone)

export const clockPauseAtom = atom(false)

export const reduceMotionAtom = atomWithToggleAndStorage('reduceMotion')

export const glowAtom = atomWithToggleAndStorage('glow')

export const lightSwitchShowAtom = atom(false)

export const languageAtom = atomWithStorage(
  'interface_language',
  i18next.language
)

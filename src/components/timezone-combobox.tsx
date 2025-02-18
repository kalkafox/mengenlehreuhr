'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover'

import timezones from '../lib/timezones.json'
import { useAtom } from 'jotai'
import { timezoneAtom } from '../lib/atom'
import { Timezone } from '@/types/timezone'

export function TimezoneCombobox() {
  const [open, setOpen] = React.useState(false)
  const [timezone, setTimezone] = useAtom(timezoneAtom)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-auto justify-between'>
          {timezone ? timezone.value : 'Select timezone...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Command>
          <CommandInput placeholder='Search timezone...' />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((tz) => (
                <CommandItem
                  key={tz.text}
                  value={tz.value}
                  onSelect={(currentValue) => {
                    console.log(currentValue)
                    setTimezone(
                      timezones.find(
                        (tz) => tz.value === currentValue,
                      ) as Timezone,
                    )
                    setOpen(false)
                  }}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      timezone === tz ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {tz.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

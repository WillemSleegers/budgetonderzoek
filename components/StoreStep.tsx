"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StoreStepProps {
  onStoreSelect?: (store: string) => void
  selectedStore?: string
}

const commonDutchStores = [
  { value: 'albert-heijn', label: 'Albert Heijn' },
  { value: 'jumbo', label: 'Jumbo' },
  { value: 'lidl', label: 'Lidl' },
  { value: 'aldi', label: 'Aldi' },
  { value: 'plus', label: 'Plus' },
  { value: 'coop', label: 'Coop' },
  { value: 'spar', label: 'Spar' },
  { value: 'mcdonalds', label: "McDonald's" },
  { value: 'burger-king', label: 'Burger King' },
  { value: 'kfc', label: 'KFC' },
  { value: 'subway', label: 'Subway' },
  { value: 'dominos', label: "Domino's Pizza" },
  { value: 'new-york-pizza', label: 'New York Pizza' },
  { value: 'action', label: 'Action' },
  { value: 'hema', label: 'HEMA' },
  { value: 'kruidvat', label: 'Kruidvat' },
  { value: 'etos', label: 'Etos' },
  { value: 'mediamarkt', label: 'MediaMarkt' },
  { value: 'coolblue', label: 'Coolblue' },
  { value: 'bol-com', label: 'Bol.com' },
  { value: 'ah-to-go', label: 'AH to go' },
  { value: 'shell', label: 'Shell' },
  { value: 'bp', label: 'BP' },
  { value: 'esso', label: 'Esso' }
]

export default function StoreStep({ onStoreSelect, selectedStore }: StoreStepProps) {
  const [open, setOpen] = useState(false)

  const handleStoreSelect = (storeValue: string) => {
    const store = commonDutchStores.find(s => s.value === storeValue)
    if (store) {
      onStoreSelect?.(store.label)
      setOpen(false)
    }
  }

  const selectedStoreValue = selectedStore 
    ? commonDutchStores.find(s => s.label === selectedStore)?.value 
    : undefined

  return (
    <div className="flex flex-col items-center px-4 py-4 bg-gray-50">
      {/* Main Question */}
      <div className="text-center mb-4 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Waar deed u de uitgave?
        </h1>
        <p className="text-gray-600 text-sm">
          Zoek naar een winkel of bedrijf zoals Albert Heijn, Pathé of Bol.com
        </p>
      </div>

      {/* Store Illustration */}
      <div className="mb-4">
        <svg width="160" height="100" viewBox="0 0 200 120" className="drop-shadow-sm">
          {/* Store Building */}
          <rect x="30" y="40" width="140" height="70" fill="#f97316" rx="4" />
          
          {/* Storefront Awning */}
          <path 
            d="M20 40 L180 40 L170 25 L30 25 Z" 
            fill="#dc2626" 
            stroke="#b91c1c" 
            strokeWidth="1"
          />
          
          {/* Awning Stripes */}
          {Array.from({ length: 8 }, (_, i) => (
            <line 
              key={i}
              x1={25 + i * 20} 
              y1="25" 
              x2={30 + i * 20} 
              y2="40" 
              stroke="#fef2f2" 
              strokeWidth="2"
            />
          ))}
          
          {/* Door */}
          <rect x="75" y="60" width="30" height="50" fill="#0ea5e9" rx="2" />
          <rect x="105" y="60" width="30" height="50" fill="#0ea5e9" rx="2" />
          
          {/* Door Handles */}
          <circle cx="80" cy="85" r="2" fill="#374151" />
          <circle cx="130" cy="85" r="2" fill="#374151" />
          
          {/* Windows */}
          <rect x="40" y="50" width="25" height="20" fill="#fbbf24" rx="2" />
          <rect x="145" y="50" width="25" height="20" fill="#fbbf24" rx="2" />
          
          {/* Sign Post */}
          <rect x="185" y="30" width="6" height="60" fill="#6b7280" />
          <rect x="180" y="25" width="16" height="20" fill="#10b981" rx="2" />
        </svg>
      </div>

      {/* Store Selection */}
      <div className="w-full max-w-sm">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full h-12 justify-between text-left px-4"
            >
              <span className="truncate">
                {selectedStoreValue
                  ? commonDutchStores.find((store) => store.value === selectedStoreValue)?.label
                  : "Selecteer een winkel..."}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="p-0" 
            align="start" 
            sideOffset={4}
            style={{ width: 'var(--radix-popover-trigger-width)' }}
          >
            <Command>
              <CommandInput placeholder="Zoek winkel..." />
              <CommandList className="max-h-60">
                <CommandEmpty>Geen winkel gevonden.</CommandEmpty>
                <CommandGroup>
                  {commonDutchStores.map((store) => (
                    <CommandItem
                      key={store.value}
                      value={store.value}
                      onSelect={() => handleStoreSelect(store.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStoreValue === store.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {store.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
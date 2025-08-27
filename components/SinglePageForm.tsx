"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check, ChevronsUpDown, CalendarIcon, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface ExpenseFormData {
  date?: Date
  store: string
  amount: number
  isAbroad: boolean
  isOnline: boolean
}

interface SinglePageFormProps {
  onBack: () => void
  onSubmit: (data: ExpenseFormData) => void
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

export default function SinglePageForm({ onBack, onSubmit }: SinglePageFormProps) {
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    store: '',
    amount: 0,
    isAbroad: false,
    isOnline: false
  })
  
  const [storeOpen, setStoreOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)

  const handleStoreSelect = (storeValue: string) => {
    const store = commonDutchStores.find(s => s.value === storeValue)
    if (store) {
      setFormData(prev => ({ ...prev, store: store.label }))
      setStoreOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormValid = formData.date && formData.store && formData.amount > 0

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-lg font-semibold">Nieuwe Uitgave - Single Page Form</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Uitgave Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Date Field */}
              <div className="space-y-2">
                <Label htmlFor="date">Datum van aankoop *</Label>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP", { locale: nl })
                      ) : (
                        <span>Kies een datum</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => {
                        setFormData(prev => ({ ...prev, date }))
                        setDateOpen(false)
                      }}
                      locale={nl}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Store Field */}
              <div className="space-y-2">
                <Label htmlFor="store">Winkel of bedrijf *</Label>
                <Popover open={storeOpen} onOpenChange={setStoreOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={storeOpen}
                      className="w-full justify-between h-12"
                    >
                      <span className="truncate">
                        {formData.store || "Selecteer een winkel..."}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="p-0" 
                    align="start"
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
                                  formData.store === store.label ? "opacity-100" : "opacity-0"
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

              {/* Amount Field */}
              <div className="space-y-2">
                <Label htmlFor="amount">Bedrag *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    className="pl-8 h-12"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      amount: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>

              {/* Location Radio Group */}
              <div className="space-y-3">
                <Label>Locatie *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      checked={!formData.isAbroad}
                      onChange={() => setFormData(prev => ({ ...prev, isAbroad: false }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Nederland</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      checked={formData.isAbroad}
                      onChange={() => setFormData(prev => ({ ...prev, isAbroad: true }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Buitenland</span>
                  </label>
                </div>
              </div>

              {/* Purchase Type Radio Group */}
              <div className="space-y-3">
                <Label>Type aankoop *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="purchase-type"
                      checked={!formData.isOnline}
                      onChange={() => setFormData(prev => ({ ...prev, isOnline: false }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Fysieke winkel</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="purchase-type"
                      checked={formData.isOnline}
                      onChange={() => setFormData(prev => ({ ...prev, isOnline: true }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Online</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={!isFormValid}
              >
                Uitgave Toevoegen
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
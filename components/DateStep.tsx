"use client"

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

interface DateStepProps {
  onDateSelect?: (date: Date) => void
  selectedDate?: Date
}

export default function DateStep({ onDateSelect, selectedDate }: DateStepProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      onDateSelect?.(selectedDate)
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-4 bg-gray-50">
      {/* Main Question */}
      <div className="text-center mb-4 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Wanneer deed u de uitgave?
        </h1>
        <p className="text-gray-600 text-sm">
          Selecteer de datum waarop u deze uitgave heeft gedaan
        </p>
      </div>

      {/* Date Selection */}
      <div className="w-full max-w-sm">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              locale={nl}
              disabled={(date) => 
                date > new Date() || date < new Date("1900-01-01")
              }
              className="mx-auto"
            />
            
            {date && (
              <div className="mt-3 text-center pt-3 border-t">
                <p className="text-xs text-gray-600 mb-1">Geselecteerde datum:</p>
                <p className="text-sm font-semibold text-blue-600">
                  {format(date, 'EEEE d MMMM yyyy', { locale: nl })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
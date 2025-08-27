import { Button } from '@/components/ui/button'

interface OnlineStepProps {
  onSelectionChange?: (isOnline: boolean) => void
  selectedValue?: boolean
}

export default function OnlineStep({ onSelectionChange, selectedValue }: OnlineStepProps) {
  const handleSelection = (isOnline: boolean) => {
    onSelectionChange?.(isOnline)
  }

  return (
    <div className="flex flex-col items-center px-4 py-4 bg-gray-50">
      {/* Main Question */}
      <div className="text-center mb-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Was dit een online aankoop?
        </h1>
        <p className="text-gray-600 text-sm">
          Selecteer ja als u dit product of deze dienst online heeft gekocht
        </p>
      </div>

      {/* Yes/No Selection */}
      <div className="w-full max-w-sm space-y-3">
        <Button
          variant={selectedValue === false ? "default" : "outline"}
          onClick={() => handleSelection(false)}
          className={`w-full h-12 text-base ${
            selectedValue === false 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          Nee, in een fysieke winkel
        </Button>
        
        <Button
          variant={selectedValue === true ? "default" : "outline"}
          onClick={() => handleSelection(true)}
          className={`w-full h-12 text-base ${
            selectedValue === true 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          Ja, online gekocht
        </Button>
      </div>
    </div>
  )
}
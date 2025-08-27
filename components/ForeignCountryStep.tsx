import { Button } from '@/components/ui/button'

interface ForeignCountryStepProps {
  onSelectionChange?: (isAbroad: boolean) => void
  selectedValue?: boolean
}

export default function ForeignCountryStep({ onSelectionChange, selectedValue }: ForeignCountryStepProps) {
  const handleSelection = (isAbroad: boolean) => {
    onSelectionChange?.(isAbroad)
  }

  return (
    <div className="flex flex-col items-center px-4 py-4 bg-gray-50">
      {/* Main Question */}
      <div className="text-center mb-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Was dit een uitgave in het buitenland?
        </h1>
        <p className="text-gray-600 text-sm">
          Selecteer ja als deze uitgave in een ander land dan Nederland is gedaan
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
          Nee, in Nederland
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
          Ja, in het buitenland
        </Button>
      </div>
    </div>
  )
}
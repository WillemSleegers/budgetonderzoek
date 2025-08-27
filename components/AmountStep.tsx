interface AmountStepProps {
  onAmountChange?: (amount: number) => void
  selectedAmount?: number
}

export default function AmountStep({ onAmountChange, selectedAmount }: AmountStepProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    onAmountChange?.(value)
  }

  return (
    <div className="flex flex-col items-center px-4 py-4 bg-gray-50">
      {/* Main Question */}
      <div className="text-center mb-4 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Wat was het bedrag van de uitgave?
        </h1>
        <p className="text-gray-600 text-sm">
          Voer het totale bedrag in euro's in
        </p>
      </div>

      {/* Amount Input */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            €
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            defaultValue={selectedAmount && selectedAmount > 0 ? selectedAmount : undefined}
            onChange={handleAmountChange}
            className="w-full pl-8 pr-4 py-3 h-12 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  )
}
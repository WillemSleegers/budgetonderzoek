import { ArrowLeft, Bell, FileSpreadsheet, Calendar, Store, Globe, ShoppingCart, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StepIndicatorProps {
  steps: {
    id: string
    label: string
    icon: React.ReactNode
    isActive?: boolean
    isCompleted?: boolean
  }[]
  currentStep: string
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="w-full px-4 mb-6">
      <div className="flex items-start justify-between relative max-w-sm mx-auto">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ 
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%` 
            }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = index < currentStepIndex
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 flex-1">
              {/* Step Circle - smaller for mobile */}
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : isCompleted 
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                <span className="scale-75">
                  {step.icon}
                </span>
              </div>
              
              {/* Step Label - smaller text for mobile */}
              <div className="mt-2 text-center px-1">
                <p className={`text-xs font-medium leading-tight ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ExpenseStepHeaderProps {
  currentStep: string
  onBack?: () => void
  showNotification?: boolean
}

export default function ExpenseStepHeader({ currentStep, onBack, showNotification = true }: ExpenseStepHeaderProps) {
  const steps = [
    {
      id: 'date',
      label: 'Datum',
      icon: <Calendar size={20} />
    },
    {
      id: 'store',
      label: 'Winkel',
      icon: <Store size={20} />
    },
    {
      id: 'location',
      label: 'Land',
      icon: <Globe size={20} />
    },
    {
      id: 'type',
      label: 'Online',
      icon: <ShoppingCart size={20} />
    },
    {
      id: 'amount',
      label: 'Bedrag',
      icon: <DollarSign size={20} />
    }
  ]

  return (
    <div className="bg-white">
      {/* Top Navigation - optimized for mobile */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="text-blue-500" size={20} />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </div>
        {showNotification && (
          <Bell size={20} className="text-gray-600" />
        )}
      </div>

      {/* Progress Steps */}
      <div className="py-4">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Back Button - mobile optimized */}
      {onBack && (
        <div className="px-4 pb-3">
          <Button 
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm h-8"
          >
            <ArrowLeft size={16} />
            <span>Terug naar overzicht</span>
          </Button>
        </div>
      )}
    </div>
  )
}
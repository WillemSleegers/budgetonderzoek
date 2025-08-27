import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface StepNavigationProps {
  onPrevious?: () => void
  onNext?: () => void
  previousLabel?: string
  nextLabel?: string
  showPrevious?: boolean
  showNext?: boolean
  isNextDisabled?: boolean
}

export default function StepNavigation({ 
  onPrevious, 
  onNext, 
  previousLabel = "Vorige",
  nextLabel = "Volgende",
  showPrevious = true,
  showNext = true,
  isNextDisabled = false
}: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-t gap-3">
      <div>
        {showPrevious && onPrevious && (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex items-center gap-2 px-4"
          >
            <ArrowLeft size={16} />
            {previousLabel}
          </Button>
        )}
      </div>
      
      <div>
        {showNext && onNext && (
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className={`flex items-center gap-2 px-6 ${
              isNextDisabled 
                ? ''
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            variant={isNextDisabled ? "secondary" : "default"}
          >
            {nextLabel}
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
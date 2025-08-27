import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ApproachSelectionStepProps {
  onApproachSelect: (approach: 'multi-step' | 'single-page') => void
}

export default function ApproachSelectionStep({ onApproachSelect }: ApproachSelectionStepProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Uitgave Toevoegen
        </h1>
        <p className="text-gray-600 text-sm">
          Kies een benadering om door de flow te gaan
        </p>
      </div>

      {/* Approach Options */}
      <div className="w-full max-w-lg space-y-4">
        
        {/* Multi-Step Approach */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Step Flow</CardTitle>
            <CardDescription>
              Doorloop 5 afzonderlijke stappen met voortgangsindicatie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => onApproachSelect('multi-step')}
            >
              Start Multi-Step Flow
            </Button>
          </CardContent>
        </Card>

        {/* Single Page Approach */}
        <Card>
          <CardHeader>
            <CardTitle>Single Page Form</CardTitle>
            <CardDescription>
              Alle velden op één pagina invullen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => onApproachSelect('single-page')}
            >
              Start Single Page Form
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
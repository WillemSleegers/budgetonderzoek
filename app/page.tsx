"use client"

import { useState } from "react"
import ExpenseStepHeader from "@/components/ExpenseStepHeader"
import DateStep from "@/components/DateStep"
import StoreStep from "@/components/StoreStep"
import ForeignCountryStep from "@/components/ForeignCountryStep"
import OnlineStep from "@/components/OnlineStep"
import AmountStep from "@/components/AmountStep"
import StepNavigation from "@/components/StepNavigation"
import ApproachSelectionStep from "@/components/ApproachSelectionStep"
import SinglePageForm from "@/components/SinglePageForm"

type Step = "approach-selection" | "date" | "store" | "location" | "type" | "amount"
type Approach = "multi-step" | "single-page" | null

interface ExpenseData {
  date?: Date
  store?: string
  isAbroad?: boolean
  isOnline?: boolean
  amount?: number
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("approach-selection")
  const [selectedApproach, setSelectedApproach] = useState<Approach>(null)
  const [expenseData, setExpenseData] = useState<ExpenseData>({})

  const multiStepFlow: Step[] = ["date", "store", "location", "type", "amount"]
  const currentStepIndex = multiStepFlow.indexOf(currentStep)

  const handleNext = () => {
    if (currentStepIndex < multiStepFlow.length - 1) {
      setCurrentStep(multiStepFlow[currentStepIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(multiStepFlow[currentStepIndex - 1])
    }
  }

  const handleBack = () => {
    setCurrentStep("approach-selection")
    setSelectedApproach(null)
    setExpenseData({})
  }

  const handleApproachSelect = (approach: Approach) => {
    console.log('Approach selected:', approach)
    setSelectedApproach(approach)
    if (approach === 'multi-step') {
      setCurrentStep("date")
    }
  }

  const handleSinglePageSubmit = (data: ExpenseData) => {
    setExpenseData(data)
    console.log("Single page form submitted:", data)
    // You can add success handling here
    alert("Uitgave succesvol toegevoegd!")
  }

  const handleDateSelect = (date: Date) => {
    setExpenseData(prev => ({ ...prev, date }))
  }

  const handleStoreSelect = (store: string) => {
    setExpenseData(prev => ({ ...prev, store }))
  }

  const handleForeignCountrySelect = (isAbroad: boolean) => {
    setExpenseData(prev => ({ ...prev, isAbroad }))
  }

  const handleOnlineSelect = (isOnline: boolean) => {
    setExpenseData(prev => ({ ...prev, isOnline }))
  }

  const handleAmountChange = (amount: number) => {
    setExpenseData(prev => ({ ...prev, amount }))
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case "date":
        return !expenseData.date
      case "store":
        return !expenseData.store
      case "location":
        return expenseData.isAbroad === undefined
      case "type":
        return expenseData.isOnline === undefined
      case "amount":
        return !expenseData.amount || expenseData.amount <= 0
      default:
        return false
    }
  }

  const renderCurrentStep = () => {
    if (selectedApproach === "single-page") {
      return (
        <SinglePageForm 
          onBack={handleBack}
          onSubmit={handleSinglePageSubmit}
        />
      )
    }

    if (currentStep === "approach-selection") {
      return <ApproachSelectionStep onApproachSelect={handleApproachSelect} />
    }

    // Multi-step flow
    switch (currentStep) {
      case "date":
        return (
          <DateStep 
            onDateSelect={handleDateSelect}
            selectedDate={expenseData.date}
          />
        )
      case "store":
        return (
          <StoreStep 
            onStoreSelect={handleStoreSelect} 
            selectedStore={expenseData.store}
          />
        )
      case "location":
        return (
          <ForeignCountryStep 
            onSelectionChange={handleForeignCountrySelect}
            selectedValue={expenseData.isAbroad}
          />
        )
      case "type":
        return (
          <OnlineStep 
            onSelectionChange={handleOnlineSelect}
            selectedValue={expenseData.isOnline}
          />
        )
      case "amount":
        return (
          <AmountStep 
            onAmountChange={handleAmountChange}
            selectedAmount={expenseData.amount}
          />
        )
      default:
        return (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">Step {currentStep} - Coming soon</p>
          </div>
        )
    }
  }

  // Single page form handles its own layout
  if (selectedApproach === "single-page") {
    return renderCurrentStep()
  }

  // Approach selection or multi-step flow
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {currentStep !== "approach-selection" && (
        <ExpenseStepHeader 
          currentStep={currentStep} 
          onBack={handleBack}
        />
      )}
      
      <main className="flex-1 overflow-y-auto">
        {renderCurrentStep()}
      </main>
      
      {selectedApproach === "multi-step" && currentStep !== "approach-selection" && (
        <StepNavigation 
          onPrevious={currentStepIndex > 0 ? handlePrevious : undefined}
          onNext={handleNext}
          isNextDisabled={isNextDisabled()}
          showPrevious={currentStepIndex > 0}
        />
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Save, Edit } from 'lucide-react'
import { api } from '@/apis/axios'
import { MdDescription } from 'react-icons/md'

function PD_OverviewSection({ propertyDetails, onSave }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDescription, setGeneratedDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  
  const generateDescription = async () => {
    setIsGenerating(true)

    try {
      // This is a mock API call - replace with your actual AI endpoint
      const response = await  api.post('/property/onboarding/generate-description', {
      
        body: JSON.stringify({
          propertyDetails: propertyDetails, // You can pass more context here
        }),
      })
      console.log(response)
      setGeneratedDescription(response?.data?.response)
      setIsEditing(true)
    } catch (error) {
      console.error('Error generating description:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    onSave?.(generatedDescription)
    setIsEditing(false)
  }

  if (!propertyDetails?.property_details?.description && !generatedDescription && !isEditing) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center space-y-4">
          <p className="text-gray-600">
            No description available. Would you like to generate one using AI?
          </p>
          <Button
            id="generate-description-btn"
            onClick={generateDescription}
            disabled={isGenerating}
            className=" rounded-md bg-gradient-to-br from-blue-900 to-orange-700 hover:from-blue-800 hover:to-orange-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 " />
                Generate Description with AI
              </>
            )}
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Overview</h2>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={generatedDescription || propertyDetails?.property_details?.description}
            onChange={(e) => setGeneratedDescription(e.target.value)}
            className="min-h-[200px] text-gray-600"
            placeholder="Enter property description..."
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setGeneratedDescription('')
              }}
            >
              Cancel
            </Button>
            <Button
                onClick={handleSave}
                disabled={isGenerating}
                className="bg-gradient-to-br from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600"
                id="generate-description-btn"
                >
                {isGenerating ? (
                    <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                    </>
                    
                ) : (
                    <>
                    <MdDescription className="w-4 h-4" />
                    Save Description
                    </>
                )}
                </Button>

          </div>
        </div>
      ) : (
        <p className="text-gray-600 whitespace-pre-line">
          {propertyDetails?.property_details?.description || generatedDescription}
        </p>
      )}
    </section>
  )
}

export default PD_OverviewSection


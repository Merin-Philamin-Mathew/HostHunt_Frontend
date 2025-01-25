import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'sonner'
import { createIdentityVerification_action } from '@/features/Profile/ProfileAction'

// Validation schema
const VerificationSchema = Yup.object().shape({
  identity_card: Yup.string().required('ID type is required'),
  identity_proof_number: Yup.string().required('ID number is required'),
  identity_card_front_img: Yup.mixed().required('Front image is required'),
  identity_card_back_img: Yup.mixed().required('Back image is required')
})

export default function VerificationModal({ open, onClose }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = await createIdentityVerification_action(values,setSubmitting,setIsLoading,onClose)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verify Your Identity</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            identity_card: '',
            identity_proof_number: '',
            identity_card_front_img: null,
            identity_card_back_img: null
          }}
          validationSchema={VerificationSchema}
          onSubmit={handleSubmit}
        >
          {({ 
            values, 
            errors, 
            touched, 
            setFieldValue, 
            isSubmitting 
          }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identity_card">Identity Card Type</Label>
                <Field name="identity_card">
                  {({ field }) => (
                    <Select 
                      {...field}
                      onValueChange={(value) => setFieldValue('identity_card', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="pan">PAN Card</SelectItem>
                        <SelectItem value="driving_license">Driving License</SelectItem>
                        <SelectItem value="voter_id">Voter ID</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                {errors.identity_card && touched.identity_card && (
                  <div className="text-red-500 text-sm">{errors.identity_card}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="identity_proof_number">ID Number</Label>
                <Field
                  name="identity_proof_number"
                  as={Input}
                  required
                />
                {errors.identity_proof_number && touched.identity_proof_number && (
                  <div className="text-red-500 text-sm">{errors.identity_proof_number}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Front Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      setFieldValue('identity_card_front_img', file)
                    }}
                  />
                  {values.identity_card_front_img && (
                    <img 
                      src={
                        values.identity_card_front_img instanceof File 
                          ? URL.createObjectURL(values.identity_card_front_img)
                          : values.identity_card_front_img
                      }
                      alt="Front Image" 
                      className="h-10 w-10 object-cover"
                    />
                  )}
                </div>
                {errors.identity_card_front_img && touched.identity_card_front_img && (
                  <div className="text-red-500 text-sm">{errors.identity_card_front_img}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Back Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      setFieldValue('identity_card_back_img', file)
                    }}
                  />
                  {values.identity_card_back_img && (
                    <img 
                      src={
                        values.identity_card_back_img instanceof File 
                          ? URL.createObjectURL(values.identity_card_back_img)
                          : values.identity_card_back_img
                      }
                      alt="Back Image" 
                      className="h-10 w-10 object-cover"
                    />
                  )}
                </div>
                {errors.identity_card_back_img && touched.identity_card_back_img && (
                  <div className="text-red-500 text-sm">{errors.identity_card_back_img}</div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Submitting...' : 'Submit verification'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
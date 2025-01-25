import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { profileUpdation } from '@/features/Profile/ProfileAction'

// Validation Schema
const ProfileValidationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  date_of_birth: Yup.date().nullable(),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender'),
  about_me: Yup.string().max(500, 'About me must be at most 500 characters'),
  description_as_host: Yup.string().max(500, 'Host description must be at most 500 characters'),
  address: Yup.string().required('Address is required')
})

export default function ProfileEditModal({ open, onClose }) {
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    console.log(values,'values from profile ')
    const response = await profileUpdation(values)
    console.log(response, 'response from backend')
    dispatch(setProfile(response))
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            phone_number: '',
            date_of_birth: '',
            gender: '',
            about_me: '',
            description_as_host: '',
            address: ''
          }}
          validationSchema={ProfileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="text-red-500 text-sm">{errors.phone_number}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={values.date_of_birth}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Field name="gender">
                  {({ field }) => (
                    <Select 
                      {...field} 
                      onValueChange={(value) => handleChange({ target: { name: 'gender', value }})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about_me">About Me</Label>
                <Textarea
                  id="about_me"
                  name="about_me"
                  value={values.about_me}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.about_me && touched.about_me && (
                  <div className="text-red-500 text-sm">{errors.about_me}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_as_host">Description as Host</Label>
                <Textarea
                  id="description_as_host"
                  name="description_as_host"
                  value={values.description_as_host}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.description_as_host && touched.description_as_host && (
                  <div className="text-red-500 text-sm">{errors.description_as_host}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-sm">{errors.address}</div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from 'lucide-react'

export default function VerificationModal({ open, onClose }) {
    const [verification, setVerification] = useState('')

  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
    identity_card: '',
    identity_proof_number: '',
    identity_card_front_img_url: '',
    identity_card_back_img_url: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setVerification(formData)
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verify Your Identity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identity_card">Identity Card Type</Label>
            <Select 
              name="identity_card" 
              value={formData.identity_card}
              onValueChange={(value) => handleChange({ target: { name: 'identity_card', value }})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="pan">PAN Card</SelectItem>
                <SelectItem value="driving_license">Driving License</SelectItem>
                <SelectItem value="voter_id">Voter ID</SelectItem>
                <SelectItem value="social_security">Social Security Card</SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="residence_permit">Residence Permit</SelectItem>
                <SelectItem value="identity_card">Identity Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="identity_proof_number">ID Number</Label>
            <Input
              id="identity_proof_number"
              name="identity_proof_number"
              value={formData.identity_proof_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Front Image URL</Label>
            <div verifyIdentityclassName="flex gap-2">
              <Input
                name="identity_card_front_img_url"
                value={formData.identity_card_front_img_url}
                onChange={handleChange}
                placeholder="https://example.com/front.jpg"
                required
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Back Image URL</Label>
            <div className="flex gap-2">
              <Input
                name="identity_card_back_img_url"
                value={formData.identity_card_back_img_url}
                onChange={handleChange}
                placeholder="https://example.com/back.jpg"
                required
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit verification</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


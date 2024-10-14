import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { api } from '../../../apis/axios';
import URLS from '../../../apis/urls';
import { toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router';

const DocumentsForm = () => {
  const [images, setImages] = useState([]); // manage image uploads
  const maxNumber = 5; // maximum images to be uploaded
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      const propertyId = localStorage.getItem('property_id'); // Get property ID from local storage
  
      // Add images to formData when submitting
      images.forEach((image, index) => {
        formData.append('files', image.file);  // Sending as files array
      });
  
      formData.append('property_id', propertyId); // Add property ID to formData
  
      const response = await api.post(URLS.NEWLISTING['documents'], formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response data:', response.data);
 
    let docs = localStorage.getItem('property_docs');
    let currentDocsCount = docs ? parseInt(docs, 10) : 0;
    localStorage.setItem('property_docs', currentDocsCount + images.length);
    
      navigate('/host/new-listing/finish')
      toast.success('Documents uploaded successfully!');
    } catch (e) {
      console.error('Error uploading documents:', e);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleFormSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">
          <h2 className="text-2xl font-bold">Verify Your Property</h2>
          <p className="text-gray-600">
            Please upload the necessary images for verification below.
          </p>

          <label htmlFor="property_license" className="block  font-heading font-semibold">Property License</label>

            <div className='text-gray-600'>

              Property License, business registration, or permit for your city as proof that you are able to operate as a business from this address.

            </div>
<label htmlFor="proof_of_address" className="block font-heading font-semibold">Proof of Address</label>

            <div className='text-gray-600'>

              Utility bill (gas, electricity, water), tax documents, local government documents, etc.

            </div>
          {/* Drag-and-Drop Image Upload */}
          <div className=''>
            <ImageUploading
              multiple
              value={images}
              onChange={(imageList) => setImages(imageList)} // Update state on change
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors: imageErrors
              }) => (
                <div className="upload__image-wrapper">
                  <div className='flex justify-center items-baseline mb-5'>
                    <button
                      type="button" // Prevent this button from triggering form submit
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                      className="px-4 py-2 mt-4 bg-themeColor text-white font-accent rounded-md shadow-md hover:opacity-90"
                    >
                      {isDragging ? 'Drop here' : 'Click or Drop images'}
                    </button>
                  </div>

                  <div className="flex justify-center mt-4">
                    {/* Displaying uploaded images */}
                    <div className="image-preview grid grid-cols-5 p-10 border bg-muted_bg shadow-xl gap-6">
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" className="w-24 h-24 object-cover" />
                          <div className="image-item__btn-wrapper flex mt-1">
                            <button 
                              type="button" // Ensure image update button does not submit form
                              onClick={() => onImageUpdate(index)} 
                              className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md">
                              Update
                            </button>
                            <button 
                              type="button" // Ensure remove button does not submit form
                              onClick={() => onImageRemove(index)} 
                              className="ml-1 px-2 py-1 text-xs bg-red-500 text-white rounded-md">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex justify-center items-end mt-5'>
                    <button 
                      type="button" // Prevent the Remove All button from submitting the form
                      onClick={onImageRemoveAll} 
                      className="ml-2 px-4 py-2 flex items-center text-block rounded-md ">
                      <MdDelete /> Remove All
                    </button>
                  </div>

                  {/* Image validation error messages */}
                  {imageErrors && (
                    <div className="text-red-500 mt-2 flex justify-center">
                      {imageErrors.maxNumber && <span>Number of selected images exceeds the limit</span>}
                      {imageErrors.acceptType && <span>Unsupported file type</span>}
                      {imageErrors.maxFileSize && <span>File size exceeds the limit</span>}
                      {imageErrors.resolution && <span>Image resolution does not match</span>}
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>

          <button type="submit" className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-md shadow-md hover:opacity-90">
            Submit Images
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DocumentsForm;

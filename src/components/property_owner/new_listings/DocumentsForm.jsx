  import React, { useEffect, useState } from 'react';
  import { Formik, Form } from 'formik';
  import { api } from '../../../apis/axios';
  import URLS from '../../../apis/urls';
  import { toast } from 'react-toastify';
  import ImageUploading from 'react-images-uploading';
  import { MdDelete } from "react-icons/md";
  import { useNavigate } from 'react-router';

  const DocumentsForm = () => {
    const [images, setImages] = useState([]);
    const [doc_urls, setDocUrls] = useState([]); 
    const [canDisplayForm, setCanDisplayForm] = useState(false);
    const maxNumber = 5; 
    const navigate = useNavigate();

    useEffect(() => {
      const storedPropertyId = localStorage.getItem('property_id');

      if (storedPropertyId) {
        setCanDisplayForm(true); 
      }
    }, []);
    const handleFormSubmit = async () => {
      if (images.length < 2) {
        toast.error("Please upload at least two documents (property ownership/license and proof of address).");
        return;
      }

      try {
        const formData = new FormData();
        const propertyId = localStorage.getItem('property_id'); 
        
        images.forEach((image, index) => {
          formData.append('files', image.file);  
        });
    
        formData.append('property_id', propertyId)
    
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
        toast.error(e.response.data.error);
      }
    };
    

    return (
      <>
        {canDisplayForm ? (
      
      <Formik
        initialValues={{}}
        onSubmit={handleFormSubmit}
      >
        {({isSubmitting}) => (
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
            <div className=''>
              <ImageUploading
                multiple
                value={images}
                onChange={(imageList) => setImages(imageList)} 
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
                      {/* I encountered a problem here, these delete and update button were acting as submit button and
                      by that the form was getting submitted, solved by giving type botton */}
                      <div className="image-preview grid grid-cols-5 p-10 border  shadow-xl gap-6">
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" className="w-24 h-24 object-cover" />
                            <div className="image-item__btn-wrapper flex mt-1">
                              <button 
                                type="button"
                                onClick={() => onImageUpdate(index)} 
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md">
                                Update
                              </button>
                              <button 
                                type="button"
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
                        type="button"
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

            <button 
        type="submit" 
        disabled={isSubmitting}
        className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-md shadow-md hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Submit Images'}
      </button>
          </Form>
        )}
      </Formik>
    ) : (
          <div className="p-4 md:p-8 bg-white rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-red-600">Incomplete Form</h2>
            <p>Please complete all steps of the property form </p>
          </div>
        )}
      </>
    );
  };

  export default DocumentsForm;

import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import ImageUploading from 'react-images-uploading';
import { CircleX, Edit, Trash2 } from 'lucide-react';
import { RiImageAddFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setRoomImages } from '../../../../features/Property/PropertySlice';

function AddingRoomImages() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.property.RoomImages); // Access images from Redux store
  const maxNumber = 5;

  // Update Redux when images array changes
  const handleImageChange = (imageList) => {
    dispatch(setRoomImages(imageList));
  };

  return (
    <Formik
      initialValues={{}}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">
          <h2 className="text-2xl font-bold">Add Room Images</h2>
          <p className="text-gray-600">
            Upload high-quality images of your rooms to showcase them to potential guests. You can add up to {maxNumber} images.
          </p>

          <div>
            <ImageUploading
              multiple
              value={images} // Bind to Redux state
              onChange={handleImageChange} // Dispatch changes to Redux
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
                errors: imageErrors,
              }) => (
                <div className="upload__image-wrapper">
                  <div className="mt-4">
                    <div
                      className="image-preview flex flex-wrap justify-center md:p-10 gap-6 mt-4 pb-10 md:pb-14 relative"
                      style={isDragging ? { color: 'green' } : undefined}
                      {...dragProps}
                    >
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item relative w-24 h-24 mt-3">
                          <img src={image['data_url']} alt="" className="w-full h-full object-cover rounded-md" />

                          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 bg-black/50 transition-opacity duration-300 rounded-md">
                            <button
                              type="button"
                              onClick={() => onImageUpdate(index)}
                              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onImageRemove(index)}
                              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="upload__image-wrapper mx-8">
                        <button
                          className="upload__button flex flex-col items-center text-xs "
                          type="button"
                          onClick={onImageUpload}
                        >
                          <RiImageAddFill className="min-w-16 min-h-16 text-gray-300" />
                          {isDragging ? 'Drop here' : 'Click or Drop images'}
                        </button>
                      </div>
                    </div>

                    {imageList.length > 0 && (
                      <div className="flex justify-center items-end">
                        <button
                          type="button"
                          onClick={onImageRemoveAll}
                          className="ml-2 px-4 py-1 flex items-center bg-gradient-to-tr to-gray-100 from-gray-300 text-red-600 rounded-sm"
                        >
                          Clear All
                          <CircleX className="w-4 h-4 mx-1" />
                        </button>
                      </div>
                    )}
                  </div>

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
        </Form>
      )}
    </Formik>
  );
}

export default AddingRoomImages;

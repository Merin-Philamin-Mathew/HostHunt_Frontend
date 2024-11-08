    import React, { useEffect, useState } from 'react';
    import { Formik, Form, Field } from 'formik';
    import * as Yup from 'yup';
  import { handlePolicyAndServicesSubmit_Newlisting } from '../../../features/Property/PropertyActions';
import { useDispatch } from 'react-redux';
import { setDocumentsComplete } from '../../../features/Property/PropertySlice';
import { useNavigate } from 'react-router';

    const validationSchema = Yup.object().shape({
      check_in_time: Yup.string().required('Please specify a check-in time'),
      check_out_time: Yup.string().required('Please specify a check-out time'),
      smoking: Yup.string().required('Please select a smoking policy'),
      min_nights: Yup.number()
        .required('Minimum nights is required')
        .min(1, 'Must be at least 1 night'),
      max_nights: Yup.number()
        .required('Maximum nights is required')
        .min(Yup.ref('min_nights'), 'Maximum nights must be greater than or equal to minimum nights')
        .max(30, 'Cannot exceed 30 nights'),
      caution_deposit: Yup.number()
        .required('Caution deposit is required')
        .min(0, 'Deposit cannot be negative')
        .max(10000, 'Deposit cannot exceed 10,000'),
      child_permit: Yup.boolean(),
      child_from_age: Yup.mixed() // Changed to mixed()
        .when('child_permit', {
          is: true,
          then: () => Yup.number() // Add arrow function here
            .required('From age is required when children are permitted')
            .min(0, 'Age must be 0 or greater')
            .max(18, 'Maximum age should be 18'),
          otherwise: () => Yup.mixed().nullable() // Add arrow function and make it nullable
        }),
      child_to_age: Yup.mixed() // Changed to mixed()
        .when('child_permit', {
          is: true,
          then: () => Yup.number() // Add arrow function here
            .required('To age is required when children are permitted')
            .min(Yup.ref('child_from_age'), 'To age must be greater than from age')
            .max(18, 'Maximum age should be 18'),
          otherwise: () => Yup.mixed().nullable() // Add arrow function and make it nullable
        }),
      curfew: Yup.boolean(),
      curfew_from_time: Yup.mixed() // Changed to mixed()
        .when('curfew', {
          is: true,
          then: () => Yup.string().required('Curfew start time is required'), // Add arrow function
          otherwise: () => Yup.mixed().nullable() // Add arrow function and make it nullable
        }),
      curfew_to_time: Yup.mixed() // Changed to mixed()
        .when('curfew', {
          is: true,
          then: () => Yup.string() // Add arrow function
            .required('Curfew end time is required')
            .test('is-after-start', 'End time must be after start time', function(value) {
              const { curfew_from_time } = this.parent;
              return !curfew_from_time || value > curfew_from_time;
            }),
          otherwise: () => Yup.mixed().nullable() // Add arrow function and make it nullable
        })
    });
    const PropertyPoliciesForm = () => {
      
      const dispatch = useDispatch();
      const navigate = useNavigate()
      const [initialValues, setInitialValues] = useState({
        check_in_time: '',
        check_out_time: '',
        smoking: '',
        pets_permit: false,
        drinking_permit: false,
        gender_restriction: '',
        visitors: true,
        child_permit: false,
        child_from_age: null,
        child_to_age: null,
        curfew: false,
        curfew_from_time: null,
        curfew_to_time: null,
        min_nights: 1,
        max_nights: 30,
        caution_deposit: 0,
      });
    
      useEffect(() => {
        const policiesData = localStorage.getItem('policiesData');
        
        if (policiesData) {
          try {
            const parsedPolicies = JSON.parse(policiesData);
            setInitialValues(prevValues => ({
              ...prevValues,
              ...parsedPolicies
            }));
          } catch (error) {
            console.error('Error parsing policies data from localStorage:', error);
          }
        }
      }, []); 

        const handleSubmit = async (values, { setSubmitting }) => {
          console.log('Submitting form with values:', values);
          const property_id = localStorage.getItem('property_id')
          if (property_id) {
            values.property_id = property_id; 
          }
            await handlePolicyAndServicesSubmit_Newlisting(values, setSubmitting, dispatch, navigate )
        };
        

      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} 
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-6 p-4 md:p-8 rounded-3xl bg-white shadow-xl">
              <div className="grid gap-6 xl:grid-cols-2">
                {/* Check-in Time */}
                <div>
                  <label htmlFor="check_in_time" className="block text-h5 font-heading">
                    Check-in Time
                  </label>
                  <Field
                    type="time"
                    name="check_in_time"
                    className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                  />
                  {errors.check_in_time && touched.check_in_time && (
                    <div className="text-error text-small">{errors.check_in_time}</div>
                  )}
                </div>

                {/* Check-out Time */}
                <div>
                  <label htmlFor="check_out_time" className="block text-h5 font-heading">
                    Check-out Time
                  </label>
                  <Field
                    type="time"
                    name="check_out_time"
                    className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                  />
                  {errors.check_out_time && touched.check_out_time && (
                    <div className="text-error text-small">{errors.check_out_time}</div>
                  )}
                </div>

                {/* Smoking Policy */}
                <div>
                  <label htmlFor="smoking" className="block text-h5 font-heading">
                    Smoking Policy
                  </label>
                  <Field
                    as="select"
                    name="smoking"
                    className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                  >
                    <option value="">Select Smoking Policy</option>
                    <option value="yes">Allowed</option>
                    <option value="no">Not Allowed</option>
                    <option value="designated">Designated Areas Only</option>
                  </Field>
                  {errors.smoking && touched.smoking && (
                    <div className="text-error text-small">{errors.smoking}</div>
                  )}
                </div>

                {/* Gender Restriction */}
                <div>
                  <label htmlFor="gender_restriction" className="block text-h5 font-heading">
                    Gender Restriction
                  </label>
                  <Field
                    as="select"
                    name="gender_restriction"
                    className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                  >
                    <option value="">Select Gender Restriction</option>
                    <option value="no_restriction">No Restriction</option>
                    <option value="male_only">Male Only</option>
                    <option value="female_only">Female Only</option>
                  </Field>
                  {errors.gender_restriction && touched.gender_restriction && (
                    <div className="text-error text-small">{errors.gender_restriction}</div>
                  )}
                </div>

              {/* Minimum Nights */}
              <div>
                <label htmlFor="min_nights" className="block text-h5 font-heading">
                  Minimum Nights
                </label>
                <Field
                  type="number"
                  name="min_nights"
                  className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                />
                {errors.min_nights && touched.min_nights && (
                  <div className="text-error text-small">{errors.min_nights}</div>
                )}
              </div>

              {/* Maximum Nights */}
              <div>
                <label htmlFor="max_nights" className="block text-h5 font-heading">
                  Maximum Nights
                </label>
                <Field
                  type="number"
                  name="max_nights"
                  className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                />
                {errors.max_nights && touched.max_nights && (
                  <div className="text-error text-small">{errors.max_nights}</div>
                )}
              </div>

              {/* Caution Deposit */}
              <div>
                <label htmlFor="caution_deposit" className="block text-h5 font-heading">
                  Caution Deposit
                </label>
                <Field
                  type="number"
                  name="caution_deposit"
                  className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                />
                {errors.caution_deposit && touched.caution_deposit && (
                  <div className="text-error text-small">{errors.caution_deposit}</div>
                )}
              </div>

              {/* Toggle Sections */}
              <div className="xl:col-span-2 space-y-4">
                {/* Pets Permit */}
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <label className="text-h5 font-heading">Allow Pets</label>
                  <Field
                    type="checkbox"
                    name="pets_permit"
                    className="form-checkbox h-5 w-5 text-themeColor2 rounded"
                  />
                </div>

                {/* Drinking Permit */}
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <label className="text-h5 font-heading">Allow Drinking</label>
                  <Field
                    type="checkbox"
                    name="drinking_permit"
                    className="form-checkbox h-5 w-5 text-themeColor2 rounded"
                  />
                </div>

                {/* Visitors */}
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <label className="text-h5 font-heading">Allow Visitors</label>
                  <Field
                    type="checkbox"
                    name="visitors"
                    className="form-checkbox h-5 w-5 text-themeColor2 rounded"
                  />
                </div>

                {/* Child Permit Section */}
                <div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <label className="text-h5 font-heading">Allow Children</label>
                    <Field
                      type="checkbox"
                      name="child_permit"
                      className="form-checkbox h-5 w-5 text-themeColor2 rounded"
                    />
                  </div>

                  {values.child_permit && (
                    <div className="grid xl:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="child_from_age" className="block text-h5 font-heading">
                          From Age
                        </label>
                        <Field
                          type="number"
                          name="child_from_age"
                          className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                        />
                        {errors.child_from_age && touched.child_from_age && (
                          <div className="text-error text-small">{errors.child_from_age}</div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="child_to_age" className="block text-h5 font-heading">
                          To Age
                        </label>
                        <Field
                          type="number"
                          name="child_to_age"
                          className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                        />
                        {errors.child_to_age && touched.child_to_age && (
                          <div className="text-error text-small">{errors.child_to_age}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Curfew Section */}
                <div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <label className="text-h5 font-heading">Enable Curfew</label>
                    <Field
                      type="checkbox"
                      name="curfew"
                      className="form-checkbox h-5 w-5 text-themeColor2 rounded"
                    />
                  </div>

                  {values.curfew && (
                    <div className="grid xl:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="curfew_from_time" className="block text-h5 font-heading">
                          Curfew Start Time
                        </label>
                        <Field
                          type="time"
                          name="curfew_from_time"
                          className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                        />
                        {errors.curfew_from_time && touched.curfew_from_time && (
                          <div className="text-error text-small">{errors.curfew_from_time}</div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="curfew_to_time" className="block text-h5 font-heading">
                          Curfew End Time
                        </label>
                        <Field
                          type="time"
                          name="curfew_to_time"
                          className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-themeColor2 focus:outline-none shadow-md rounded-xl"
                        />
                        {errors.curfew_to_time && touched.curfew_to_time && (
                          <div className="text-error text-small">{errors.curfew_to_time}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2 mt-4 bg-themeColor text-white font-accent rounded-xl shadow-md hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Policies'}
            </button>
          </Form>
        )}
      </Formik>
    );
  };

  export default PropertyPoliciesForm;
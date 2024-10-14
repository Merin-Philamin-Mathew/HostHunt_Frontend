import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useFormik } from 'formik';

const PoliciesServicesForm = () => {
  const formik = useFormik({
    initialValues: {
      advance_booking_days: 'anytime',
      min_nights: 1,
      max_nights: 30,
      cancellation_days: 0,
      free_cancellation: true,
      check_in_from: '00:00',
      check_in_to: '03:00',
      check_out_from: '00:00',
      check_out_to: '14:00',
      allow_children: false,
      allow_pets: false,
      curfew: false,
      smoking: 'no',
    },
    onSubmit: (values) => {
      console.log('Form data:', values);
      // Add form submission logic here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Policies</h2>

      {/* Booking in Advance */}
      <div className="mb-4">
        <label className="block text-sm font-medium">How many days in advance can a guest book your property?</label>
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="advance_booking_days" value="anytime" 
              onChange={formik.handleChange} checked={formik.values.advance_booking_days === 'anytime'} />
            Anytime
          </label>
          <label>
            <input type="radio" name="advance_booking_days" value="1_day" 
              onChange={formik.handleChange} checked={formik.values.advance_booking_days === '1_day'} />
            1 day in advance
          </label>
          <label>
            <input type="radio" name="advance_booking_days" value="2_days" 
              onChange={formik.handleChange} checked={formik.values.advance_booking_days === '2_days'} />
            2 days in advance
          </label>
        </div>
      </div>

      {/* Min and Max Nights */}
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-sm font-medium">Minimum and maximum nights a guest can stay</label>
        <div className="flex items-center">
          <button type="button" onClick={() => formik.setFieldValue('min_nights', Math.max(1, formik.values.min_nights - 1))}>
            <FaMinus />
          </button>
          <input type="number" name="min_nights" value={formik.values.min_nights} 
            onChange={formik.handleChange} className="w-16 text-center mx-2" />
          <button type="button" onClick={() => formik.setFieldValue('min_nights', formik.values.min_nights + 1)}>
            <FaPlus />
          </button>
          <span className="mx-4">to</span>
          <input type="number" name="max_nights" value={formik.values.max_nights} 
            onChange={formik.handleChange} className="w-16 text-center mx-2" />
        </div>
      </div>

      {/* Cancellation Period */}
      <div className="mb-4">
        <label className="block text-sm font-medium">How many days before check-in can guests cancel free of charge?</label>
        <div className="flex items-center">
          <button type="button" onClick={() => formik.setFieldValue('cancellation_days', Math.max(0, formik.values.cancellation_days - 1))}>
            <FaMinus />
          </button>
          <input type="number" name="cancellation_days" value={formik.values.cancellation_days} 
            onChange={formik.handleChange} className="w-16 text-center mx-2" />
          <button type="button" onClick={() => formik.setFieldValue('cancellation_days', formik.values.cancellation_days + 1)}>
            <FaPlus />
          </button>
          <label className="ml-4">
            <input type="checkbox" name="free_cancellation" checked={formik.values.free_cancellation} 
              onChange={formik.handleChange} />
            No free cancellation
          </label>
        </div>
      </div>

      {/* Check-in and Check-out */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Check-in time</label>
        <div className="flex space-x-4">
          <input type="time" name="check_in_from" value={formik.values.check_in_from} onChange={formik.handleChange} />
          <input type="time" name="check_in_to" value={formik.values.check_in_to} onChange={formik.handleChange} />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Check-out time</label>
        <div className="flex space-x-4">
          <input type="time" name="check_out_from" value={formik.values.check_out_from} onChange={formik.handleChange} />
          <input type="time" name="check_out_to" value={formik.values.check_out_to} onChange={formik.handleChange} />
        </div>
      </div>

      {/* Allow Children */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Do you allow children in your property?</label>
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="allow_children" value="yes" 
              onChange={formik.handleChange} checked={formik.values.allow_children === true} />
            Yes
          </label>
          <label>
            <input type="radio" name="allow_children" value="no" 
              onChange={formik.handleChange} checked={formik.values.allow_children === false} />
            No
          </label>
        </div>
      </div>

      {/* Additional Policies */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Do you allow pets?</label>
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="allow_pets" value="yes" 
              onChange={formik.handleChange} checked={formik.values.allow_pets === true} />
            Yes
          </label>
          <label>
            <input type="radio" name="allow_pets" value="no" 
              onChange={formik.handleChange} checked={formik.values.allow_pets === false} />
            No
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Is smoking allowed?</label>
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="smoking" value="yes_everywhere" 
              onChange={formik.handleChange} checked={formik.values.smoking === 'yes_everywhere'} />
            Yes, Everywhere
          </label>
          <label>
            <input type="radio" name="smoking" value="yes_designated" 
              onChange={formik.handleChange} checked={formik.values.smoking === 'yes_designated'} />
            Yes, Designated Areas
          </label>
          <label>
            <input type="radio" name="smoking" value="no" 
              onChange={formik.handleChange} checked={formik.values.smoking === 'no'} />
            No
          </label>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md">Save Policies</button>
    </form>
  );
};

export default PoliciesServicesForm;

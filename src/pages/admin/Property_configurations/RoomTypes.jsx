import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/utils/cards/Card';
import { Button, Input, Switch } from '@nextui-org/react';
import { Formik, Form as FormikForm, Field } from 'formik';
import { Table } from '../../../components/utils/tables/Table';
import Pagination from '../../../components/utils/pagination/Pagination';
import { useDebounce } from '../../../components/utils/Performance/Debouncing/Debounce';
import {
    Admin_fetchAllRoomTypes,
    Admin_handleDeleteRoomType,
    Admin_handleSaveRoomType,
    Admin_handleUpdateRoomType
} from '../../../redux/admin/adminActions';
import { RoomTypes_InitialValues, RoomTypes_YupSchemas } from './data';



export function RoomTypes() {
  const [isAdding, setIsAdding] = useState(false);
  const [response, setResponse] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(response.count / itemsPerPage) || 1;

  useEffect(() => {
      setLoading(true);
      Admin_fetchAllRoomTypes(setResponse, setLoading, page, debouncedSearchTerm);
      console.log('rooom types.....');
      
  }, [debouncedSearchTerm, page]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSaveRoomType = async (values, { resetForm }) => {
      try {
          await Admin_handleSaveRoomType(values, resetForm);
          setIsAdding(false);
          setSelectedRoomType(null);
          Admin_fetchAllRoomTypes(setResponse, setLoading, page);
      } catch (error) {
          console.error("Error saving room type:", error);
      }
  };

  const handleEditButtonActionRoomType = (roomType) => {
      setIsAdding(true);
      setSelectedRoomType(roomType);
  };

  const handleUpdateRoomType = async (values, { resetForm }) => {
      try {
          if (selectedRoomType && selectedRoomType.id) {
              await Admin_handleUpdateRoomType(selectedRoomType.id, values);
              setIsAdding(false);
              setSelectedRoomType(null);
              resetForm();
              Admin_fetchAllRoomTypes(setResponse, setLoading, page);
          }
      } catch (error) {
          console.error("Error updating room type:", err )
    }
  }
  const handleDeleteRoomType = async (room_type_id) => {
      try {
          const result = await Swal.fire({
              title: 'Delete Room Type?',
              text: "Are you sure you want to remove this room type?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#e76608',
              cancelButtonColor: '#00179',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'Cancel'
          });

          if (result.isConfirmed) {
              await Admin_handleDeleteRoomType(room_type_id);
              Admin_fetchAllRoomTypes(setResponse, setLoading, page);
              Swal.fire('Deleted!', 'Your room type has been deleted.', 'success');
          }
      } catch (error) {
          console.error("Error deleting room type:", error);
          Swal.fire('Error!', 'There was a problem deleting the room type.', 'error');
      }
  };
  const handleToggleFacilityStatus = async (facility) => {
    try {
        const updatedFacility = { ...facility, is_active: !facility.is_active };
        await Admin_handleUpdateRoomType(facility.id, updatedFacility);
        setResponse((prev) => ({
            ...prev,
            results: prev.results.map((item) =>
                item.id === facility.id ? { ...item, is_active: !item.is_active } : item
            ),
        }));
    } catch (error) {
        console.error("Error updating facility status:", error);
    }
};

  const columns = [
      { key: 'room_type_name', label: 'Room Type' },
      {
        key: 'is_active',
        label: 'Active Status',
        render: (row) => (
            <button className={`font-semibold ${row.is_active ? "text-green-800" : "text-red-600"}`}>
                {row.is_active ? "Active" : "Inactive"}
            </button>
        ),
    },
      {
          key: 'action',
          label: 'Action',
          render: (row) => (
              <div className="flex gap-2">
                  <Button isIconOnly variant="light" aria-label="edit" onClick={() => handleEditButtonActionRoomType(row)}>
                      <Edit className="h-4 w-4 text-slate-800" />
                  </Button>
                  <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      aria-label="delete"
                      onClick={() => handleDeleteRoomType(row.id)}
                  >
                      <Trash2 className="h-4 w-4" />
                  </Button>
                  <Switch
                        isSelected={row.is_active} 
                        onChange={() => handleToggleFacilityStatus(row)}
                        name="is_active"
                        size="md"
                    />
              </div>
          ),
      },
  ];

  return (
    <div className="h-full">
        <Card className="h-full bg-slate-500 text-slate-800 flex flex-col">
            <CardHeader variant="p-6">
              <CardTitle className="text-2xl">Room Types</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col flex-grow">
                    <div className="flex-grow overflow-y-auto mb-4">             
                       {loading ? (
                  <div className="flex justify-center items-center h-96 ">
                      <p className="text-xl text-gray-300 mb-10">Loading...</p>
                  </div>
              ) : (
                  <>
                      <div className="flex justify-between items-center mb-4">
                          <Input
                              className="max-w-md"
                              placeholder="Search room types..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                          />
                          <Button
                              className="bg-gray-400"
                              onClick={() => { setIsAdding(!isAdding); setSelectedRoomType(null); }}
                          >
                              <Plus className="h-4 w-4" /> Add New Room Type
                          </Button>
                      </div>

                      {isAdding && (
                          <Card className="border-slate-600 p-6 bg-slate-700">
                              <CardHeader variant={'adding_form_admin_slate'}>
                                  {selectedRoomType ? "Edit Room Type" : "Add New Room Type"}
                              </CardHeader>
                              <Formik
                              enableReinitialize
                                  initialValues={selectedRoomType || RoomTypes_InitialValues}
                                  validationSchema={RoomTypes_YupSchemas}
                                  onSubmit={selectedRoomType ? handleUpdateRoomType : handleSaveRoomType}
                              >
                                  {({ values, handleChange, errors, touched }) => (
                                      <FormikForm className="mb-6">
                                          <div className="grid grid-cols-2 gap-4 mb-4">
                                              <div>
                                                  <Input
                                                      label="Room Type Name"
                                                      placeholder="Enter room type name..."
                                                      name="room_type_name"
                                                      value={values.room_type_name}
                                                      onChange={handleChange}
                                                      className="max-w-md"
                                                      size="sm"
                                                      isInvalid={touched.room_type_name && !!errors.room_type_name}
                                                      errorText={errors.room_type_name}
                                                  />
                                              </div>
                                              <div>
                                                            <Switch
                                                                isSelected={values.is_active}
                                                                onChange={handleChange}
                                                                name="is_active"
                                                                size="md"
                                                            >
                                                                <div className="text-slate-300 text-sm">Is Active</div>
                                                            </Switch>
                                                        </div>
                                          </div>
                                          <Button type="submit" className="mt-4 bg-gray-400 text-slate-800">
                                              {selectedRoomType ? "Update Room Type" : "Save Room Type"}
                                          </Button>
                                      </FormikForm>
                                  )}
                              </Formik>
                              </Card>
                                )}

                                {response.count === 0 ? (
                                     <div className="flex justify-center items-center ">
                                     <p className="text-xl text-gray-300 mb-10">No Room Types have added yet...</p>
                                 </div>
                                ) : (
                                    <Table data={response.results} columns={columns} />
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-auto flex justify-center pt-3 pb-2">
                    <Pagination
                                      currentPage={page}
                                      totalPages={totalPages}
                                      onPageChange={(newPage) => setPage(newPage)}
                                      button='bg-gradient-to-l from-gray-600 to-slate-700 rounded-xl text-gray-300'
                                      off_button='bg-gradient-to-tl from-gray-600 to-slate-400 rounded-xl text-slate-100'
                                      arrow_btn='text-slate-300'
                                  />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
 }


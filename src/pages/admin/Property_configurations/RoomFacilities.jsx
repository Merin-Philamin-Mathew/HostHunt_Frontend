import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/utils/cards/Card';
import { Button, Input, Switch } from '@nextui-org/react';
import { Formik, Form as FormikForm } from 'formik';
import { Table } from '../../../components/utils/tables/Table';
import { RoomFacilities_InitialValues, RoomFacilities_YupSchemas } from './data';
import {
    Admin_fetchAllRoomFacilities,
    Admin_handleDeleteRoomFacility,
    Admin_handleSaveRoomFacility,
    Admin_handleUpdateRoomFacility
} from '../../../redux/admin/adminActions';
import Pagination from '../../../components/utils/pagination/Pagination';
import { useDebounce } from '../../../components/utils/Performance/Debouncing/Debounce';

export function RoomFacilities() {
    const [isAdding, setIsAdding] = useState(false);
    const [response, setResponse] = useState({ results: [], count: 0 });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 500);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(response.count / itemsPerPage) || 1;

    useEffect(() => {
        setLoading(true);
        Admin_fetchAllRoomFacilities(setResponse, setLoading, page, debouncedSearchTerm);
    }, [debouncedSearchTerm, page]);
    
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    
    const handleSaveRoomFacility = async (values, { resetForm }) => {
        try {
            await Admin_handleSaveRoomFacility(values, resetForm);
            setIsAdding(false);
            setSelectedFacility(null);
            Admin_fetchAllRoomFacilities(setResponse, setLoading, page);
        } catch (error) {
            console.error("Error saving room facility:", error);
        }
    };

    const handleEditButtonActionFacility = async (facility) => {
        setIsAdding(false);
        setSelectedFacility(facility);
        setIsAdding(true);
    };

    const handleUpdateRoomFacility = async (values, { resetForm }) => {
        try {
            if (selectedFacility && selectedFacility.id) {
                await Admin_handleUpdateRoomFacility(selectedFacility.id, values);
                setIsAdding(false);
                setSelectedFacility(null);
                resetForm();
                Admin_fetchAllRoomFacilities(setResponse, setLoading, page);
            }
        } catch (error) {
            console.error("Error updating room facility:", error);
        }
    };

    const handleToggleFacilityStatus = async (facility) => {
        try {
            const updatedFacility = { ...facility, is_active: !facility.is_active };
            await Admin_handleUpdateRoomFacility(facility.id, updatedFacility);
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

    const handleDeleteFacility = async (facility_id) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Facility?',
                text: "Are you sure you want to remove this facility?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e76608',
                cancelButtonColor: '#00179',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                await Admin_handleDeleteRoomFacility(facility_id);
                Admin_fetchAllRoomFacilities(setResponse, setLoading, page);
                Swal.fire('Deleted!', 'Your facility has been deleted.', 'success');
            }
        } catch (error) {
            console.error("Error deleting facility:", error);
            Swal.fire('Error!', 'There was a problem deleting the facility.', 'error');
        }
    };

    const columns = [
        { key: 'facility_name', label: 'Facility Name' },
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
                    <Button isIconOnly variant="light" aria-label="edit" onClick={() => handleEditButtonActionFacility(row)}>
                        <Edit className="h-4 w-4 text-slate-800" />
                    </Button>
                    <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        aria-label="delete"
                        onClick={() => handleDeleteFacility(row.id)}
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
                    <CardTitle className="text-2xl">Room Facilities</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                        {loading ? (
                            <div className="flex-grow overflow-y-auto mb-4">
                                
                                <div className="flex justify-center items-center ">
                                    <p className="text-xl text-gray-300 mb-10">Loading...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                            <div className="flex-grow overflow-y-auto mb-4">
                        
                                <div className="flex justify-between items-center mb-4">
                                    <Input
                                        className="max-w-md"
                                        placeholder="Search facilities..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <Button
                                        className="bg-gray-400"
                                        onClick={() => { setIsAdding(!isAdding); setSelectedFacility(null); }}
                                    >
                                        <Plus className="h-4 w-4" /> Add New Facility
                                    </Button>
                                </div>

                                {isAdding && (
                                    <Card className="border-slate-600 p-6 bg-slate-700">
                                        <CardHeader variant={'adding_form_admin_slate'}>
                                            {selectedFacility ? "Edit Facility" : "Add New Facility"}
                                        </CardHeader>
                                        <Formik
                                            initialValues={selectedFacility || RoomFacilities_InitialValues}
                                            validationSchema={RoomFacilities_YupSchemas}
                                            onSubmit={selectedFacility ? handleUpdateRoomFacility : handleSaveRoomFacility}
                                        >
                                            {({ values, handleChange, errors, touched }) => (
                                                <FormikForm className="mb-6">
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <Input
                                                                label="Facility Name"
                                                                placeholder="Enter Facility name..."
                                                                name="facility_name"
                                                                value={values.facility_name}
                                                                onChange={handleChange}
                                                                className="max-w-md"
                                                                size="sm"
                                                                isInvalid={touched.facility_name && !!errors.facility_name}
                                                                errorText={errors.facility_name}
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
                                                        {selectedFacility ? "Update Facility" : "Save Facility"}
                                                    </Button>
                                                </FormikForm>
                                            )}
                                        </Formik>
                                    </Card>
                                )}

                                {response.count === 0 ? (
                                    
                                    <div className=" h-full flex flex-col justify-center">
                                    <div className="flex justify-center items-center mb-8 ">
                                        <p className="text-lg text-gray-300 mb-10">No Facilities added yet</p>
                                    </div>
                                </div>
                                ) : (
                                    <>
                                    <Table data={response.results} columns={columns} />
                                    </>
                                )}

                            </div>
                   
                    </>

                        )}
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

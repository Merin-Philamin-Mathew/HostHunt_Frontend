import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/utils/cards/Card';
import { Button, Input, Switch } from '@nextui-org/react';
import { Formik, Form as FormikForm } from 'formik';
import { Table } from '../../../components/utils/tables/Table';
import { BedTypes_InitialValues, BedTypes_YupSchemas } from './data'; // Replace with your actual initial values and validation schema
import {
    Admin_fetchAllBedTypes,
    Admin_handleDeleteBedType,
    Admin_handleSaveBedType,
    Admin_handleUpdateBedType
} from '../../../redux/admin/adminActions'; // Ensure you have these actions defined
import Pagination from '../../../components/utils/pagination/Pagination';
import { useDebounce } from '../../../components/utils/Performance/Debouncing/Debounce';

 function BedTypes() {
    const [isAdding, setIsAdding] = useState(false);
    const [response, setResponse] = useState({ results: [], count: 0 });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedBedType, setSelectedBedType] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 500);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(response.count / itemsPerPage) || 1;

    useEffect(() => {
        setLoading(true);
        Admin_fetchAllBedTypes(setResponse, setLoading, page, debouncedSearchTerm);
    }, [debouncedSearchTerm, page]);
    
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    
    const handleSaveBedType = async (values, { resetForm }) => {
        try {
            await Admin_handleSaveBedType(values, resetForm);
            setIsAdding(false);
            setSelectedBedType(null);
            Admin_fetchAllBedTypes(setResponse, setLoading, page);
        } catch (error) {
            console.error("Error saving bed type:", error);
        }
    };

    const handleEditButtonActionBedType = (bedType) => {
        setIsAdding(true);
        setSelectedBedType(bedType);
    };

    const handleUpdateBedType = async (values, { resetForm }) => {
        try {
            if (selectedBedType && selectedBedType.id) {
                await Admin_handleUpdateBedType(selectedBedType.id, values);
                setIsAdding(false);
                setSelectedBedType(null);
                resetForm();
                Admin_fetchAllBedTypes(setResponse, setLoading, page);
            }
        } catch (error) {
            console.error("Error updating bed type:", error);
        }
    };

    const handleToggleBedTypeStatus = async (bedType) => {
        try {
            const updatedBedType = { ...bedType, is_active: !bedType.is_active };
            await Admin_handleUpdateBedType(bedType.id, updatedBedType);
            setResponse((prev) => ({
                ...prev,
                results: prev.results.map((item) =>
                    item.id === bedType.id ? { ...item, is_active: !item.is_active } : item
                ),
            }));
        } catch (error) {
            console.error("Error updating bed type status:", error);
        }
    };

    const handleDeleteBedType = async (bedType_id) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Bed Type?',
                text: "Are you sure you want to remove this bed type?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e76608',
                cancelButtonColor: '#00179',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                await Admin_handleDeleteBedType(bedType_id);
                Admin_fetchAllBedTypes(setResponse, setLoading, page);
                Swal.fire('Deleted!', 'Your bed type has been deleted.', 'success');
            }
        } catch (error) {
            console.error("Error deleting bed type:", error);
            Swal.fire('Error!', 'There was a problem deleting the bed type.', 'error');
        }
    };

    const columns = [
        { key: 'bed_type_name', label: 'Bed Type Name' },
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
                    <Button isIconOnly variant="light" aria-label="edit" onClick={() => handleEditButtonActionBedType(row)}>
                        <Edit className="h-4 w-4 text-slate-800" />
                    </Button>
                    <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        aria-label="delete"
                        onClick={() => handleDeleteBedType(row.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Switch
                        isSelected={row.is_active} 
                        onChange={() => handleToggleBedTypeStatus(row)}
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
                    <CardTitle className="text-2xl">Bed Types</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                    {loading ? (
                        <div className="flex-grow overflow-y-auto mb-4">
                            <div className="flex justify-center items-center">
                                <p className="text-xl text-gray-300 mb-10">Loading...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow overflow-y-auto mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <Input
                                        className="max-w-md"
                                        placeholder="Search bed types..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <Button
                                        className="bg-gray-400"
                                        onClick={() => { setIsAdding(!isAdding); setSelectedBedType(null); }}
                                    >
                                        <Plus className="h-4 w-4" /> Add New Bed Type
                                    </Button>
                                </div>

                                {isAdding && (
                                    <Card className="border-slate-600 p-6 bg-slate-700">
                                        <CardHeader variant={'adding_form_admin_slate'}>
                                            {selectedBedType ? "Edit Bed Type" : "Add New Bed Type"}
                                        </CardHeader>
                                        <Formik
                                            initialValues={selectedBedType || BedTypes_InitialValues}
                                            validationSchema={BedTypes_YupSchemas}
                                            onSubmit={selectedBedType ? handleUpdateBedType : handleSaveBedType}
                                        >
                                            {({ values, handleChange, errors, touched }) => (
                                                <FormikForm className="mb-6">
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <Input
                                                                label="Bed Type Name"
                                                                placeholder="Enter Bed type name..."
                                                                name="bed_type_name"
                                                                value={values.bed_type_name}
                                                                onChange={handleChange}
                                                                className="max-w-md"
                                                                size="sm"
                                                                isInvalid={touched.bed_type_name && !!errors.bed_type_name}
                                                                errorText={errors.bed_type_name}
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
                                                        {selectedBedType ? "Update Bed Type" : "Save Bed Type"}
                                                    </Button>
                                                </FormikForm>
                                            )}
                                        </Formik>
                                    </Card>
                                )}

                                {response.count === 0 ? (
                                    <div className="h-full flex flex-col justify-center">
                                        <div className="flex justify-center items-center mb-8">
                                            <p className="text-lg text-gray-300 mb-10">No Bed Types added yet</p>
                                        </div>
                                    </div>
                                ) : (
                                    <Table data={response.results} columns={columns} />
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
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default BedTypes
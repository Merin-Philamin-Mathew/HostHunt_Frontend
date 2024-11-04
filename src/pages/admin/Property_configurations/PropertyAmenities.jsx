import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/utils/cards/Card';
import { Button, Input, Select, SelectItem, Switch } from '@nextui-org/react';
import { Formik, Form as FormikForm, Field } from 'formik';
import { Table } from '../../../components/utils/tables/Table';
import { PropertyAmenities_InitialValues, PropertyAmenities_YupSchemas } from './data';
import { Admin_fetchAllAmenities, Admin_handleDeleteAmenity, Admin_handleSaveAmenity, Admin_handleUpdateAmenity } from '../../../redux/admin/adminActions';
import Pagination from '../../../components/utils/pagination/Pagination';
import { useDebounce } from '../../../components/utils/Performance/Debouncing/Debounce';

const amenityTypes = [
    { key: "general", label: "General" },
    { key: "entertainment", label: "Entertainment" },
    { key: "service", label: "Service" }
];

const amenityIcons = [
    { key: "icon1", label: "Icon 1" },
    { key: "icon2", label: "Icon 2" }
];

export function PropertyAmenities() {
    const [isAdding, setIsAdding] = useState(false);
    const [response, setResponse] = useState({ results: [], count: 0 });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedAmenity, setSelectedAmenity] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 500);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(response.count / itemsPerPage) || 1;

    useEffect(() => {
        setLoading(true);
        Admin_fetchAllAmenities(setResponse, setLoading, page, debouncedSearchTerm);
    }, [debouncedSearchTerm, page]);
    
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    
    
    const handleSaveAmenity = async (values, { resetForm }) => {
        try {
            await Admin_handleSaveAmenity(values, resetForm);
            setIsAdding(false);
            setSelectedAmenity(null);
            Admin_fetchAllAmenities(setResponse, setLoading, page);
        } catch (error) {
            console.error("Error saving amenity:", error);
        }
    };

    const handleEditButtonActionAmenity = async (amenity) => {
        setIsAdding(false);
        setSelectedAmenity(amenity);
        setIsAdding(true);
    };

    const handleUpdateAmenity = async (values, { resetForm }) => {
        try {
            if (selectedAmenity && selectedAmenity.id) {
                await Admin_handleUpdateAmenity(selectedAmenity.id, values);
                setIsAdding(false);
                setSelectedAmenity(null);
                resetForm();
                Admin_fetchAllAmenities(setResponse, setLoading, page);
            }
        } catch (error) {
            console.error("Error updating amenity:", error);
        }
    };

    const handleToggleAmenityStatus = async (amenity) => {
        try {
            const updatedAmenity = { ...amenity, is_active: !amenity.is_active };
            await Admin_handleUpdateAmenity(amenity.id, updatedAmenity);
            setResponse((prev) => ({
                ...prev,
                results: prev.results.map((item) =>
                    item.id === amenity.id ? { ...item, is_active: !item.is_active } : item
                ),
            }));
        } catch (error) {
            console.error("Error updating amenity status:", error);
        }
    };

    const handleDeleteAmenity = async (amenity_id) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Amenity?',
                text: "Are you sure you want to remove this amenity? This action cannot be undone.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e76608',
                cancelButtonColor: '#00179',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                await Admin_handleDeleteAmenity(amenity_id);
                Admin_fetchAllAmenities(setResponse, setLoading, page);
                Swal.fire('Deleted!', 'Your amenity has been deleted.', 'success');
            }
        } catch (error) {
            console.error("Error deleting amenity:", error);
            Swal.fire('Error!', 'There was a problem deleting the amenity.', 'error');
        }
    };

    const columns = [
        { key: 'amenity_name', label: 'Amenity Name' },
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
                    <Button isIconOnly variant="light" aria-label="edit" onClick={() => handleEditButtonActionAmenity(row)}>
                        <Edit className="h-4 w-4 text-slate-800" />
                    </Button>
                    <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        aria-label="delete"
                        onClick={() => handleDeleteAmenity(row.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Switch
                        isSelected={row.is_active} 
                        onChange={() => handleToggleAmenityStatus(row)}
                        name="is_active"
                        size="md"
                    />
                </div>
            ),
        },
    ];

    return (
        <Card className="bg-slate-500 text-slate-800">
            <CardHeader variant="p-6">
                <CardTitle className="text-2xl">Property Amenities</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-xl text-gray-300 mb-10">Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <Input className="max-w-md"
                             placeholder="Search your amenities..."
                             value={searchQuery}  
                             onChange={handleSearchChange}/>
                            <Button className="bg-gray-400" onClick={() => { setIsAdding(!isAdding); setSelectedAmenity(null); }}>
                                <Plus className="h-4 w-4" /> Add New Amenity
                            </Button>
                        </div>

                        {isAdding && (
                            <Card className="border-slate-600 p-6 bg-slate-700">
                                <CardHeader variant={'adding_form_admin_slate'}>
                                {selectedAmenity ? "Edit Amenity" : "Add New Amenity"}
                                </CardHeader>
                                <Formik
                                    initialValues={selectedAmenity || PropertyAmenities_InitialValues}
                                    validationSchema={PropertyAmenities_YupSchemas}
                                    onSubmit={selectedAmenity ? handleUpdateAmenity : handleSaveAmenity}
                                >
                                    {({ values, handleChange, errors, touched }) => (
                                        <FormikForm className="mb-6">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Input
                                                        label="Amenity Name"
                                                        placeholder="Enter Amenity name..."
                                                        name="amenity_name"
                                                        value={values.amenity_name}
                                                        onChange={handleChange}
                                                        className="max-w-md"
                                                        size="sm"
                                                        isInvalid={touched.amenity_name && !!errors.amenity_name}
                                                        errorText={errors.amenity_name}
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
                                                {selectedAmenity ? "Update Amenity" : "Save Amenity"}
                                            </Button>
                                        </FormikForm>
                                    )}
                                </Formik>
                            </Card>
                        )}

                        <Table data={response.results} columns={columns} />
                        <div className="mt-auto flex justify-center pt-3 pb-2">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setPage(newPage)}
                                button='bg-gradient-to-l from-gray-600 to-slate-700 rounded-xl  text-gray-300'
                                off_button='bg-gradient-to-tl from-gray-600 to-slate-400 rounded-xl text-slate-100'
                                arrow='text-slate-700  disabled:opacity-60'
                            />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

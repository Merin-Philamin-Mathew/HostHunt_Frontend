    import React, { useEffect, useState } from 'react';
    import { Plus, Edit, Trash2 } from 'lucide-react';
    import { Card, CardHeader, CardTitle, CardContent } from '../../../components/utils/cards/Card';
    import { Button, Input, Select, SelectItem, Switch } from '@nextui-org/react';
    import { Formik, Form as FormikForm, Field } from 'formik';
    import * as Yup from 'yup';
    import { adminCreateAmenities, adminListAllAmenities } from '../../../redux/admin/adminService';
    import { Table } from '../../../components/utils/tables/Table';

    const amenityTypes = [
        { key: "general", label: "General" },
        { key: "entertainment", label: "Entertainment" },
        { key: "service", label: "Service" }
    ];

    const amenityIcons = [
        { key: "icon1", label: "Icon 1" },
        { key: "icon2", label: "Icon 2" }
    ];
    const columns = [
        // { key: 'id', label: 'ID' },
        // { key: 'serial_no', label: 'Sl. No.', render: (row, index) => index }, // Serial Number column
        { key: 'amenity_name', label: 'Amenity Name' },
        { key: 'is_active', label: 'Active Status',
            render: (row) => (
                <div>
             <button className={`font-semibold ${row.is_active ? "text-green-800" : "text-red-600"}`}>
                {row.is_active ? "Active" : "Inactive"}
            </button>

                </div>
            ),
        },
        {
        key: 'action',
        label: 'Action',
        render: (row) => (
            <div className="flex gap-2">
            <Button isIconOnly color="" variant="light" aria-label="edit">
                <Edit className="h-4 w-4 text-slate-800" />
            </Button>
            <Button isIconOnly color="danger" variant="light" aria-label="delete">
                <Trash2 className="h-4 w-4" />
            </Button>
            <Switch
                defaultSelected={row.is_active} // Replace with actual state if available
                // checked={data.isActive} // Uncomment if you have controlled state
                // onChange={handleChange} // Provide your change handler here
                name="is_active"
                size="md"
            />
            </div>
        ),
        },
    ];
    

    const validationSchema = Yup.object().shape({
        amenity_name: Yup.string().required('Amenity name is required'),
    });

    export function PropertyAmenities() {
        const [isAdding, setIsAdding] = useState(false);
        const [response, setResponse] = useState([]); 
        const [loading, setLoading] = useState(false); 

        useEffect(() => {
        const fetchAllAmenities  = async () => {
            setLoading(true);
            try {  
            const res = await adminListAllAmenities();   
            console.log(' fetching amenities:', res.data);
            setResponse(res?.data);       
            } catch (error) {
            console.error('Error fetching amenities:', error.response.data);
            }
            setLoading(false);
        };
    
        fetchAllAmenities();
        }, []);

        const handleSaveAmenity = async (values, { resetForm }) => {
            try {
                // Call your API to save the amenity here (replace with actual API call)
                console.log(values,'kkkkkkkk')
                await adminCreateAmenities(values);
                console.log("Amenity saved successfully", values);

                // Refresh amenities list or perform any additional actions
                console.log("Amenity saved successfully", values);
                setResponse((prevResponse) => [...prevResponse, values]);

                resetForm();

                setIsAdding(false);
            } catch (error) {
                console.error("Failed to save amenity", error.response.data);
            }
        };

        

        return (
            <Card className="bg-slate-500 text-slate-800">
                <CardHeader variant="p-6">
                    <CardTitle className="text-2xl">Property Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Input className="max-w-md" placeholder="Search your amenities..." />
                        <Button className="bg-gray-400" onClick={() => setIsAdding(!isAdding)}>
                            <Plus className="h-4 w-4" /> Add New Amenity
                        </Button>
                    </div>

                    {isAdding && (
                        <Card className="border-slate-600 p-6 bg-slate-700">
                            <CardHeader variant="adding_form_admin_slate">Adding Amenities</CardHeader>
                            <Formik
                                initialValues={{ amenity_name: '', amenity_type: '', icon: '', is_active: true }}
                                validationSchema={validationSchema}
                                onSubmit={handleSaveAmenity}
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
                                                defaultSelected
                                                    checked={values.is_active}
                                                    onChange={handleChange}
                                                    name="is_active"
                                                    size="md"
                                                >
                                                    <div className="text-slate-300 text-sm">Is Active</div>
                                                </Switch>
                                            </div>
                                        </div>
                                        {/* <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Select
                                                    label="Amenity Type"
                                                    placeholder="Select an amenity type"
                                                    name="amenity_type"
                                                    onChange={(e) => handleChange(e)}
                                                    className="max-w-md"
                                                    size="sm"
                                                    isInvalid={touched.amenity_type && !!errors.amenity_type}
                                                    errorText={errors.amenity_type}
                                                >
                                                    {amenityTypes.map((type) => (
                                                        <SelectItem key={type.key} value={type.key}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <Select
                                                    label="Amenity Icon"
                                                    placeholder="Select an amenity icon"
                                                    name="icon"
                                                    onChange={(e) => handleChange(e)}
                                                    className="max-w-md"
                                                    size="sm"
                                                    isInvalid={touched.icon && !!errors.icon}
                                                    errorText={errors.icon}
                                                >
                                                    {amenityIcons.map((icon) => (
                                                        <SelectItem key={icon.key} value={icon.key}>
                                                            {icon.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div> */}
                                        <Button type="submit" className="mt-4 bg-gray-400 text-slate-800">
                                            Save Amenity
                                        </Button>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Card>
                    )}

                    <Table data={response} columns={columns} />  
            
                </CardContent>
            </Card>
        );
    }

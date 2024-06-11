const handleSubmit = async (values, { setSubmitting }) => {
    try {
        let dataToSend;

        if (isPermition) {
            dataToSend = {
                applicants_position_in_company: "",
                signed_right: false,
                company_national_id: "",
                phone_number: "",
                address: "",
                postal_code: "",
                company_statute_image: "",
                last_ad_changes_image: "",
                company_image: "",

                signatures: signatureInputs.map((_, index) => ({
                    name: values[`name_${index}`],
                    position: values[`position_${index}`],
                    nationalCode: values[`national_code_${index}`],
                    phone: values[`phone_${index}`],
                })),
            };
        } else {
            dataToSend = {
                applicants_position_in_company: "",
                signed_right: false,
                owner_first_signature: "",
                national_code: "",
                company_national_id: "",
                phone_number: "",
                address: "",
                postal_code: "",
                company_statute_image: "",
                last_ad_changes_image: "",
                company_image: "",
            };
        }

        // Send the data to the server
        const response = await axios.post('/your-api-endpoint', dataToSend);
        console.log('Server response:', response.data);

        // Handle success
        alert('Form submitted successfully');
    } catch (error) {
        // Handle error
        console.error('Error submitting the form:', error);
        alert('Error submitting the form');
    } finally {
        setSubmitting(false);
    }
};
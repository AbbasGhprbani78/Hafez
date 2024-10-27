const [editingRowIndex, setEditingRowIndex] = useState(null);

const handleEditRow = (index) => {
    const selectedItem = formik.values.form[index];
    setStatementData({
        customerText: selectedItem.customerText,
        customerAudio: selectedItem.customerAudio,
        customerFile: selectedItem.customerFile,
        expertText: selectedItem.expertText,
        expertFile: selectedItem.expertFile,
        expertAudio: selectedItem.expertAudio,
        estimatedPrice: selectedItem.estimatedPrice,
        estimatedTime: selectedItem.estimatedTime,
    });
    setEditingRowIndex(index);
};

const handleUpdateTable = () => {
    if (editingRowIndex !== null) {
        const updatedForm = [...formik.values.form];
        updatedForm[editingRowIndex] = {
            customerText: statementData.customerText,
            customerAudio: statementData.customerAudio,
            customerFile: statementData.customerFile,
            expertText: statementData.expertText,
            expertFile: statementData.expertFile,
            expertAudio: statementData.expertAudio,
            estimatedPrice: statementData.estimatedPrice,
            estimatedTime: statementData.estimatedTime,
        };

        formik.setFieldValue('form', updatedForm);
        resetForm();
    }
};

// Helper function to reset form and state
const resetForm = () => {
    setStatementData({
        customerText: '',
        customerAudio: null,
        customerFile: null,
        expertText: '',
        expertFile: null,
        expertAudio: null,
        estimatedPrice: '',
        estimatedTime: ''
    });
    setEditingRowIndex(null); // Reset the editing index
};


<TableRow
    key={rowIndex}
    onClick={() => handleEditRow(rowIndex)} // Add this line
    sx={{ border: '1px solid #ddd', fontFamily: "iranYekan" }}
    className='statment-row-table'
>
    {/* Table cell content */}
</TableRow>


<form onSubmit={formik.handleSubmit}>
    {/* Your existing input fields */}
    
    <button 
        type="button" 
        onClick={handleUpdateTable} 
        className="add-estimate-btn mb-3"
        disabled={editingRowIndex === null}
    >
        افزودن به جدول
        <FontAwesomeIcon icon={faPlus} className="plus-btn-2" />
    </button>
    
    <div className="pform3-container-table mt-5" dir="rtl">
        <TableForm columns={columns}>
            {formik.values.form?.map((item, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    onClick={() => handleEditRow(rowIndex)}
                    sx={{ border: '1px solid #ddd', fontFamily: "iranYekan" }}
                    className='statment-row-table'
                >
                    <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                        {item.customerText}
                    </TableCell>
                    {/* Other cells... */}
                </TableRow>
            ))}
        </TableForm>
    </div>

    <div className="p-form-actions pt-3">
        <EditBtn onClick={prevTab} isSubmitting={loading} />
        <ConfirmBtn type="submit" />
    </div>
</form>

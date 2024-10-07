// Handle Image Change coustomer
const handleImageChangeCoustome = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedStatements = formik.values.statements.map((statement) =>
        statement === selectedStatement
            ? { ...statement, customerFile: file }
            : statement
    );

    formik.setFieldValue('statements', updatedStatements);
    setSelectedStatement({ ...selectedStatement, customerFile: file });
};

// Handle Image Deletion coustomer
const handleDeleteImageCoustome = () => {
    const updatedStatements = formik.values.statements.map((statement) =>
        statement === selectedStatement
            ? { ...statement, customerFile: null }  // Remove customerFile (image)
            : statement
    );

    formik.setFieldValue('statements', updatedStatements);
    setSelectedStatement({ ...selectedStatement, customerFile: null });
};


// Handle Audio Deletion coustomer
const handleDeleteAudioCoustome = () => {
    const updatedStatements = formik.values.statements.map((statement) =>
        statement === selectedStatement
            ? { ...statement, customerAudio: null }  // Remove customerAudio
            : statement
    );

    formik.setFieldValue('statements', updatedStatements);
    setSelectedStatement({ ...selectedStatement, customerAudio: null });
};




// Handle Image Change expert
const handleImageChangeExpert = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedStatements = formik.values.statements.map((statement) =>
        statement === selectedStatement
            ? { ...statement, expertFile: file }
            : statement
    );

    formik.setFieldValue('statements', updatedStatements);
    setSelectedStatement({ ...selectedStatement, expertFile: file });
};

// Handle Image Deletion expert
const handleDeleteImageExpert = () => {
    const updatedStatements = formik.values.statements.map((statement) =>
        statement === selectedStatement
            ? { ...statement, expertFile: null }  // Remove expertFile (image)
            : statement
    );

    formik.setFieldValue('statements', updatedStatements);
    setSelectedStatement({ ...selectedStatement, expertFile: null });
};


// Handle Audio Deletion expert
const handleDeleteAudioExpert = () => {
    const updatedStatements = formik.values.statements.map((statement) =>
        statement === selectedStatement
            ? { ...statement, expertAudio: null }  // Remove expertAudio
            : statement
    );

    formik.setFieldValue('statements', updatedStatements);
    setSelectedStatement({ ...selectedStatement, expertAudio: null });
};
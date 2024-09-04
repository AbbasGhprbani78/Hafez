import React, { useEffect, useState } from 'react'
import './pform3.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faFile } from '@fortawesome/free-solid-svg-icons'
import Input from '../../../Modules/Input/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import EditBtn from '../../../Modules/EditBtn/EditBtn';
import ConfirmBtn from '../../../Modules/ConfirmBtn/ConfirmBtn';

export default function Pform3({ formData, updateFormData, nextTab }) {

    const [localData, setLocalData] = useState(formData);

    useEffect(() => {
        updateFormData(localData);
    }, [localData]);

    const handleChange = (e) => {
        setLocalData({
            ...localData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextTab();
    };
    return (
        <div className='pform3-container'>
            <form onSubmit={handleSubmit}>
                <div className='p-form3-content'>
                    <div className='statements-container'>
                        <div className='statements-coustomer'>
                            <span className='statements-title'>
                                اظهارات مشتری
                            </span>
                            <div className='statements-content'>
                                <textarea className='statements-text' placeholder='اظهارات مشتری'>
                                </textarea>
                                <div className='statements-media'>
                                    <div className='media-statements media-voice'>
                                        <FontAwesomeIcon icon={faMicrophone} />
                                    </div>
                                    <div className='media-statements media-file'>
                                        <FontAwesomeIcon icon={faFile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='statements-export'>
                            <span className='statements-title'>
                                اظهارات کارشناس
                            </span>
                            <div className='statements-content'>
                                <textarea className='statements-text' placeholder='اظهارات کارشناس'>
                                </textarea>
                                <div className='statements-media'>
                                    <div className='media-statements media-voice'>
                                        <FontAwesomeIcon icon={faMicrophone} />
                                    </div>
                                    <div className='media-statements media-file'>
                                        <FontAwesomeIcon icon={faFile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='estimate-wrapper mt-4'>
                        <div className='estimate-item'>
                            <div className='estimate-input'>
                                <Input
                                    label={"تخمین قیمت"}
                                    name={"تخمین قیمت"}
                                    placeholder={"تخمین قیمت"}
                                />
                            </div>

                        </div>
                        <div className='mt-3 mt-sm-0 estimate-item'>
                            <div className='estimate-input'>
                                <Input
                                    label={"تخمین زمان تعمیر"}
                                    name={"تخمین زمان تعمیر"}
                                    placeholder={"تخمین زمان تعمیر"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='pform3-container-table mt-5' dir='rtl'>
                        <button className='add-estimate-btn mb-3'>
                            افزودن شرح اظهار
                            <FontAwesomeIcon icon={faPlus} className='plus-btn-2' />
                        </button>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, border: "1px solid #f2f2f2" }} aria-label="simple table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>شرح اظهار</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>توضیحات مشتری</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>توضیحات کارشناس</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow

                                        key={""}
                                        sx={{
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>dgf</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>dfg</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>dfgdf</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={""}
                                        sx={{
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>dfgf</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>dgfd</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>dfgdfgf</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='p-form-actions pt-3'>
                        <EditBtn />
                        <ConfirmBtn type="submit" isSubmitting={""} />
                    </div>
                </div>
            </form>
        </div>
    )
}

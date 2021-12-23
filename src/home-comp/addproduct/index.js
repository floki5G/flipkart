import React, { useState } from 'react'
import Homepage from '../Homepage'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Button } from '@material-ui/core'
import { createProduct } from '../../actions'


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';





export const Addproduct = () => {
    const [diloagopen, diloagsetOpen] = useState(false);
    const [isFile, setFile] = useState([])
    const [open, setOpen] = useState([])
    const [filter, setfilter] = useState([])

    const [data, setData] = useState('')
    const [filData, setFilterdata] = useState()
    const [high, sethighdata] = useState({})
    const [autdata, autsetdata] = useState('')
    const category = useSelector(state => state.createcategory)
    const getproduct = useSelector(state => state.getallproducts)
    const getdata = category.issucces
    const isproducts = getproduct.isget
    const _getproducts = getproduct.products
    console.log(category)
    const dispatch = useDispatch()
    let formData = new FormData()

    const handleClick = (e) => {
        diloagsetOpen(true);
        sethighdata(e)
    }
    const handelCancel = (e) => {
        diloagsetOpen(false);

    }
    const handelChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handeldatachangee = {

        value: data.value,
        descriptionfilter: data.descriptionfilter,
        filterhighlight: filData

    }


    const handleClose = () => {
        setOpen([...open, handeldatachangee])
        diloagsetOpen(false);
    };
    const createCategoryList = (category, _options = []) => {

        for (let _category of category) {
            if (_category.children.length > 0) {

                for (let _categorysub of _category.children) {
                    if (_categorysub.children.length > 0) {

                        for (let _categorysubsub of _categorysub.children) {
                            _options.push({
                                value: _categorysubsub._id,
                                name: _categorysubsub.name,
                                parentId: _categorysubsub.parentId,
                            })
                        }

                    }

                }

            }
            
        }
        return _options;
    }
    console.log(open)

    const handleFile = (e) => {
        setFile([
            ...isFile,
            e.target.files[0]
        ])
    }


    // const _highlight = (event) => {
    //     const highlightdata = []
    //     if (getdata == true) {
    //         const list = category.highlight.filter((e) => e.category == autdata.parentId)
    //         if (list[0]) {

    //             highlightdata.push(
    //                 <>
    // <TextField
    //     autoFocus
    //     margin="dense"
    //     name="name"
    //     label="name"
    //     fullWidth
    //     variant="standard"
    //     onChange={(e) => handelChange(e)}
    // />
    // <TextField
    //     autoFocus
    //     margin="dense"
    //     name="price"
    //     label="price"
    //     fullWidth
    //     variant="standard"
    //     onChange={(e) => handelChange(e)}

    // />
    // <TextareaAutosize
    //     aria-label="empty textarea"
    //     placeholder="Empty"
    //     name="desc"
    //     style={{ width: "100%", height: 50 }}
    //     onChange={(e) => handelChange(e)}

    // />
    // <TextField
    //     autoFocus
    //     margin="dense"
    //     name="offers"
    //     label="offers"
    //     fullWidth
    //     variant="standard"
    //     onChange={(e) => handelChange(e)}

    // />
    // <TextField
    //     autoFocus
    //     margin="dense"
    //     id="file"
    //     type="file"
    //     multiple
    //     label="picture"
    //     fullWidth
    //     variant="standard"
    //     onChange={(e) => handleFile(e)}
    // />

    //                     {
    //                         list[0].children.map((e, index) => {
    //                             return (
    //                                 <>
    //                                     < div onClick={() => handleClickOpen(e)}>
    //                                         {e.name}
    //                                     </div>
    //                                 </>
    //                             )
    //                         })
    //                     }
    //                     <Button onClick={handelSubbmit}>subb</Button>
    //                 </>
    //             )
    //         }
    //     }
    //     return highlightdata
    // }
    const handelSubbmit = () => {
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('description', data.desc)
        formData.append('category', autdata.value)
        formData.append('offers', data.offers)
        for (let high of open) {
            formData.append('highlightData', JSON.stringify(high))
        }
        for (let high of filter) {
            formData.append('specificationData', JSON.stringify(high))
        }
        for (let img of isFile) {
            formData.append('productPicture', img)
        }
        dispatch(createProduct(formData))
    }
    const filterhighlightList = (category, _options = []) => {
        if (category) {
            for (let _category of category) {
                _options.push({
                    value: _category._id,
                    name: _category.name,
                    parentId: _category.parentId,
                });
            }
        }
        return _options
    }

    const handelfilterSubbmit = (e) => {
        setfilter([...filter, {
            filterDescription: data.filterDescription,
            specificatonId: e._id
        }])
    }

    return (
        <Homepage>
            select category

            <Autocomplete
                disablePortal
                onChange={(event, data) => autsetdata(data)}
                options={(getdata == true) ? createCategoryList(category.categories).map((e) => {

                    const data = {
                        value: e.value,
                        label: e.name,
                        parentId: e.parentId
                    }
                    return data
                }) : null}
                renderInput={(e) => <TextField {...e} label="mob" />}
            />

            <Dialog
                open={diloagopen}
                onClose={handelCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {high.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            fullWidth
                            placeholder="description"
                            name="descriptionfilter"
                            variant="filled"
                            size="small"
                            onChange={(e) => handelChange(e)}
                        />
                        <TextField
                            fullWidth
                            placeholder="value"
                            name="value"
                            variant="filled"
                            size="small"
                            onChange={(e) => handelChange(e)}
                        />
                        <Autocomplete
                            disablePortal
                            onChange={(event, data) => setFilterdata(data.value)}
                            options={(getdata == true) ? filterhighlightList(high.children).map((e) => {
                                const data = {
                                    value: e.value,
                                    label: e.name,
                                    parentId: e.parentId
                                }
                                return data
                            }) : null}
                            renderInput={(high) => <TextField {...high} label="select filter data" />}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelCancel}>cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                        subbmit
                    </Button>
                </DialogActions>
            </Dialog>
            {((autdata.parentId) ?
                <>                    <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="name"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handelChange(e)}
                />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="price"
                        label="price"
                        fullWidth
                        variant="standard"
                        onChange={(e) => handelChange(e)}

                    />
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Empty"
                        name="desc"
                        style={{ width: "100%", height: 50 }}
                        onChange={(e) => handelChange(e)}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="offers"
                        label="offers"
                        fullWidth
                        variant="standard"
                        onChange={(e) => handelChange(e)}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="file"
                        type="file"
                        multiple
                        label="picture"
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleFile(e)}
                    />

                    <div style={{ margin: "10px", background: "pink" }}>HIGHLIGHTS</div>


                    {(autdata.parentId) ? category.highlight.filter((e) => e.category == autdata.parentId)[0].children.map((e, index) => {
                        return <div style={{ margin: "10px", background: "red" }} onClick={() => handleClick(e, index)}>{e.name}</div>
                    }) : null}

                    <div style={{ margin: "10px", background: "pink" }}>specifications</div>

                    {(autdata.parentId) ? category.specificaton.filter((e) => e.category == autdata.parentId)[0].children.map((e, index) => {
                        return <div style={{ margin: "10px", background: "red" }}>{e.name}

                            {(e) ? e.children.map((e) => {
                                return <div style={{ margin: "10px 20px", background: "green", display: "flex" }}>
                                    <TextField
                                        style={{ background: "white" }}

                                        disabled
                                        autoFocus
                                        margin="dense"
                                        name="specificatonId"
                                        label={e.name}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        style={{ background: "pink" }}
                                        autoFocus
                                        margin="dense"
                                        name="filterDescription"
                                        label="filterDescription"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => handelChange(e)}
                                    />


                                    <Button onClick={() => handelfilterSubbmit(e)}>subbmit</Button>
                                </div>
                            }) : null}
                        </div>
                    }) : null}

                    <Button onClick={handelSubbmit}>subb</Button>
                </> : null)}
        </Homepage>
    )
}
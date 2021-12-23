import React, { useState } from 'react';
import { createProduct, updateproduct } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { imgurl } from '../../api/api.url';
import { NavLink } from 'react-router-dom';


import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Homepage from "../Homepage"






const Products = (props) => {
    const category = useSelector(state => state.createcategory);
    const getproduct = useSelector(state => state.getallproducts);
    const getdata = category.issucces
    const isproducts = getproduct.isget
    const _getproducts = getproduct.products
    console.log(category)
    let formData = new FormData()
    let updateformData = new FormData()


    const [isGet, setGet] = useState({})
    const [isFile, setFile] = useState([])
    const [open, setOpen] = useState(false)
    const [opentr, setOpentr] = useState(false)
    const [autdata, autsetdata] = useState('')
    const [updatatr, setupdatatr] = useState({})

    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setOpentr(false)
    }

    const handelChange = (e) => {
        setGet({ ...isGet, [e.target.id]: e.target.value })
    }

    const handleFile = (e) => {
        setFile([
            ...isFile,
            e.target.files[0]
        ])
    }
    let setData = {
        name: isGet.name,
        price: isGet.price,
        desc: isGet.description,
        offers: isGet.offer,
    }

    const handelClick = () => {
        formData.append('name', setData.name)
        formData.append('price', setData.price)
        formData.append('description', setData.desc)
        formData.append('category', autdata)
        formData.append('offers', setData.offers)


        for (let img of isFile) {
            formData.append('productPicture', img)
        }
        dispatch(createProduct(formData))
    }

    const createCategoryList = (category, _options = []) => {
        for (let _category of category) {
            _options.push({
                value: _category._id,
                name: _category.name,
                parentId: _category.parentId,
            });
            if (_category.children.length > 0) {
                createCategoryList(_category.children, _options)
            }
        }
        return _options;
    }

    const handelrow = (get) => {
        setupdatatr(get)
        setOpentr(true);
    }
    const handelupdateChange = (e) => {
        setupdatatr({ ...updatatr, [e.target.id]: e.target.value })
    }
    let updateproductData = {
        _id: updatatr._id,
        name: updatatr.name,
        price: updatatr.price,
        description: updatatr.description,
        offers: updatatr.offers,
    }
    const updateclick = () => {
        updateformData.append('_id', updateproductData._id)
        updateformData.append('name', updateproductData.name)
        updateformData.append('price', updateproductData.price)
        updateformData.append('description', updateproductData.description)
        updateformData.append('category', autdata.value)
        updateformData.append('offers', updateproductData.offers)


        for (let img of isFile) {
            updateformData.append('productPicture', img)
        }
        dispatch(updateproduct(updateformData))
    }


    return (
        <Homepage sidebar>
            <div>
                <NavLink to="/addproduct" autdata>
                    <Button variant="contained">addProduct</Button>
                </NavLink>
            </div>



            <div>
                <Button variant="outlined" onClick={handleClickOpen}>ADD PRODUCTS</Button>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell>product name</TableCell>
                                <TableCell align="left">price</TableCell>
                                <TableCell align="left">category</TableCell>
                                <TableCell align="left">description</TableCell>
                                <TableCell align="left">offers</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(isproducts == true) ? _getproducts.map((row) => (

                                <TableRow
                                    key={row.name}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handelrow(row)}
                                >
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left">{row.category.name}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">{row.offers}</TableCell>

                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="name"
                            fullWidth
                            variant="standard"
                            onChange={(e) => handelChange(e)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="price"
                            fullWidth
                            variant="standard"
                            onChange={(e) => handelChange(e)}

                        />
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Empty"
                            id="description"
                            style={{ width: 540, height: 50 }}
                            onChange={(e) => handelChange(e)}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="offer"
                            label="offer"
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handelClick}>Subscribe</Button>
                    </DialogActions>
                </Dialog>

                <div>
                    <Dialog open={opentr} onClose={handleClose}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We
                                will send updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="name"
                                // defaultValue={datatr.name}

                                value={updatatr.name}


                                fullWidth
                                variant="standard"
                                onChange={(e) => handelupdateChange(e)}

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price"
                                value={updatatr.price}

                                // defaultValue={datatr.price}
                                label="price"
                                fullWidth
                                variant="standard"
                                onChange={(e) => handelupdateChange(e)}

                            />
                            <TextareaAutosize
                                value={updatatr.description}
                                aria-label="empty textarea"
                                placeholder="Empty"
                                id="description"
                                style={{ width: "100%", height: 50 }}
                                onChange={(e) => handelupdateChange(e)}

                            />
                            <TextField
                                autoFocus
                                value={updatatr.offers}
                                margin="dense"
                                id="offers"
                                label="offers"
                                fullWidth
                                variant="standard"
                                onChange={(e) => handelupdateChange(e)}
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
                            <Autocomplete
                                disablePortal
                                onChange={(event, data) => autsetdata(data.value)}
                                options={(getdata == true) ? createCategoryList(category.categories).map((e) => {
                                    const data = {
                                        value: e.value,
                                        label: e.name
                                    }
                                    return data
                                }) : null}
                                renderInput={(e) => <TextField {...e} label=" " />}
                            />

                        </DialogContent>
                        <DialogContent>
                            {(updatatr.productPicture !== undefined) ? updatatr.productPicture.map((e) => {

                                return <img src={`${imgurl.IMGURL}${e.img}`} alt="Girl in a jacket" width="150" height="150" />
                            }) : null}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={updateclick}>save change</Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </div>
        </Homepage>
    );
}
export default Products
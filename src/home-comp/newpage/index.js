import React, { useState } from 'react'
import Homepage from '../Homepage'
import { createCategoryList } from '../../api/api.axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import {createnewpage} from "../../actions/newpage"

const Newpage = () => {
    const [data, setData] = useState({})
    const [autodata, setautoData] = useState('')

    const [bannerFile, setbannerFile] = useState([])
    const [productFile, setproductFile] = useState([])


    const selector = useSelector(state => state.createcategory);
    const dispatch = useDispatch()

    const handelChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const handelBannerFile = (e) => {
        setbannerFile([
            ...bannerFile,
            e.target.files[0]
        ])
    }

    const handelProductFile = (e) => {
        setproductFile([
            ...productFile,
            e.target.files[0]
        ])
    }
    let updateproductData = {
        title: data.title,
        description: data.description,
        category: autodata,
     
    }
console.log(updateproductData)
let formData = new FormData()

    const handelsubmit = () => {
        formData.append("title", updateproductData.title)
        formData.append("description", updateproductData.description)
        formData.append("category", updateproductData.category)

        bannerFile.forEach((banner, index) => {
            formData.append('banners', banner);
        });
        productFile.forEach((product, index) => {
            formData.append('products', product);
        });

        dispatch(createnewpage(formData));


    }

    return (
        <Homepage>
            <Box>
                <TextField id="title" label="Outlined" variant="outlined" onChange={(e) => handelChange(e)} />
                <TextField id="description" label="Filled" variant="filled" onChange={(e) => handelChange(e)} />
                <TextField
                    autoFocus
                    margin="dense"
                    id="bannerfile"
                    type="file"
                    multiple
                    label="picture"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handelBannerFile(e)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="productfile"
                    type="file"
                    multiple
                    label="picture"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handelProductFile(e)}
                />

                <Autocomplete
                    disablePortal
                    onChange={(event, data) => setautoData(data.value)}
                    options={(selector.issucces == true) ? createCategoryList(selector.categories).map((e) => {
                        const data = {
                            value: e.value,
                            label: e.name
                        }
                        return data
                    }) : null}
                    renderInput={(e) => <TextField {...e} label="categoryName" />}
                />


                <Button variant="contained" onClick={handelsubmit}>submit</Button>

            </Box>

        </Homepage >
    )
}

export default Newpage

import React, { useEffect, useState } from 'react'
import { createcategory, deletecategory, getallcategory, updatecategory } from '../../actions'

import Homepage from '../Homepage'
import { useDispatch, useSelector } from 'react-redux'



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Popover, Typography, Checkbox, makeStyles, Box } from '@material-ui/core'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const useStyle = makeStyles({
  box: {
    width: "300px",
    height: "300px",
    zIndex: '1',
    position: "absolute",
    background: "orange",
    display: "none"
  },
  displaydata: {
    display: "block"
  }
})



export default function Category(props) {
  const [data, setdata] = useState('')
  const [autdata, autsetdata] = useState('')
  const [open, setOpen] = useState(false)
  const [subopen, setsubOpen] = useState(false)
  const [subData, setsubData] = useState({})
  const [updData, setupdData] = useState({})
  const [deleteData, deletesetData] = useState()
  const [dopen, setdeleteData] = useState(false)
  const [file, setFile] = useState([])
  const [autdataau, autsetdatau] = useState('')
  const [age, setAge] = useState('');


  const [alertopen, setalertOpen] = useState(false);
  const [updateopen, setupdateOpen] = useState(false);


  const fromData = new FormData()

  const category = useSelector(state => state.createcategory);
  const newpage = useSelector(state => state.getallnewpage);
 

  const dispatch = useDispatch()
  const classes = useStyle()
  const getdata = category.issucces

  const createcat = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  const createsubcat = (e) => {
    setsubData({ ...subData, [e.target.name]: e.target.value })
  }
  const updatecatogary = (e) => {
    setupdData({ ...updData, [e.target.name]: e.target.value })
  }

  const handelClick = () => {

    fromData.append("name", data.category)
    fromData.append("parentId", undefined)
    fromData.append("pagetype", undefined)

    for (let img of file) {
      fromData.append('categoryPicture', img)
    }
    dispatch(createcategory(fromData))
    setOpen(false);

  }

  const handelsubClick = () => {

    fromData.append("name", subData.category)
    fromData.append("parentId", subData._id)
    fromData.append("pagetype", autdataau)

    for (let img of file) {
      fromData.append('categoryPicture', img)
    }

    dispatch(createcategory(fromData))
    setsubOpen(false)
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handlesubClose = () => {
    setsubOpen(false)
  }
  const handleupdClose = () => {
    setupdateOpen(false)
  }
  const createfile = (e) => {
    setFile([...file, e.target.files[0]])
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

  const handelcategoryclick = (subcategory) => {
    setsubOpen(true)
    setsubData(subcategory)
  }
  const handledeleteClose = () => {
    setdeleteData(false)

  }



  const handeldeleteclick = (e, _getdelete_id = []) => {
    setdeleteData(true)
    for (let cat of e.children) {
      _getdelete_id.push(cat._id)
      if (cat.children.length > 0) {
        handeldeleteclick(cat, _getdelete_id)
      }
    }
    const main_id = e._id
    const isconcate = _getdelete_id.concat(main_id)

    deletesetData(isconcate)

    return _getdelete_id
  }
  const _handeldeleteClick = () => {
    dispatch(deletecategory(deleteData))
  }
  const handelupdateclick = (e) => {
    setupdData(e)
    setupdateOpen(true)
  }

  const updatedata = {
    _id: updData._id,
    name: updData.name,
    parentId: updData.parentId,

  }
  const handelupdClick = () => {
    setupdateOpen(false)
    dispatch(updatecategory(updatedata))
  }


  const handlimputeChange = (event) => {
    autsetdatau(event.target.value);
  }

  const autocomplete = (event) => {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={autdataau}
              label="Age"
              onChange={handlimputeChange}
            >
              <MenuItem value={"page"}>page</MenuItem>
              <MenuItem value={"store"}>store</MenuItem>
              <MenuItem value={"mainpage"}>mainpage</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </>
    )
  }








return (
  <Homepage sidebar>

    <Button variant="outlined" onClick={() => handleClickOpen()}>add CATEGORY</Button>

    {/* {(getdata == true) ? renderCategoryList(category._categorylist) : null} */}

    {(getdata == true) ? (category.categories).map((e) => {

      return (
        <>
          <Typography key={e._id} >
            {e.name}
            <Button onClick={() => handelcategoryclick(e)}>add sub category</Button>
            <Button onClick={() => handeldeleteclick(e)}>delete</Button>
            <Button onClick={() => handelupdateclick(e)}>update</Button>


          </Typography>
        </>
      )
    }) : null}

    {/* add category main  */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
          {/* {(getdata == true) ? renderCategoryList(category._categorylist) : null} */}
        </DialogContentText>
        <TextField
          fullWidth
          placeholder="category"
          name="category"
          variant="filled"
          size="small"
          onChange={(e) => createcat(e)}
        />
        <TextField
          fullWidth
          type="file"
          placeholder="image"
          name="image"
          variant="filled"
          size="small"
          onChange={(e) => createfile(e)}
        />
        {(newpage.issuccess == true) ? autocomplete(newpage.newpage) : null}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handelClick}>Subscribe</Button>
      </DialogActions>
    </Dialog>

    {/* add subcaregoy */}
    <Dialog open={subopen} onClose={handlesubClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <Collapse in={alertopen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setalertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Close me!
          </Alert>
        </Collapse>
        {(subData.children) ? (subData.children).map((e) => {
          return (
            <>
              <Typography key={e._id}>
                {e.name}
                <Button onClick={() => handelcategoryclick(e)}>add sub category</Button>
                <Button onClick={() => handeldeleteclick(e)}>delete</Button>
                <Button onClick={() => handelupdateclick(e)}>update</Button>
              </Typography>
            </>
          )
        }) : null}
        <TextField
          fullWidth
          label="category"
          placeholder="category"
          name="category"
          variant="standard"
          size="small"
          onChange={(e) => createsubcat(e)}
        />
        <TextField
          fullWidth
          type="file"
          placeholder="image"
          name="image"
          variant="filled"
          size="small"
          onChange={(e) => createfile(e)}
        />
        <TextField
          disabled
          fullWidth
          placeholder={subData.name}
          label={subData.name}
          value={subData._id}
          name="parentId"
          variant="filled"
          size="small"
          onChange={(e) => createsubcat(e)}
        />
        {(newpage.issuccess == true) ? autocomplete(newpage.newpage) : null}

      </DialogContent>
      <DialogActions>
        <Button onClick={handlesubClose}>Cancel</Button>
        <Button onClick={handelsubClick}>subbmit</Button>
      </DialogActions>
    </Dialog>

    <Dialog open={updateopen} onClose={handlesubClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          fullWidth
          label="category"
          placeholder="category"
          name="name"
          variant="standard"
          value={updData.name}
          size="small"
          onChange={(e) => updatecatogary(e)}
        />
        <TextField
          disabled
          fullWidth
          label={updData.name}
          value={updData._id}
          name="parentId"
          variant="filled"
          size="small"
          onChange={(e) => updatecatogary(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleupdClose}>Cancel</Button>
        <Button onClick={handelupdClick}>subbmit</Button>
      </DialogActions>
    </Dialog>




    <Dialog open={dopen} onClose={handledeleteClose}>
      <DialogTitle>Subscribe </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
          {/* {(getdata == true) ? renderCategoryList(category._categorylist) : null} */}
        </DialogContentText>
        <TextField

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handledeleteClose}>Cancel</Button>
        <Button onClick={_handeldeleteClick}>Subscribe</Button>
      </DialogActions>
    </Dialog>


  </Homepage>
)
}
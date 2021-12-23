import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar,DialogContentText, Typography, TextField, makeStyles, Box, Grid, Button } from '@material-ui/core';
import { signin } from '../actions';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom"
import { isadminsignin } from '../actions';
const useStyle = makeStyles({
    box: {
        background: "green",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "500px"
    },
    textbox: {
        width: "55%",
        display: "flex",
        background: "white",
        marginTop: "100px"

    },
    button: {
        margin: "20px 0px 0px 150px"
    }
})
export const Adminsignin = (props) => {
    const dispatch = useDispatch()
    const [pass, setPass] = useState('');
    // const [adminsignin, setadminsignin] = useState('');

    const classes = useStyle()


    const handelChange = (e) => {
        setPass({ ...pass, [e.target.name]: e.target.value })

    }
    let emailpass = {
        email: pass.email,
        pass: pass.password
    }
    const buttonClick = () => {
        dispatch(signin(emailpass))
    }

    const auth = useSelector(state => state.auth)

    if (auth.authenticate == true) {
        return <Redirect to={'/home'} />
    }


    return (
        <>
  <DialogContentText>
                <TextField
                    className={classes.textbox}
                    placeholder="email"
                    name="email"
                    variant="filled"
                    size="small"
                    onChange={(e) => handelChange(e)}
                />
                <TextField
                    className={classes.textbox}
                    placeholder="Password"
                    name="password"
                    variant="filled"
                    size="small"
                    onChange={(e) => handelChange(e)}
                />
                <Button className={classes.button} onClick={() => buttonClick()} variant="contained">Contained</Button>
                </DialogContentText>


        </>
    )
}




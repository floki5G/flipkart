import React, { useEffect } from 'react';
import { Button, AppBar, Toolbar, Typography, makeStyles, Box } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminsingout } from '../actions';
const useStyle = makeStyles({
    box: {

        display: "flex",
        justifyContent: "space-between",
        margin: "2vh"
    },
    appbar: {
        height:"65px",
        color: "red",
        backgroundColor: "#cccccc"
    },
    signout: {
        float: 'right'
    }

})

export const Appbar = () => {
    const dispatch = useDispatch()

    const signoutbutton = () => {

        dispatch(adminsingout())

    }

    const classes = useStyle()
    return (
        <>
            <AppBar className={classes.appbar}>

                <Box className={classes.box}>
                    <Typography>
                       fuck admin dashboard
                    </Typography>

                    <Typography className={classes.signout}>
                        <Link to="/">
                            signin
                        </Link>

                    </Typography>
                    <Link to="/adminsignup">
                        signup
                    </Link>
                    <Link to="/">

                    <Button onClick={() => signoutbutton()} variant="contained">signout</Button>
                    </Link>
                </Box>
            </AppBar>
        </>
    )
}

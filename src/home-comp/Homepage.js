import React, { useEffect } from 'react';
import { Box, Grid, AppBar, Toolbar, Button, Typography, makeStyles } from '@material-ui/core';
import { Appbar } from './Appbar'
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";

const useStyle = makeStyles({
    box: {
        marginTop: '67px'
    },
    button: {
        width: "15vh",
        marginTop: "2vh"
    }

})

const Homepage = (props) => {
    const dispatch = useDispatch()

    const classes = useStyle()

    return (
        <>
            <Appbar />
            <Box className={classes.box}>
                <Grid container>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center" item md={2} xs={4} style={{ background: "black", position: "fixed", height: "100%", }}>
                        <NavLink to="/adminhome">
                            <Button className={classes.button} variant="contained">home</Button>
                        </NavLink>
                        
                        <NavLink to="/addproduct">
                            <Button className={classes.button} variant="contained">addProduct</Button>
                        </NavLink> 
                       <NavLink to="/newpage">
                            <Button className={classes.button} variant="contained">newpage</Button>
                        </NavLink> 
                        <NavLink to="/category">
                            <Button className={classes.button} variant="contained">category</Button>
                        </NavLink>
                        <NavLink to="/orders">
                            <Button className={classes.button} variant="contained">orders</Button>
                        </NavLink>
                        <NavLink to="/products">
                            <Button className={classes.button} variant="contained">products</Button>
                        </NavLink>
                    </Grid>
                    <Grid item md={10} xs={8} style={{ background: "", marginLeft: "auto", paddingLeft: "1vh", }}>
                        {props.children}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default Homepage
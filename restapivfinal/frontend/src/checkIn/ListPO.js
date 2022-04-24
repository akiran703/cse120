import { Grid, TextField, makeStyles, Button, Paper} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {createList , deleteList, getLists, reset} from '../features/list/listSlice'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(6),
        padding: theme.spacing(3),
        textAlign: 'center'
    }, 
    root: {
        '& .MuiFormControl-root' : {
            width: '80%',
            margin:theme.spacing(1)
        }
    }
}))


// user input List of Purchase / Order Number
function ListPO() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();

    const { user } = useSelector((state) => state.auth)
    const { lists, isLoading, isError, message } = useSelector(
      (state) => state.list
    )

    useEffect(() => {
        if (!user) {
          navigate('/login')
        }
        dispatch(getLists())
        return () =>{
          dispatch(reset())
        }
      }, [user, navigate,isError,message,dispatch])

    const [input, setInput] = useState({
        po1: '',
        po2: '',
        po3: '',
        po4: '',
        po5: '',
        po6: '',
        po7: '',
        po8: ''
    })

    const {po1, po2, po3, po4, po5, po6, po7, po8} = input
    function handleInputChange(e) {

        setInput(prevInput => {
            return {
                ...prevInput,
                [e.target.name] : e.target.value,
            }
        })
    }

    function handleClick(event) {
        event.preventDefault()
        const listData = {
            po1, po2, po3, po4, po5, po6, po7, po8
        }
        navigate("/truck/bol")
        if (lists.length == 0) {
            dispatch(createList(listData))
        } else {
            {lists.map((list) => (dispatch(deleteList(list._id))))}
            dispatch(createList(listData))
        }
    }

    return (
        <form className={classes.root} autoComplete = "off">
            <h1 align="center">List of Purchase / Order Number</h1> 

            <Paper className={classes.pageContent}>
                <Grid container spacing={1} >
                    
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 1"
                            name = "po1"
                            value = {input.po1}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 2"
                            name = "po2"
                            value = {input.po2}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 3"
                            name = "po3"
                            value = {input.po3}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 4"
                            name = "po4"
                            value = {input.po4}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 5"
                            name = "po5"
                            value = {input.po5}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 6"
                            name = "po6"
                            value = {input.po6}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 7"
                            name = "po7"
                            value = {input.po7}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={6}>
                        <TextField 
                            variant = "outlined"
                            label = "Purchase / Order Number 8"
                            name = "po8"
                            value = {input.po8}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    
                </Grid>
                <br></br>
                <Grid container justifyContent="center">
                    <Button color="primary" size="large" type="button" variant="contained" onClick={handleClick}>
                        Confirm
                    </Button>
                </Grid>

                </Paper>
            </form>       
    )
}

export default ListPO
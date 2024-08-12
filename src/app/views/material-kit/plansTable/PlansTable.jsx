import { useEffect, useState, forwardRef, useRef } from 'react';
import * as React from 'react';
import {
    Icon,
    styled,
    IconButton,
    Snackbar,
    Alert,
    useTheme,
    FormControlLabel,
    FormControl,
    InputLabel,
    Grid,
    Radio,
    RadioGroup,
    Switch,
    Checkbox,
    Select,
    Box,
    InputAdornment,
    Chip,
    Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Span } from 'app/components/Typography';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0, fontSize: 18, color: 'blue' } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize', fontWeight: 'bold' } }
    }
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0'
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5)
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                )
            }
        }
    }
}));

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px'
}));

export default function PaginationTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedPlan, setSelectedCusomer] = useState(null);
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        name: '',
        price: '',
        initialBalance: '',
        dailyDrawdown: '',
        totalDrawdown: '',
        phase1: '',
        phase2: '',
        leverage: '',
        profitShare: '',
        createdAt: '',
        updatedAt: ''
    });
    const formRef = useRef(null);
    const token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState(null);
    // modal manipulatino states
    const [openCredential, setCredentialOpen] = useState(false);
    const [openReplace, setReplaceOpen] = useState(false);
    const [openDisable, setDisableOpen] = useState(false);
    const [openRemove, setRemoveOpen] = useState(false);
    const [openEdit, setEditOpen] = useState(false);
    const [openView, setViewOpen] = useState(false);
    const [openCreate, setCreateOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const cleanNewPlan = () => {
        console.log('clean');
        setNewPlan({
            name: '',
            price: '',
            initialBalance: '',
            dailyDrawdown: '',
            totalDrawdown: '',
            phase1: '',
            phase2: '',
            leverage: '',
            profitShare: '',
            createdAt: '',
            updatedAt: ''
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCreateOpen = () => setCreateOpen(true);

    // To validation wether password same as confirmPassword, uncommit this useEffect function
    useEffect(() => {
        // ValidatorForm.addValidationRule('isPasswordStrong', (value) => {
        //     return value.length >= 8 && /\d/.test(value) && /[a-zA-Z]/.test(value);
        // });

        // Password match validator
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            return value === newPlan.password;
        });

        return () => {
            // ValidatorForm.removeValidationRule('isPasswordStrong');
            ValidatorForm.removeValidationRule('isPasswordMatch');
        };
    }, [selectedPlan?.password]);

    useEffect(() => {
        fetchPlan();
    }, []);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    //CRUD OPS
    const fetchPlan = () => {
        axios
            .get('/getPlans', {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setPlans(res.data.plans);
                showSnackbar(res.data.message, 'success');
            })
            .catch((error) => {
                // Handle errors
                console.error('There was an error making the GET request!', error);
            });
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //form OPs
    const handleSubmit = () => {
        console.log(newPlan);
        axios
            .post('/createPlan', newPlan, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                showSnackbar(res.data.messages, 'success');
                fetchPlan();
            })
            .catch((error) => {
                return;
            });
        cleanNewPlan();
    };
    const handleSubmitEdit = () => {
        axios
            .post(
                '/updatePlan',
                { ...selectedPlan, planId: selectedPlan.id },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchPlan();
                showSnackbar(res.data.messages, 'success');
            })
            .catch((error) => {
                return;
            });
    };
    const handleDelete = (id) => {
        axios
            .post(
                '/deletePlan',
                { planId: id },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchPlan();
                showSnackbar(res.data.messages, 'success');
            })
            .catch((error) => {
                return;
            });
    };

    const handleChange = (event) => {
        setNewPlan({ ...newPlan, [event.target.name]: event.target.value });
    };
    const handleChangeEdit = (event) => {
        setSelectedCusomer({ ...selectedPlan, [event.target.name]: event.target.value });
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];
    };

    const formatDateFiled = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    function renderStatusChip(status) {
        switch (status) {
            case 'allow':
                return <Chip label={status} color="success" />;
            case 'block':
                return <Chip label={status} color="error" />;
            case 'pending':
                return <Chip label={status} color="primary" variant="outlined" />;
            default:
                return <Chip label="Unknown" color="default" />;
        }
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 530 }}>
                <StyledTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '200px' }}>
                                Name
                            </TableCell>
                            <TableCell align="left" sx={{ width: '100px' }}>
                                Price
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                InitialBalnce
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                DailyDrawdown
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                TotalDrawdown
                            </TableCell>
                            <TableCell align="left" sx={{ width: '85px' }}>
                                phase1
                            </TableCell>
                            <TableCell align="left" sx={{ width: '110px' }}>
                                phase2
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Leverage
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                profitShare
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                createdAt
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                updatedAt
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    marginLeft: '0px',
                                    width: '80px',
                                    position: 'sticky',
                                    right: 0,
                                    opacity: 0.8,
                                    // backgroundColor: '#9C9C9C'
                                    boxShadow: '-4px 0px 20px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                <IconButton
                                    onClick={handleCreateOpen}
                                    sx={{ backgroundColor: '#9C9C9C' }}
                                >
                                    <AddIcon sx={{ fontSize: 40 }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plans
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((plan, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell align="left">{plan.name}</TableCell>
                                    <TableCell align="left">{plan.price}</TableCell>
                                    <TableCell align="left">{plan.initialBalance}</TableCell>
                                    <TableCell align="left">{plan.dailyDrawdown}</TableCell>
                                    <TableCell align="left">{plan.totalDrawdown}</TableCell>
                                    <TableCell align="left">{plan.phase1}</TableCell>
                                    <TableCell align="left">{plan.phase2}</TableCell>
                                    <TableCell align="left">{plan.leverage}</TableCell>
                                    <TableCell align="left">{plan.profitShare}</TableCell>
                                    <TableCell align="left">{formatDate(plan.createdAt)}</TableCell>
                                    <TableCell align="left">{formatDate(plan.updatedAt)}</TableCell>

                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            right: 0,
                                            backgroundColor: '#9C9C9C',
                                            opacity: 0.8,
                                            zIndex: 1,
                                            boxShadow: '-8px 0px 20px rgba(0, 0, 0, 0.3)'
                                        }}
                                        align="center"
                                    >
                                        <IconButton
                                            onClick={handleClick}
                                            id="demo-customized-button"
                                            aria-controls={
                                                open ? 'demo-customized-menu' : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            variant="contained"
                                            disableElevation
                                        >
                                            <SettingsIcon sx={{ fontSize: 40 }} />
                                        </IconButton>
                                        <StyledMenu
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button'
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    setSelectedCusomer({
                                                        ...plan,
                                                        password: ''
                                                    });

                                                    setEditOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <EditIcon />
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    setSelectedCusomer(plan);
                                                    setViewOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <VisibilityIcon />
                                                View
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    setSelectedCusomer(plan);
                                                    setCredentialOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <EmailIcon />
                                                Send Credential
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    setReplaceOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <FileCopyIcon />
                                                Replace Account
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    window.location.href =
                                                        'https://portal.nowtradefunded.com'; // Navigate to the URL
                                                }}
                                                disableRipple
                                            >
                                                <SwapHorizIcon />
                                                Go to trading account
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    setDisableOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <BlockIcon />
                                                Disable Account
                                            </MenuItem>
                                            <Divider sx={{ my: 0.5 }} />
                                            <MenuItem
                                                onClick={() => {
                                                    setSelectedCusomer(plan);
                                                    handleClose();
                                                    setRemoveOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <DeleteIcon />
                                                Remove
                                            </MenuItem>
                                        </StyledMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>

            {/* send credential modal*/}

            <Dialog
                open={openCredential}
                keepMounted
                onClose={() => setCredentialOpen(false)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Use Google's location service?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This is credential
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setCredentialOpen(false)} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => setCredentialOpen(false)} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/* account replacement handle modal  */}
            <Dialog
                open={openReplace}
                keepMounted
                onClose={() => setReplaceOpen(false)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Use Google's location service?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        this is accont replace
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setReplaceOpen(false)} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => setReplaceOpen(false)} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/*  disable account handlemodal   */}
            <Dialog
                open={openDisable}
                keepMounted
                onClose={() => setDisableOpen(false)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Use Google's location service?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        this is accont disable
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDisableOpen(false)} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => setDisableOpen(false)} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/* remove account confirm modal                */}
            <Dialog
                open={openRemove}
                keepMounted
                onClose={() => setRemoveOpen(false)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Delete account</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to delete accunt?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setRemoveOpen(false);
                        }}
                        color="primary"
                    >
                        Disagree
                    </Button>

                    <Button
                        onClick={() => {
                            handleDelete(selectedPlan.id);
                            setRemoveOpen(false);
                        }}
                        color="primary"
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            {/* This is create modal with responsive strategy */}

            <Dialog
                fullWidth
                open={openCreate}
                onClose={() => {
                    cleanNewPlan();
                    setCreateOpen(false);
                }}
                aria-labelledby="form-dialog-title"
                minWidth={700} // Disable automatic resizing
            >
                <DialogTitle id="form-dialog-title">Create new Plan</DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ color: 'white' }}></DialogContentText>
                    <ValidatorForm
                        ref={formRef} // Attach the ref to ValidatorForm
                        onSubmit={handleSubmit}
                        onError={() => null}
                    >
                        <TextField
                            autoFocus
                            id="name"
                            type="name"
                            margin="dense"
                            label="Name"
                            value={newPlan.name || ''}
                            onChange={handleChange}
                            name="name"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Price"
                            value={newPlan.price || ''}
                            onChange={handleChange}
                            name="price"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="InitialBalance"
                            value={newPlan.initialBalance || ''}
                            onChange={handleChange}
                            name="initialBalance"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="DailyDrawdown"
                            value={newPlan.dailyDrawdown || ''}
                            onChange={handleChange}
                            name="dailyDrawdown"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="TotalDrawDown"
                            value={newPlan.totalDrawdown || ''}
                            onChange={handleChange}
                            name="totalDrawdown"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Phase1"
                            value={newPlan.phase1 || ''}
                            onChange={handleChange}
                            name="phase1"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Phase2"
                            value={newPlan.phase2 || ''}
                            onChange={handleChange}
                            name="phase2"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Leverage"
                            value={newPlan.leverage || ''}
                            onChange={handleChange}
                            name="leverage"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ProfitShare"
                            value={newPlan.profitShare || ''}
                            onChange={handleChange}
                            name="profitShare"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </ValidatorForm>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setCreateOpen(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => {
                            formRef.current.submit();

                            setCreateOpen(false);
                        }}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                    </Button>
                </DialogActions>
            </Dialog>

            {/* This is edit modal with responsive strategy */}
            <Dialog
                fullWidth
                open={openEdit}
                onClose={() => {
                    setEditOpen(false);
                }}
                aria-labelledby="form-dialog-title"
                minWidth={700} // Disable automatic resizing
            >
                <DialogTitle id="form-dialog-title">Edit Plan</DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ color: 'white' }}></DialogContentText>
                    <ValidatorForm
                        ref={formRef} // Attach the ref to ValidatorForm
                        onSubmit={handleSubmitEdit}
                        onError={() => null}
                    >
                        <TextField
                            autoFocus
                            id="name"
                            type="text"
                            margin="dense"
                            label="Name"
                            value={selectedPlan?.name || ''}
                            onChange={handleChangeEdit}
                            name="name"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Price"
                            value={selectedPlan?.price || ''}
                            onChange={handleChangeEdit}
                            name="price"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="InitialBalance"
                            value={selectedPlan?.initialBalance || ''}
                            onChange={handleChangeEdit}
                            name="initialBalance"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="DailyDrawdown"
                            value={selectedPlan?.dailyDrawdown || ''}
                            onChange={handleChangeEdit}
                            name="dailyDrawdown"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="TotalDrawDown"
                            value={selectedPlan?.totalDrawdown || ''}
                            onChange={handleChangeEdit}
                            name="totalDrawdown"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Phase1"
                            value={selectedPlan?.phase1 || ''}
                            onChange={handleChangeEdit}
                            name="phase1"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Phase2"
                            value={selectedPlan?.phase2 || ''}
                            onChange={handleChangeEdit}
                            name="phase2"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Leverage"
                            value={selectedPlan?.leverage || ''}
                            onChange={handleChangeEdit}
                            name="leverage"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ProfitShare"
                            value={selectedPlan?.profitShare || ''}
                            onChange={handleChangeEdit}
                            name="profitShare"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </ValidatorForm>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setEditOpen(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => {
                            formRef.current.submit();
                            setEditOpen(false);
                        }}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                    </Button>
                </DialogActions>
            </Dialog>

            {/* This is view modal with responsive strategy */}
            <Dialog
                fullScreen={fullScreen}
                open={openView}
                onClose={() => setViewOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Plane Details</DialogTitle>

                <DialogContent>
                    <Typography>
                        <strong>Name:</strong> &nbsp;&nbsp;
                        {selectedPlan?.name}
                    </Typography>
                    <Typography>
                        <strong>Price:</strong>&nbsp;&nbsp; {selectedPlan?.price}
                    </Typography>
                    <Typography>
                        <strong>InitialBalnce:</strong> &nbsp;&nbsp;{selectedPlan?.initialBalance}
                    </Typography>
                    <Typography>
                        <strong>DailyDrawdown:</strong> &nbsp;&nbsp;{selectedPlan?.dailyDrawdown}
                    </Typography>
                    <Typography>
                        <strong>TotalDrawdown:</strong> &nbsp;&nbsp;{selectedPlan?.totalDrawdown}
                    </Typography>

                    <Typography>
                        <strong>Phase1:</strong> &nbsp;&nbsp;{selectedPlan?.phase1}
                    </Typography>
                    <Typography>
                        <strong>Phase2:</strong> &nbsp;&nbsp;{selectedPlan?.phase2}
                    </Typography>
                    <Typography>
                        <strong>Leverage:</strong> &nbsp;&nbsp;{selectedPlan?.leverage}
                    </Typography>
                    <Typography>
                        <strong>ProfitShare:</strong> &nbsp;&nbsp;{selectedPlan?.profitShare}
                    </Typography>

                    <Typography>
                        <strong>Created:</strong> &nbsp;&nbsp;
                        {formatDate(selectedPlan?.createdAt)}
                    </Typography>
                    <Typography>
                        <strong>Updated:</strong> &nbsp;&nbsp;
                        {formatDate(selectedPlan?.updatedAt)}
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setViewOpen(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={plans.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

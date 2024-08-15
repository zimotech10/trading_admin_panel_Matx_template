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
    Switch,
    Checkbox,
    Select,
    InputAdornment,
    Chip,
    Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import RefreshIcon from '@mui/icons-material/Refresh';

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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
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
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0, fontSize: 18, color: 'blue', textTransform: "none" } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, fontWeight: 'bold', textTransform: "none" } }
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
    const [seletedCustomer, setSelectedCusomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        email: '',
        active: true,
        firstName: '',
        middleName: '',
        lastName: '',
        nickName: '',
        birthday: '',
        accounts: '',
        orders: '',
        referrals: '',
        language: 'en',
        phone: '',
        externalID1: '',
        externalID2: '',
        status: 'allow',
        agreementSigned: false,
        agreementID: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: ''
    });
    const formRef = useRef(null);
    const formRef1 = useRef(null);
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
    const cleanNewCustomer = () =>
        setNewCustomer({
            email: '',
            active: true,
            firstName: '',
            middleName: '',
            lastName: '',
            nickName: '',
            birthday: '',
            accounts: '',
            orders: '',
            referrals: '',
            language: 'en',
            phone: '',
            externalID1: '',
            externalID2: '',
            status: 'allow',
            agreementSigned: false,
            agreementID: '',
            agreementIP: '',
            agreementLegalName: '',
            agreementTs: '',
            country: '',
            state: '',
            city: '',
            zip: '',
            addressLine1: '',
            addressLine2: '',
            addressLine3: ''
        });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCreateOpen = () => setCreateOpen(true);

    // To validation wether password same as confirmPassword, uncommit this useEffect function
    // useEffect(() => {
    // ValidatorForm.addValidationRule('isPasswordStrong', (value) => {
    //     return value.length >= 8 && /\d/.test(value) && /[a-zA-Z]/.test(value);
    // });

    // Password match validator
    // ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    //     return value === newCustomer.password;
    // });

    // return () => {
    //     ValidatorForm.removeValidationRule('isPasswordStrong');
    //     ValidatorForm.removeValidationRule('isPasswordMatch');
    // };
    // }, [newCustomer?.email]);

    useEffect(() => {
        fetchCustomer();
        // eslint-disable-next-line
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
    const fetchCustomer = () => {
        axios
            .get('/getCustomers', {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setCustomers(res.data.customers);
                showSnackbar(res.data.message, 'success');
                console.log(customers);
            })
            .catch((error) => {
                // Handle errors
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized! Please log in again.');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                }
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
        axios
            .post('/createCustomer', newCustomer, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                fetchCustomer();
                showSnackbar(res.data.messages, 'success');
            })
            .catch((error) => {
                return;
            });
        setCreateOpen(false);
        cleanNewCustomer();
    };
    const handleSubmitEdit = () => {
        axios
            .post(
                '/updateCustomer',
                { ...seletedCustomer, customerId: seletedCustomer.id },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchCustomer();
                showSnackbar(res.data.messages, 'success');
            })
            .catch((error) => {
                return;
            });
    };
    const handleDelete = (id) => {
        axios
            .post(
                '/deleteCustomer',
                { customerId: id },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchCustomer();
                showSnackbar(res.data.messages, 'success');
            })
            .catch((error) => {
                return;
            });
    };

    const handleChange = (event) => {
        // event.persist();
        if (event.target.name === 'active' || event.target.name === 'agreementSigned') {
            setNewCustomer({ ...newCustomer, [event.target.name]: event.target.checked });
            console.log(newCustomer.active, event.target.checked);
            return;
        }
        setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
    };
    const handleChangeEdit = (event) => {
        // event.persist();
        if (event.target.name === 'active' || event.target.name === 'agreementSigned') {
            setSelectedCusomer({ ...seletedCustomer, [event.target.name]: event.target.checked });
            return;
        }
        setSelectedCusomer({ ...seletedCustomer, [event.target.name]: event.target.value });
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
    const refresh = () => {
        axios
            .get('/getCustomers', {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setCustomers(res.data.customers);
                showSnackbar(res.data.message, 'success');
                console.log(customers);
            })
            .catch((error) => {
                // Handle errors
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized! Please log in again.');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                }
                console.error('There was an error making the GET request!', error);
            });
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 530 }}>
                <Button sx={{ background: '#4A76ED', color: '#E6E6E6' }} onClick={refresh} variant="contained" color="primary" startIcon={<RefreshIcon />}>
                    Refresh
                </Button>
                <StyledTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '200px' }}>
                                Email
                            </TableCell>
                            <TableCell align="left" sx={{ width: '100px' }}>
                                FirstName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                MiddleName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                LastName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                NickName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '85px' }}>
                                Birth
                            </TableCell>
                            <TableCell align="left" sx={{ width: '110px' }}>
                                Accounts
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Orders
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Referrals
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Language
                            </TableCell>
                            <TableCell align="left" sx={{ width: '140px' }}>
                                Phone
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Externalld1
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Externalld2
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Status
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement &nbsp;&nbsp;&nbsp; Signed
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement ID
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement IP
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement &nbsp;&nbsp;&nbsp; LegalName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                AgreementTs
                            </TableCell>
                            <TableCell align="left" sx={{ width: '85px', paddingLeft: '20px' }}>
                                Created
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                LastUpdated
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                Active
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Country
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                State
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                City
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                Zip
                            </TableCell>
                            <TableCell align="left" sx={{ width: '180px' }}>
                                AddressLine1
                            </TableCell>
                            <TableCell align="left" sx={{ width: '180px' }}>
                                AddressLine2
                            </TableCell>
                            <TableCell align="left" sx={{ width: '180px' }}>
                                AddressLine3
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
                        {customers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((customer, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell align="left">{customer.email}</TableCell>
                                    <TableCell align="left">{customer.firstName}</TableCell>
                                    <TableCell align="left">{customer.middleName}</TableCell>
                                    <TableCell align="left">{customer.lastName}</TableCell>
                                    <TableCell align="left">{customer.nickName}</TableCell>
                                    <TableCell align="left">
                                        {formatDate(customer.birthday)}
                                    </TableCell>
                                    <TableCell align="left">{customer.accounts}</TableCell>
                                    <TableCell align="left">{customer.orders}</TableCell>
                                    <TableCell align="left">{customer.referrals}</TableCell>
                                    <TableCell align="left">{customer.language}</TableCell>
                                    <TableCell align="left">{customer.phone}</TableCell>
                                    <TableCell align="left">{customer.externalID1}</TableCell>
                                    <TableCell align="left">{customer.externalID2}</TableCell>
                                    <TableCell align="left">
                                        {renderStatusChip(customer?.status)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {' '}

                                        {seletedCustomer?.agreementSigned ? (
                                            <Chip label="SIGNED" color="success" variant="outlined" />
                                        ) : (
                                            <Chip label="NOT" color="default" variant="outlined" />
                                        )}
                                    </TableCell>
                                    <TableCell align="left">{customer.agreementId}</TableCell>
                                    <TableCell align="left">{customer.agreementIP}</TableCell>
                                    <TableCell align="left">
                                        {customer.agreementLegalName}
                                    </TableCell>
                                    <TableCell align="left">{customer.agreementTs}</TableCell>
                                    <TableCell align="left">
                                        {formatDate(customer.createdAt)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {formatDate(customer.updatedAt)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {seletedCustomer?.active ? (
                                            <Chip label="ACTIVE" color="success" variant="outlined" />
                                        ) : (
                                            <Chip label="NOT" color="default" variant="outlined" />
                                        )}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontSize: 12 }}>
                                        {customer.country}
                                    </TableCell>
                                    <TableCell align="left">{customer.state}</TableCell>
                                    <TableCell align="left">{customer.city}</TableCell>
                                    <TableCell align="left">{customer.zip}</TableCell>
                                    <TableCell align="left">{customer.addressLine1}</TableCell>
                                    <TableCell align="left">{customer.addressLine2}</TableCell>
                                    <TableCell align="left">{customer.addressLine3}</TableCell>

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
                                                        ...customer,
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
                                                    setSelectedCusomer(customer);
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
                                                    setSelectedCusomer(customer);
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
                                                    setSelectedCusomer(customer);
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
            {/* account replacement handle modal                */}
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
            {/* disable account handle modal                */}
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
                            handleDelete(seletedCustomer.id);
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
                    cleanNewCustomer();
                    setCreateOpen(false);
                }}
                aria-labelledby="form-dialog-title"
                minWidth={700} // Disable automatic resizing
            >
                <DialogTitle id="form-dialog-title">Create new customer</DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ color: 'white' }}></DialogContentText>
                    <ValidatorForm
                        ref={formRef} // Attach the ref to ValidatorForm
                        onSubmit={handleSubmit}
                        onError={() => null}
                    >
                        <TextField
                            autoFocus
                            id="email"
                            type="email"
                            margin="dense"
                            label="Email Address"
                            value={newCustomer.email || ''}
                            onChange={handleChange}
                            name="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            required
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={newCustomer.active}
                                    onChange={handleChange}
                                    name="active"
                                />
                            }
                            label="Active status"
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="First Name"
                            value={newCustomer.firstName || ''}
                            onChange={handleChange}
                            name="firstName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Middle Name"
                            value={newCustomer.middleName || ''}
                            onChange={handleChange}
                            name="middleName"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Last Name"
                            value={newCustomer.lastName || ''}
                            onChange={handleChange}
                            name="lastName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Nick Name"
                            value={newCustomer.nickName || ''}
                            onChange={handleChange}
                            name="nickName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            id="birthday"
                            label="Birthday"
                            value={newCustomer.birthday || ''}
                            type="date"
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="birthday"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Accounts"
                            value={newCustomer.accounts || ''}
                            onChange={handleChange}
                            name="accounts"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Orders"
                            value={newCustomer.orders || ''}
                            onChange={handleChange}
                            name="orders"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Referrals"
                            value={newCustomer.referrals || ''}
                            onChange={handleChange}
                            name="referrals"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="language-label">Language</InputLabel>
                            <Select
                                labelId="language-label"
                                value={newCustomer.language || ''}
                                onChange={handleChange}
                                label="Language"
                                required
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'fr'}>French</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Phone"
                            value={newCustomer.phone || ''}
                            onChange={handleChange}
                            name="phone"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ExternalID1"
                            value={newCustomer.externalID1 || ''}
                            onChange={handleChange}
                            name="externalID1"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ExternalID2"
                            value={newCustomer.externalID2 || ''}
                            onChange={handleChange}
                            name="externalID2"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="language-label">Status</InputLabel>
                            <Select
                                labelId="language-label"
                                value={newCustomer.status || ''}
                                onChange={handleChange}
                                label="Status"
                                name="status"
                                required
                            >
                                <MenuItem value={'allow'}>Allow</MenuItem>
                                <MenuItem value={'pending'}>Pending</MenuItem>
                                <MenuItem value={'block'}>Block</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={newCustomer.agreementSigned}
                                    name="agreementSigned"
                                    onChange={handleChange}
                                />
                            }
                            label="AgreementSigned"
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="AgreementID"
                            value={newCustomer.agreementID || ''}
                            onChange={handleChange}
                            name="agreementID"
                            validators={[]}
                            errorMessages={[]}

                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="text"
                            label="AgreementIP"
                            value={newCustomer.agreementIP || ''}
                            onChange={handleChange}
                            name="agreementIP"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AgreementLegalName"
                            value={newCustomer.agreementLegalName || ''}
                            onChange={handleChange}
                            name="agreementLegalName"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AgreementTs"
                            value={newCustomer.agreementTs || ''}
                            onChange={handleChange}
                            name="agreementTs"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Country"
                            value={newCustomer.country || ''}
                            onChange={handleChange}
                            name="country"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="State"
                            value={newCustomer.state || ''}
                            onChange={handleChange}
                            name="state"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="City"
                            value={newCustomer.city || ''}
                            onChange={handleChange}
                            name="city"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Zip Code"
                            value={newCustomer.zip || ''}
                            onChange={handleChange}
                            name="zip"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine1"
                            value={newCustomer.addressLine1 || ''}
                            onChange={handleChange}
                            name="addressLine1"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine2"
                            value={newCustomer.addressLine2 || ''}
                            onChange={handleChange}
                            name="addressLine2"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine3"
                            value={newCustomer.addressLine3 || ''}
                            onChange={handleChange}
                            name="addressLine3"
                            validators={[]}
                            errorMessages={[]}
                        />
                    </ValidatorForm>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            cleanNewCustomer();
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
                onClose={() => setEditOpen(false)}
                aria-labelledby="form-dialog-title"
                minWidth={700} // Disable automatic resizing
            >
                <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>

                <DialogContent>
                    <ValidatorForm
                        ref={formRef1} // Attach the ref to ValidatorForm
                        onSubmit={handleSubmitEdit}
                        onError={() => null}
                    >
                        <TextField
                            autoFocus
                            id="email"
                            type="email"
                            margin="dense"
                            label="Email Address"
                            value={seletedCustomer?.email || ''}
                            onChange={handleChangeEdit}
                            name="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            required
                        />
                        <TextField
                            autoFocus
                            type={showPassword ? 'text' : 'password'}
                            margin="dense"
                            label="Password"
                            value={seletedCustomer?.password || ''}
                            onChange={handleChangeEdit}
                            name="password"
                            // validators={['isPasswordStrong']}
                            // errorMessages={[
                            //     'Password must be minimum 8 characters, including letters and numbers'
                            // ]}
                            style={{ marginRight: '4px', flex: 1 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {/* <Box display="flex" justifyContent="space-between">
                            <TextField
                                autoFocus
                                type={showPassword ? 'text' : 'password'}
                                margin="dense"
                                label="Password"
                                value={newCustomer.password || ''}
                                onChange={handleChangeEdit}
                                name="password"
                                validators={['required', 'isPasswordStrong']}
                                errorMessages={[
                                    'this field is required',
                                    'Password must be minimum 8 characters, including letters and numbers'
                                ]}
                                style={{ marginRight: '4px', flex: 1 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                autoFocus
                                type="text"
                                margin="dense"
                                label="Confirm Password"
                                value={newCustomer?.confirmPassword || ''}
                                onChange={handleChangeEdit}
                                name="confirmPassword"
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={['this field is required', 'Passwords do not match']}
                                style={{ flex: 1 }}
                            />
                        </Box> */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={seletedCustomer?.active}
                                    onChange={handleChangeEdit}
                                    name="active"
                                />
                            }
                            label="Active status"
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="First Name"
                            value={seletedCustomer?.firstName || ''}
                            onChange={handleChangeEdit}
                            name="firstName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Middle Name"
                            value={seletedCustomer?.middleName || ''}
                            onChange={handleChangeEdit}
                            name="middleName"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Last Name"
                            value={seletedCustomer?.lastName || ''}
                            onChange={handleChangeEdit}
                            name="lastName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Nick Name"
                            value={seletedCustomer?.nickName || ''}
                            onChange={handleChangeEdit}
                            name="nickName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            id="birthday"
                            label="Birthday"
                            value={formatDateFiled(seletedCustomer?.birthday)}
                            type="date"
                            onChange={handleChangeEdit}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="birthday"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Accounts"
                            value={seletedCustomer?.accounts}
                            onChange={handleChangeEdit}
                            name="accounts"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Orders"
                            value={seletedCustomer?.orders}
                            onChange={handleChangeEdit}
                            name="orders"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Referrals"
                            value={seletedCustomer?.referrals}
                            onChange={handleChangeEdit}
                            name="referrals"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="language-label">Language</InputLabel>
                            <Select
                                labelId="language-label"
                                value={seletedCustomer?.language || ''}
                                onChange={handleChangeEdit}
                                label="Language"
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'fr'}>French</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Phone"
                            value={seletedCustomer?.phone || ''}
                            onChange={handleChangeEdit}
                            name="phone"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ExternalID1"
                            value={seletedCustomer?.externalID1 || ''}
                            onChange={handleChangeEdit}
                            name="externalID1"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ExternalID2"
                            value={seletedCustomer?.externalID2 || ''}
                            onChange={handleChangeEdit}
                            name="externalID2"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="language-label">Status</InputLabel>
                            <Select
                                labelId="language-label"
                                value={seletedCustomer?.status || ''}
                                onChange={handleChangeEdit}
                                label="Status"
                                name="status"
                                required
                            >
                                <MenuItem value={'allow'}>Allow</MenuItem>
                                <MenuItem value={'pending'}>Pending</MenuItem>
                                <MenuItem value={'block'}>Block</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={seletedCustomer?.agreementSigned}
                                    name="agreementSigned"
                                    onChange={handleChangeEdit}
                                />
                            }
                            label="AgreementSigned"
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="AgreementID"
                            value={seletedCustomer?.agreementID || ''}
                            onChange={handleChangeEdit}
                            name="agreementID"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="text"
                            label="AgreementIP"
                            value={seletedCustomer?.agreementIP || ''}
                            onChange={handleChangeEdit}
                            name="agreementIP"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AgreementLegalName"
                            value={seletedCustomer?.agreementLegalName || ''}
                            onChange={handleChangeEdit}
                            name="agreementLegalName"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AgreementTs"
                            value={seletedCustomer?.agreementTs || ''}
                            onChange={handleChangeEdit}
                            name="agreementTs"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Country"
                            value={seletedCustomer?.country || ''}
                            onChange={handleChangeEdit}
                            name="country"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="State"
                            value={seletedCustomer?.state || ''}
                            onChange={handleChangeEdit}
                            name="state"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="City"
                            value={seletedCustomer?.city || ''}
                            onChange={handleChangeEdit}
                            name="city"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Zip Code"
                            value={seletedCustomer?.zip || ''}
                            onChange={handleChangeEdit}
                            name="zip"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine1"
                            value={seletedCustomer?.addressLine1 || ''}
                            onChange={handleChangeEdit}
                            name="addressLine1"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine2"
                            value={seletedCustomer?.addressLine2 || ''}
                            onChange={handleChangeEdit}
                            name="addressLine2"
                            validators={[]}
                            errorMessages={[]}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine3"
                            value={seletedCustomer?.addressLine3 || ''}
                            onChange={handleChangeEdit}
                            name="addressLine3"
                            validators={[]}
                            errorMessages={[]}
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
                        onClick={() => formRef1.current.submit()}
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
                <DialogTitle id="responsive-dialog-title">Customer Details</DialogTitle>

                <DialogContent>
                    <Typography>
                        <strong>Email:</strong> &nbsp;&nbsp;
                        {seletedCustomer?.email}
                    </Typography>
                    <Typography>
                        <strong>First Name:</strong>&nbsp;&nbsp; {seletedCustomer?.firstName}
                    </Typography>
                    <Typography>
                        <strong>Middle Name:</strong> &nbsp;&nbsp;{seletedCustomer?.middleName}
                    </Typography>
                    <Typography>
                        <strong>Last Name:</strong> &nbsp;&nbsp;{seletedCustomer?.lastName}
                    </Typography>
                    <Typography>
                        <strong>Nick Name:</strong> &nbsp;&nbsp;{seletedCustomer?.nickName}
                    </Typography>
                    <Typography>
                        <strong>Birthday:</strong> &nbsp;&nbsp;
                        {formatDate(seletedCustomer?.birthday)}
                    </Typography>
                    <Typography>
                        <strong>Accounts:</strong> &nbsp;&nbsp;{seletedCustomer?.accounts}
                    </Typography>
                    <Typography>
                        <strong>Orders:</strong> &nbsp;&nbsp;{seletedCustomer?.orders}
                    </Typography>
                    <Typography>
                        <strong>Referrals:</strong> &nbsp;&nbsp;{seletedCustomer?.referrals}
                    </Typography>
                    <Typography>
                        <strong>Language:</strong> &nbsp;&nbsp;{seletedCustomer?.language}
                    </Typography>
                    <Typography>
                        <strong>Phone:</strong>&nbsp;&nbsp; {seletedCustomer?.phone}
                    </Typography>
                    <Typography>
                        <strong>External Id1:</strong> &nbsp;&nbsp;{seletedCustomer?.externalID1}
                    </Typography>
                    <Typography>
                        <strong>External Id2:</strong>&nbsp;&nbsp; {seletedCustomer?.externalID2}
                    </Typography>
                    <Typography>
                        <strong>Status:</strong> &nbsp;&nbsp;
                        {renderStatusChip(seletedCustomer?.status)}
                    </Typography>
                    <Typography>
                        <strong>Agreement Signed:</strong> &nbsp;&nbsp;
                        {seletedCustomer?.agreementSigned ? (
                            <Chip label="SIGNED" color="success" variant="outlined" />
                        ) : (
                            <Chip label="NOT" color="default" variant="outlined" />
                        )}
                    </Typography>
                    <Typography>
                        <strong>AgreementID:</strong> &nbsp;&nbsp;{seletedCustomer?.agreementID}
                    </Typography>
                    <Typography>
                        <strong>AgreementIP:</strong>&nbsp;&nbsp; {seletedCustomer?.agreementIP}
                    </Typography>
                    <Typography>
                        <strong>Agreement LegalName:</strong>&nbsp;&nbsp;
                        {seletedCustomer?.agreementLegalName}
                    </Typography>
                    <Typography>
                        <strong>AgreementTs:</strong>&nbsp;&nbsp; {seletedCustomer?.agreementTs}
                    </Typography>
                    <Typography>
                        <strong>Created:</strong> &nbsp;&nbsp;
                        {formatDate(seletedCustomer?.createdAt)}
                    </Typography>
                    <Typography>
                        <strong>Last Updated:</strong>&nbsp;&nbsp;{' '}
                        {formatDate(seletedCustomer?.updatedAt)}
                    </Typography>
                    <Typography>
                        <strong>IsActive:</strong>{' '}
                        {seletedCustomer?.active ? (
                            <Chip label="ACTIVE" color="success" variant="outlined" />
                        ) : (
                            <Chip label="NOT" color="default" variant="outlined" />
                        )}
                    </Typography>
                    <Typography>
                        <strong>Country:</strong> &nbsp;&nbsp;{seletedCustomer?.country}
                    </Typography>
                    <Typography>
                        <strong>State:</strong> &nbsp;&nbsp;{seletedCustomer?.state}
                    </Typography>
                    <Typography>
                        <strong>City:</strong> &nbsp;&nbsp;{seletedCustomer?.city}
                    </Typography>
                    <Typography>
                        <strong>Zip:</strong>&nbsp;&nbsp; {seletedCustomer?.zip}
                    </Typography>
                    <Typography>
                        <strong>AddressLine1:</strong> &nbsp;&nbsp;{seletedCustomer?.addressLine1}
                    </Typography>
                    <Typography>
                        <strong>AddressLine2::</strong>&nbsp;&nbsp; {seletedCustomer?.addressLine2}
                    </Typography>
                    <Typography>
                        <strong>AddressLine3:</strong>&nbsp;&nbsp; {seletedCustomer?.addressLine3}
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
                count={customers.length}
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

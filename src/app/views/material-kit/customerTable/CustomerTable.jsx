import { useEffect, useState, forwardRef } from 'react';
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
    Box
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

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Span } from 'app/components/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Fullscreen } from '@mui/icons-material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 20, paddingRight: 0, fontSize: 18, color: 'blue' } }
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

const subscribarList = [
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    },
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    },
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    },
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    },
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    },
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    },
    {
        archived: true,
        email: 'test@gmail',
        title: 'trading',
        FName: 'Carlos',
        LName: 'Jin',
        NName: 'Batman',
        birth: '09/08/2024',
        accounts: '3',
        orders: '1',
        referrals: '0',
        lang: 'Spanish,English',
        phone: '+01506123851',
        Ext_id1: '',
        Ext_id2: '',
        status: 'Pending Kyc',
        agreementSigned: '',
        agreementId: '',
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        created: '26/06/2024',
        lastUpdate: '09/08/2024',
        active: true,
        country: 'USA',
        state: 'Ohio',
        city: 'Racoon',
        zip: '1000',
        Add1: 'CALLE REAL SUBIDA DEL CEMENTERIO CASA NRO 10 URB',
        Add2: '',
        Add3: '',
        plan: '5K Two Phase Test Of Son Alephon Ver 1'
    }
];

export default function PaginationTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [seletedCustomer, setSelectedCusomer] = useState({});
    const [customers, setCustomers] = useState({});
    const [newCustomer, setNewCustomer] = useState({
        email: '',
        password: '',
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
        status: '',
        agreementSigned: true,
        agreementIP: '',
        agreementLegalName: '',
        agreementTs: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        createdAt: '',
        updateAt: ''
    });
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

    const handleCreateOpen = () => setCreateOpen(true);

    useEffect(() => {
        fetchCustomer();
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
    const handleSubmit = (event) => {
        console.log('submitted');
        console.log(event);
    };

    const handleChange = (event) => {
        event.persist();
        if (event.target.name === 'active') {
            setNewCustomer({ ...newCustomer, [event.target.name]: event.target.checked });
            console.log(newCustomer.active, event.target.checked);
            return;
        }
        setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
    };

    const handleDateChange = (birthday) => setNewCustomer({ ...newCustomer, birthday });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 530 }}>
                <StyledTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Email
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                First &nbsp; Name
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                Last &nbsp; Name
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                Nick &nbsp; Name
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
                            <TableCell align="left" sx={{ width: '90px' }}>
                                External ld1
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                External ld2
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Status
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement Signed
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement ID
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement IP
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement LegalName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Agreement Ts
                            </TableCell>
                            <TableCell align="left" sx={{ width: '85px', paddingLeft: '20px' }}>
                                Created
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Last &nbsp;&nbsp;&nbsp; Updated
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
                        {subscribarList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((subscriber, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell align="center">{subscriber.email}</TableCell>
                                    <TableCell align="center">{subscriber.FName}</TableCell>
                                    <TableCell align="center">{subscriber.LName}</TableCell>
                                    <TableCell align="center">{subscriber.NName}</TableCell>
                                    <TableCell align="center">{subscriber.birth}</TableCell>
                                    <TableCell align="center">{subscriber.accounts}</TableCell>
                                    <TableCell align="center">{subscriber.orders}</TableCell>
                                    <TableCell align="center">{subscriber.referrals}</TableCell>
                                    <TableCell align="center">{subscriber.lang}</TableCell>
                                    <TableCell align="center">{subscriber.phone}</TableCell>
                                    <TableCell align="center">{subscriber.Ext_id1}</TableCell>
                                    <TableCell align="center">{subscriber.Ext_id2}</TableCell>
                                    <TableCell align="center">{subscriber.status}</TableCell>
                                    <TableCell align="center">
                                        {subscriber.agreementSigned}
                                    </TableCell>
                                    <TableCell align="center">{subscriber.agreementId}</TableCell>
                                    <TableCell align="center">{subscriber.agreementIP}</TableCell>
                                    <TableCell align="center">
                                        {subscriber.agreementLegalName}
                                    </TableCell>
                                    <TableCell align="center">{subscriber.agreementTs}</TableCell>
                                    <TableCell align="center">{subscriber.created}</TableCell>
                                    <TableCell align="center">{subscriber.lastUpdate}</TableCell>
                                    <TableCell align="center">{subscriber.active}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: 12 }}>
                                        {subscriber.country}
                                    </TableCell>
                                    <TableCell align="center">{subscriber.state}</TableCell>
                                    <TableCell align="center">{subscriber.city}</TableCell>
                                    <TableCell align="center">{subscriber.zip}</TableCell>
                                    <TableCell align="center">{subscriber.Add1}</TableCell>
                                    <TableCell align="center">{subscriber.Add2}</TableCell>
                                    <TableCell align="center">{subscriber.Add3}</TableCell>

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
                <DialogTitle id="alert-dialog-slide-title">
                    Use Google's location service?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        this is account remove
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setRemoveOpen(false)} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => setRemoveOpen(false)} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            {/* This is create modal with responsive strategy */}

            <Dialog
                fullWidth
                open={openCreate}
                onClose={() => setCreateOpen(false)}
                aria-labelledby="form-dialog-title"
                minWidth={700} // Disable automatic resizing
                // sx={{
                //     width: 700
                // }}
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ color: 'white' }}></DialogContentText>
                    <ValidatorForm>
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
                        />
                        <Box display="flex" justifyContent="space-between">
                            <TextField
                                autoFocus
                                type="password"
                                margin="dense"
                                label="Password"
                                value={''}
                                onChange={handleChange}
                                name="password"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                style={{ marginRight: '10px', flex: 1 }}
                            />
                            <TextField
                                autoFocus
                                type="text"
                                margin="dense"
                                label="Confirm Password"
                                value={''}
                                onChange={handleChange}
                                name="confirmPassword"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                style={{ flex: 1 }}
                            />
                        </Box>
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
                            value={''}
                            onChange={handleChange}
                            name="firtName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Middle Name"
                            value={''}
                            onChange={handleChange}
                            name="middleName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Last Name"
                            value={''}
                            onChange={handleChange}
                            name="lastName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Nick Name"
                            value={''}
                            onChange={handleChange}
                            name="nickName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            id="birthday"
                            label="Birthday"
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
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Accounts"
                            value={''}
                            onChange={handleChange}
                            name="accounts"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Orders"
                            value={''}
                            onChange={handleChange}
                            name="orders"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Referrals"
                            value={''}
                            onChange={handleChange}
                            name="referrals"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="language-label">Language</InputLabel>
                            <Select
                                labelId="language-label"
                                value={''}
                                onChange={handleChange}
                                label="Language"
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'fr'}>French</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Phone"
                            value={''}
                            onChange={handleChange}
                            name="phone"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ExternalID1"
                            value={''}
                            onChange={handleChange}
                            name="externalID1"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="ExternalID2"
                            value={''}
                            onChange={handleChange}
                            name="externalID2"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="language-label">Status</InputLabel>
                            <Select
                                labelId="language-label"
                                value={newCustomer.status}
                                onChange={handleChange}
                                label="Language"
                            >
                                <MenuItem value={'pending'}>Pending</MenuItem>
                                <MenuItem value={'allow'}>Allow</MenuItem>
                                <MenuItem value={'block'}>Block</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} />}
                            label="AgreementSigned"
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="AgreementID"
                            value={''}
                            onChange={handleChange}
                            name="agreementID"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="text"
                            label="AgreementIP"
                            value={''}
                            onChange={handleChange}
                            name="agreementIP"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AgreementLegalName"
                            value={''}
                            onChange={handleChange}
                            name="agreementLegalName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AgreementTs"
                            value={''}
                            onChange={handleChange}
                            name="agreementTs"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Country"
                            value={''}
                            onChange={handleChange}
                            name="country"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="State"
                            value={''}
                            onChange={handleChange}
                            name="state"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="City"
                            value={''}
                            onChange={handleChange}
                            name="city"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Zip Code"
                            value={''}
                            onChange={handleChange}
                            name="zip"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine1"
                            value={''}
                            onChange={handleChange}
                            name="addressLine1"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine2"
                            value={''}
                            onChange={handleChange}
                            name="addressLine2"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="AddressLine3"
                            value={''}
                            onChange={handleChange}
                            name="addressLine3"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </ValidatorForm>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setCreateOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                    </Button>
                </DialogActions>
            </Dialog>

            {/* This is edit modal with responsive strategy */}
            <Dialog
                fullScreen={fullScreen}
                open={openEdit}
                onClose={() => setEditOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Use Google's location service?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>This is Edit modal</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setEditOpen(false)} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => setEditOpen(false)} color="primary" autoFocus>
                        Agree
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
                <DialogTitle id="responsive-dialog-title">
                    Use Google's location service?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>This is View modal</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setViewOpen(false)} color="primary">
                        Disagree
                    </Button>
                </DialogActions>
            </Dialog>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={subscribarList.length}
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

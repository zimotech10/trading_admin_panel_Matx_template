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
        displayName: 'John Doe',
        customerEmail: 'john@gmail.com',
        companyEmail: 'johnCompany@gmail.com',
        plan : 'Standard',
        currentEquity: 100000,
        leverage: 2,
        type: 'Live',
        dailyDrawdown: 500,
        totalDrawdown: 2000,
        totalTarget: 2000,
        profitShare: 20,
        allow: 'allow',
        blockReason:'',
        breached: false,
        breachedReason: '',
        tradeSystem: 'SystemA',
        createdAt: '',
        updatedAt: '',
    },
];

export default function PaginationTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [seletedAccount, setSelectedAccount] = useState({});
    const [accounts, setAccounts] = useState({});
    const [newAccount, setNewAccount] = useState({
        displayName: '',
        customerEmail: '',
        companyEmail: '',
        plan : '',
        currentEquity: 0,
        leverage: 1,
        type: '',
        dailyDrawdown: 0,
        totalDrawdown: 0,
        totalTarget: 0,
        profitShare: 0,
        allow: 'allow',
        blockReason:'',
        breached: '',
        breachedReason: '',
        tradeSystem: '',
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
            .get('/getAccounts', {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setAccounts(res.data.customers);
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
        console.log('submitted', newAccount);
    };

    const handleChange = (event) => {
        console.log("this is")
        event.persist();
        setNewAccount({ ...newAccount, [event.target.name]: event.target.value });
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 530 }}>
                <StyledTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '150px' }}>
                                Display &nbsp; Name
                            </TableCell>
                            <TableCell align="left" sx={{ width: '170px' }}>
                                Customer &nbsp; Email
                            </TableCell>
                            <TableCell align="left" sx={{ width: '180px' }}>
                                Company &nbsp; Email
                            </TableCell>
                            <TableCell align="left" sx={{ width: '80px' }}>
                                Plan
                            </TableCell>
                            <TableCell align="left" sx={{ width: '150px' }}>
                                Current Equity
                            </TableCell>
                            <TableCell align="left" sx={{ width: '110px' }}>
                                Leverage
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Type
                            </TableCell>
                            <TableCell align="left" sx={{ width: '160px' }}>
                                Daily  Drawdown
                            </TableCell>
                            <TableCell align="left" sx={{ width: '160px' }}>
                                Total Drawdown
                            </TableCell>
                            <TableCell align="left" sx={{ width: '140px' }}>
                                Total &nbsp; Target
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Profit Share
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Allow
                            </TableCell>
                            <TableCell align="left" sx={{ width: '140px' }}>
                                Block Reason
                            </TableCell>
                            <TableCell align="left" sx={{ width: '120px' }}>
                                Breached
                            </TableCell>
                            <TableCell align="left" sx={{ width: '170px' }}>
                                Breached Reason
                            </TableCell>
                            <TableCell align="left" sx={{ width: '140px' }}>
                                Trade System
                            </TableCell>
                            <TableCell align="left" sx={{ width: '85px', paddingLeft: '20px' }}>
                                Created
                            </TableCell>
                            <TableCell align="left" sx={{ width: '130px' }}>
                                Last Updated
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
                                    <TableCell align="center">{subscriber.displayName}</TableCell>
                                    <TableCell align="center">{subscriber.customerEmail}</TableCell>
                                    <TableCell align="center">{subscriber.companyEmail}</TableCell>
                                    <TableCell align="center">{subscriber.plan}</TableCell>
                                    <TableCell align="center">{subscriber.currentEquity}</TableCell>
                                    <TableCell align="center">{subscriber.leverage}</TableCell>
                                    <TableCell align="center">{subscriber.type}</TableCell>
                                    <TableCell align="center">{subscriber.dailyDrawdown}</TableCell>
                                    <TableCell align="center">{subscriber.totalDrawdown}</TableCell>
                                    <TableCell align="center">{subscriber.totalTarget}</TableCell>
                                    <TableCell align="center">{subscriber.profitShare}</TableCell>
                                    <TableCell align="center">{subscriber.allow}</TableCell>
                                    <TableCell align="center">{subscriber.blockReason}</TableCell>
                                    <TableCell align="center">{subscriber.breached}</TableCell>
                                    <TableCell align="center">{subscriber.breachedReason}</TableCell>
                                    <TableCell align="center">{subscriber.tradeSystem}</TableCell>
                                    <TableCell align="center">{subscriber.createdAt}</TableCell>
                                    <TableCell align="center">{subscriber.updatedAt}</TableCell>
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
                            type="text"
                            margin="dense"
                            label="Display Name"
                            value={''}
                            onChange={handleChange}
                            name="displayName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            id="email"
                            type="email"
                            margin="dense"
                            label="Customer Email Address"
                            value={newAccount.customerEmail || ''}
                            onChange={handleChange}
                            name="customerEmail"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                         <TextField
                            autoFocus
                            id="email"
                            type="email"
                            margin="dense"
                            label="Company Email Address"
                            value={newAccount.companyEmail || ''}
                            onChange={handleChange}
                            name="companyEmail"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Plan"
                            value={''}
                            onChange={handleChange}
                            name="plan"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Current Equity"
                            value={''}
                            onChange={handleChange}
                            name="currentEquity"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Leverage"
                            value={''}
                            onChange={handleChange}
                            name="leverage"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="type">Type</InputLabel>
                            <Select
                                labelId="type"
                                value={''}
                                onChange={handleChange}
                                label="Type"
                            >
                                <MenuItem value={'Phase1'}>Phase1</MenuItem>
                                <MenuItem value={'Phase2'}>Phase2</MenuItem>
                                <MenuItem value={'Live'}>Live</MenuItem>
                                </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Daily Drawdown"
                            value={''}
                            onChange={handleChange}
                            name="dailyDrawdown"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Total Drawdown"
                            value={''}
                            onChange={handleChange}
                            name="totalDrawdown"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Total Target"
                            value={''}
                            onChange={handleChange}
                            name="totalTarget"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Profit Share"
                            value={''}
                            onChange={handleChange}
                            name="profitShare"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Allow"
                            value={''}
                            onChange={handleChange}
                            name="allow"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="text"
                            margin="dense"
                            label="Block Reason"
                            value={''}
                            onChange={handleChange}
                            name="blockReason"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Breached"
                            value={''}
                            onChange={handleChange}
                            name="breached"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="breachedReason">Breached Reason</InputLabel>
                            <Select
                                labelId="breachedReason"
                                value={''}
                                onChange={handleChange}
                                label="Breached Reason"
                            >
                                <MenuItem value={'DailyDrawdown'}>Daily Drawdown</MenuItem>
                                <MenuItem value={'TotalDrawdown'}>Total Drawdown</MenuItem>
                                <MenuItem value={'TotalGoal'}>Total Goal</MenuItem>
                                <MenuItem value={'None'}>None</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: '100%',  marginTop:'15px'}}>
                            <InputLabel id="tradeSystem">Trade System</InputLabel>
                            <Select
                                labelId="tradeSystem"
                                value={''}
                                onChange={handleChange}
                                label="Trade System"
                            >
                                <MenuItem value={'MT4'}>MT4</MenuItem>
                                <MenuItem value={'LaserTrader'}>LaserTrader</MenuItem>
                            </Select>
                        </FormControl>
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

                    <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
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

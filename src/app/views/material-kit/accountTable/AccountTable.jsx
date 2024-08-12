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
import { useRef } from 'react';
import { Typography } from '@mui/material';
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
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
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
    const [selectedAccount, setSelectedAccount] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({
        customerEmail: '',
        // companyEmail: '',
        planName: '',
        tradeSystem: '',
        displayName: ''
    });
    const formRef = useRef(null);
    const token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState(null);
    // modal manipulatino states
    const [openCredential, setCredentialOpen] = useState(false);
    const [openDisable, setDisableOpen] = useState(false);
    const [openRemove, setRemoveOpen] = useState(false);
    const [openView, setViewOpen] = useState(false);
    const [openCreate, setCreateOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [plans, setPlans] = useState([]);

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
                setAccounts(res.data.accounts);
                showSnackbar('Fetch Accounts successfully', 'success');
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized! Please log in again.');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                }
                console.error('There was an error making the GET request!', error);
            });
        axios
            .get('/getCustomers', {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setCustomers(res.data.customers);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized! Please log in again.');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                }
            })
        axios
            .get('/getPlans', {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setPlans(res.data.plans);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized! Please log in again.');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                }
            })
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //form OPs
    const handleCreateSubmit = () => {
        console.log('submitted', newAccount);
        setCreateOpen(false);
        axios
            .post('/createAccount', newAccount, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                fetchCustomer();
                showSnackbar('Create Account successfully', 'success');
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized! Please log in again.');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                }
                console.log('this is the create error', error);
            });
    };

    const handleRemoveSubmit = () => {
        setRemoveOpen(false);
        console.log('this is the delete', selectedAccount.id);
        axios
            .post(
                '/deleteAccount',
                { accountId: selectedAccount.id },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchCustomer();
                showSnackbar('Delete Account successfully', 'success');
            })
            .catch((error) => {
                console.log('this is the delete error', error);
            });
    };

    const handleChange = (event) => {
        if (event.target.name === 'allow' || event.target.name === 'breached') {
            setNewAccount({ ...newAccount, [event.target.name]: event.target.checked });
            return;
        }
        setNewAccount({ ...newAccount, [event.target.name]: event.target.value });
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 530 }}>
                <StyledTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '150px' }}>
                                DisplayName
                            </TableCell>
                            <TableCell align="left" sx={{ width: '170px' }}>
                                Customer &nbsp; Email
                            </TableCell>
                            {/* <TableCell align="left" sx={{ width: '200px' }}>
                                Company &nbsp; Email
                            </TableCell> */}
                            <TableCell align="left" sx={{ width: '80px' }}>
                                Plan
                            </TableCell>
                            <TableCell align="left" sx={{ width: '150px' }}>
                                Current Equity
                            </TableCell>
                            <TableCell align="left" sx={{ width: '150px' }}>
                                Balance
                            </TableCell>
                            <TableCell align="left" sx={{ width: '150px' }}>
                                DailyDrawdown
                            </TableCell>
                            <TableCell align="left" sx={{ width: '110px' }}>
                                Leverage
                            </TableCell>
                            <TableCell align="left" sx={{ width: '90px' }}>
                                Type
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
                            <TableCell align="left" sx={{ width: '100px', paddingLeft: '20px' }}>
                                CreatAt
                            </TableCell>
                            <TableCell align="left" sx={{ width: '130px' }}>
                                UpdatedAt
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    marginLeft: '20px',
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
                        {accounts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((account, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell align="left">{account.displayName}</TableCell>
                                    <TableCell align="left">{account.customerEmail}</TableCell>
                                    {/* <TableCell align="left">{account.companyEmail}</TableCell> */}
                                    <TableCell align="left">{account.plan}</TableCell>
                                    <TableCell align="left">{account.currentEquity}</TableCell>
                                    <TableCell align="left">{account.balance}</TableCell>
                                    <TableCell align="left">{account.dailyDrawdown}</TableCell>
                                    <TableCell align="left">{account.leverage}</TableCell>
                                    <TableCell align="left">{account.type}</TableCell>
                                    <TableCell align="left">{account.profitShare}</TableCell>
                                    <TableCell align="left">
                                        {account.allow ? 'Allow' : 'Prohibit'}
                                    </TableCell>
                                    <TableCell align="left">{account.blockReason}</TableCell>
                                    <TableCell align="left">
                                        {account.breached ? 'Breached' : 'Secured'}
                                    </TableCell>
                                    <TableCell align="left">{account.breachedReason}</TableCell>
                                    <TableCell align="left">{account.tradeSystem}</TableCell>
                                    <TableCell align="left">
                                        {formatDate(account.createdAt)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {formatDate(account.updatedAt)}
                                    </TableCell>
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
                                                    setViewOpen(true);
                                                    setSelectedAccount(account);
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
                                                    setSelectedAccount(account);
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
                    Do you remove this account really?
                </DialogTitle>

                <DialogContent>
                    <Typography>
                        <strong>Display Name:</strong> {selectedAccount.displayName}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {selectedAccount.customerEmail}
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setRemoveOpen(false)} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => handleRemoveSubmit()} color="primary">
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
            // sx={{
            //     width: 700
            // }}
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ color: 'white' }}></DialogContentText>
                    <ValidatorForm ref={formRef} onSubmit={handleCreateSubmit} onError={() => null}>
                        <FormControl style={{ width: '100%', marginTop: '15px' }}>
                            <SelectValidator
                                fullWidth
                                labelId="Customer Email Address"
                                value={newAccount.customerEmail || ''}
                                onChange={handleChange}
                                label="Customer Email Address"
                                name="customerEmail"
                                validators={['required']}
                                errorMessages={['This field is required']}
                            >
                                {customers?.map((customer, index) => (
                                    <MenuItem key={index} value={customer.email}>
                                        {customer.email}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                        </FormControl>
                        {/* <TextField
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
                        /> */}

                        <FormControl style={{ width: '100%', marginTop: '15px' }}>
                            <SelectValidator
                                fullWidth
                                labelId="Plans"
                                value={newAccount.planName || ''}
                                onChange={handleChange}
                                label="PlanName"
                                name="planName"
                                validators={['required']}
                                errorMessages={['This field is required']}
                            >
                                {plans?.map((plan, index) => (
                                    <MenuItem key={index} value={plan.name}>
                                        {plan.name}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                        </FormControl>
                        <FormControl style={{ width: '100%', marginTop: '15px' }}>
                            <SelectValidator
                                fullWidth
                                labelId="tradeSystem"
                                value={newAccount.tradeSystem || ''}
                                onChange={handleChange}
                                label="Trade System"
                                name="tradeSystem"
                                validators={['required']}
                                errorMessages={['This field is required']}
                            >
                                <MenuItem value={'MT4'}>MT4</MenuItem>
                                <MenuItem value={'LaserTrade'}>LaserTrade</MenuItem>
                            </SelectValidator>
                        </FormControl>
                        {newAccount.tradeSystem === 'MT4' && (
                            <TextField
                                autoFocus
                                type="text"
                                margin="dense"
                                label="Display Name"
                                value={newAccount.displayName || ''}
                                onChange={handleChange}
                                name="displayName"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                style={{ marginTop: '15px' }}
                            />
                        )}
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

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => formRef.current.submit()}
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
                <DialogTitle id="responsive-dialog-title">Account Details</DialogTitle>

                <DialogContent>
                    <Typography>
                        <strong>Display Name:</strong> {selectedAccount.displayName}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {selectedAccount.customerEmail}
                    </Typography>
                    {/* <Typography>
                        <strong>Company Email:</strong> {selectedAccount.companyEmail}
                    </Typography> */}
                    <Typography>
                        <strong>Plan:</strong> {selectedAccount.plan}
                    </Typography>
                    <Typography>
                        <strong>Current Equity:</strong> {selectedAccount.currentEquity}
                    </Typography>
                    <Typography>
                        <strong>Leverage:</strong> {selectedAccount.leverage}
                    </Typography>
                    <Typography>
                        <strong>Type:</strong> {selectedAccount.type}
                    </Typography>
                    <Typography>
                        <strong>Daily Drawdown:</strong> {selectedAccount.dailyDrawdown}
                    </Typography>
                    <Typography>
                        <strong>Total Drawdown:</strong> {selectedAccount.totalDrawdown}
                    </Typography>
                    <Typography>
                        <strong>Profit Share:</strong> {selectedAccount.profitShare}
                    </Typography>
                    <Typography>
                        <strong>Block Reason:</strong> {selectedAccount.blockReason}
                    </Typography>
                    <Typography>
                        <strong>Breached:</strong> {selectedAccount.breached ? 'Yes' : 'No'}
                    </Typography>
                    <Typography>
                        <strong>Created:</strong>{' '}
                        {new Date(selectedAccount.createdAt).toLocaleString()}
                    </Typography>
                    <Typography>
                        <strong>Last Updated:</strong>{' '}
                        {new Date(selectedAccount.updatedAt).toLocaleString()}
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
                count={accounts.length}
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

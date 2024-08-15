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
import { SimpleCard } from 'app/components';
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

import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';


import Toolbar from '@mui/material/Toolbar';
import { H6 } from 'app/components/Typography';

import { Span } from 'app/components/Typography';
import { Height } from '@mui/icons-material';
import { values } from 'lodash';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0, fontSize: 18, color: 'blue', textTransform: "none", } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, fontWeight: 'bold', textTransform: "none", } }
    }
}));
const StyledTable1 = styled(Table)(() => ({
    whiteSpace: 'pre',
    width: 'auto', // Set the table width to auto
    tableLayout: 'auto', // Allow the table to adjust its layout based on content
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0, fontSize: 18, color: 'blue', textTransform: "none", border: '1px solid #ccc', } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingTop: '0px', paddingLeft: 10, fontWeight: 'bold', textTransform: "none", border: '1px solid #ccc', } }
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
    '& .MuiInputBase-root': {
        height: 38,  // Set height for the input base
        padding: '2px 4px',  // Adjust padding
    },
    '& .MuiInputBase-input': {
        height: '100%',  // Match the height of the input element
        boxSizing: 'border-box',  // Ensure box model is correct
    },
}));

export default function PaginationTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        planName: '',
        planPrice: '',
        phases: [
            {
                phaseName: '',
                fundedPhase: false,
                initialBalance: '',
                initialLeverage: '',
                tradingPeriod: '',
                minTradingDays: '',
                maxDailyLoss: '',
                maxDailyLossType: 'staticDrawdown',
                maxLoss: '',
                profitTarget: '',
                profitSplitBroker: '50',
            }

        ]

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
    const [phaseOpen, setPhaseOpen] = useState(false);
    const [editPhaseOpen, setEditPhaseOpen] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const cleanNewPlan = () => {
        console.log('clean');
        setNewPlan({
            planName: '',
            planPrice: '',
            phases: [
                {
                    phaseName: '',
                    fundedPhase: false,
                    initialBalance: '',
                    initialLeverage: '',
                    tradingPeriod: '',
                    minTradingDays: '',
                    maxDailyLoss: '',
                    maxDailyLossType: 'staticDrawdown',
                    maxLoss: '',
                    profitTarget: '',
                    profitSplitBroker: '50',
                }

            ]

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
    const createPlan = () => {
        setCreateOpen(false);
        setPhaseOpen(true);
    }

    const closePhase = () => {
        setPhaseOpen(false);
    }
    const closeEditPhase = () => {
        setEditPhaseOpen(false);
    }
    const closeViewPhase = () => {
        setViewOpen(false);
    }
    const handleSubmit = () => {
        const { phaseName, initialBalance, initialLeverage, maxDailyLoss, maxLoss, profitTarget } = newPlan.phases[newPlan.phases.length - 1];
        if (phaseName == '' && initialBalance == '' && initialLeverage == '' && maxDailyLoss == '' && maxLoss == '' && profitTarget == '') {
            showSnackbar("Confirm your inputs! Is there any missing?", 'error');
            return;
        }

        axios
            .post('/createPlan', newPlan, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res)
                showSnackbar(res.data.messages, 'success');
                cleanNewPlan();
                setPhaseOpen(false);
                fetchPlan();
            })
            .catch((error) => {
                showSnackbar(error.response.data.message, 'error');
                return;
            });


    };
    const handleSubmitEdit = () => {
        const { phaseName, initialBalance, initialLeverage, maxDailyLoss, maxLoss, profitTarget } = selectedPlan.phases[selectedPlan.phases.length - 1];
        if (phaseName == '' && initialBalance == '' && initialLeverage == '' && maxDailyLoss == '' && maxLoss == '' && profitTarget == '') {
            showSnackbar("Confirm your inputs! Is there any missing?", 'error');
            return;
        }
        axios
            .post(
                '/updatePlan',
                { ...selectedPlan },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchPlan();
                setEditPhaseOpen(false);
                showSnackbar(res.data.message, 'success');
            })
            .catch((error) => {
                showSnackbar(error.response.data.message, 'error');
                return;
            });
    };
    const handleDelete = (id) => {
        axios
            .post(
                '/deletePlan',
                { planID: id },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                fetchPlan();
                showSnackbar(res.data.message, 'success');
            })
            .catch((error) => {
                showSnackbar(error.response.data.message, 'error');
                return;
            });
    };

    const handleChange = (event) => {
        setNewPlan({ ...newPlan, [event.target.name]: event.target.value });
    };
    const handleDetailChange = (event, index) => {
        const { name, value } = event.target;
        if (name === 'fundedPhase') {
            setNewPlan((prevPlan) => {
                const updatedPhases = [...prevPlan.phases];
                updatedPhases[index] = {
                    ...updatedPhases[index],
                    [name]: event.target.checked,
                };

                return {
                    ...prevPlan,
                    phases: updatedPhases,
                };
            })
            return;
        }
        setNewPlan((prevPlan) => {
            const updatedPhases = [...prevPlan.phases];
            updatedPhases[index] = {
                ...updatedPhases[index],
                [name]: value,
            };

            return {
                ...prevPlan,
                phases: updatedPhases,
            };
        });

    };
    const handleDetailChangeEdit = (event, index) => {
        const { name, value } = event.target;
        if (name === 'fundedPhase') {
            setSelectedPlan((prevPlan) => {
                const updatedPhases = [...prevPlan.phases];
                updatedPhases[index] = {
                    ...updatedPhases[index],
                    [name]: event.target.checked,
                };

                return {
                    ...prevPlan,
                    phases: updatedPhases,
                };
            })
            return;
        }
        setSelectedPlan((prevPlan) => {
            const updatedPhases = [...prevPlan.phases];
            updatedPhases[index] = {
                ...updatedPhases[index],
                [name]: value,
            };

            return {
                ...prevPlan,
                phases: updatedPhases,
            };
        });

    };


    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];
    };

    const theme = useTheme();
    const tableFieldsValidater = (field, value) => {

        if (!value) {
            return false;
        }
        return true;

    };

    const increasPhase = () => {
        const newPhase = {
            phaseName: '',
            fundedPhase: false,
            initialBalance: '',
            initialLeverage: '',
            tradingPeriod: '',
            minTradingDays: '',
            maxDailyLoss: '',
            maxDailyLossType: 'staticDrawdown',
            maxLoss: '',
            profitTarget: '',
            profitSplitBroker: '50',
        };
        const lastPhase = newPlan.phases[newPlan.phases.length - 1];
        const fieldsToValidate = {
            phaseName: "Phase Name is required!",
            initialBalance: "Initial Balance is required and must be a number greater than zero!",
            initialLeverage: "Initial Leverage is required and must be a number greater than zero!",
            maxDailyLoss: "Max Daily Loss is required and must be a number greater than zero!",
            maxLoss: "Max Loss is required and must be a number greater than zero!",
            profitTarget: "Profit Target is required and must be a number greater than zero!",
        };

        for (const [field, errorMessage] of Object.entries(fieldsToValidate)) {
            if (!tableFieldsValidater(field, lastPhase[field])) {
                showSnackbar(errorMessage, 'error');
                return;
            }

        }
        if (newPlan.phases.length === 5) {
            showSnackbar("Maximum phase is 5!", 'error');
            return
        }
        // Create a copy of the current phases array and add the new phase
        setNewPlan(prevState => ({
            ...prevState,
            phases: [...prevState.phases, newPhase]
        }));

    }

    const removeLatestPhase = () => {
        if (newPlan.phases.length === 1) {
            showSnackbar("At least, you should have one phase!", 'error');
            return
        }
        setNewPlan((prevPlan) => {


            // Create a copy of the phases array
            const updatedPhases = [...prevPlan.phases];
            // Remove the last element from the array
            updatedPhases.pop();
            // Return the new state
            console.log("sdfsdfsdfsdf", newPlan.phases.length)

            return {
                ...prevPlan,
                phases: updatedPhases
            };
        });
    };

    ///edit phase handle handlers

    const increasPhaseEdit = () => {
        const newPhase = {
            phaseName: '',
            fundedPhase: false,
            initialBalance: '',
            initialLeverage: '',
            tradingPeriod: '',
            minTradingDays: '',
            maxDailyLoss: '',
            maxDailyLossType: 'staticDrawdown',
            maxLoss: '',
            profitTarget: '',
            profitSplitBroker: '50',
        };
        const lastPhase = selectedPlan.phases[newPlan.phases.length - 1];
        const fieldsToValidate = {
            phaseName: "Phase Name is required!",
            initialBalance: "Initial Balance is required and must be a number greater than zero!",
            initialLeverage: "Initial Leverage is required and must be a number greater than zero!",
            maxDailyLoss: "Max Daily Loss is required and must be a number greater than zero!",
            maxLoss: "Max Loss is required and must be a number greater than zero!",
            profitTarget: "Profit Target is required and must be a number greater than zero!",
        };

        for (const [field, errorMessage] of Object.entries(fieldsToValidate)) {
            if (!tableFieldsValidater(field, lastPhase[field])) {
                showSnackbar(errorMessage, 'error');
                return;
            }

        }
        if (selectedPlan.phases.length === 5) {
            showSnackbar("Maximum phase is 5!", 'error');
            return
        }
        // Create a copy of the current phases array and add the new phase
        setSelectedPlan(prevState => ({
            ...prevState,
            phases: [...prevState.phases, newPhase]
        }));

    }

    const removeLatestPhaseEdit = () => {
        if (selectedPlan.phases.length === 1) {
            showSnackbar("At least, you should have one phase!", 'error');
            return
        }
        setSelectedPlan((prevPlan) => {
            // Create a copy of the phases array
            const updatedPhases = [...prevPlan.phases];
            // Remove the last element from the array
            updatedPhases.pop();
            // Return the new state

            return {
                ...prevPlan,
                phases: updatedPhases
            };
        });
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 530 }}>
                <StyledTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '100px' }}>
                                Name
                            </TableCell>
                            <TableCell align="left" sx={{ width: '100px' }}>
                                Price
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
                                    width: '30px',
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
                                    <TableCell align="left">{plan.planName}</TableCell>
                                    <TableCell align="left">{plan.planPrice}</TableCell>

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
                                                    setSelectedPlan({
                                                        ...plan,
                                                    });

                                                    setEditPhaseOpen(true);
                                                }}
                                                disableRipple
                                            >
                                                <EditIcon />
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    setSelectedPlan(plan);
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
                                                    setSelectedPlan(plan);
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
                                                    setSelectedPlan(plan);
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
                            handleDelete(selectedPlan.planID);
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
                        onSubmit={createPlan}
                        onError={() => null}
                    >
                        <TextField
                            autoFocus
                            id="name"
                            type="text"
                            margin="dense"
                            label="Input new plan name."
                            value={newPlan?.planName || ''}
                            onChange={handleChange}
                            name="planName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
                        />
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Input new plan price."
                            value={newPlan?.planPrice || ''}
                            onChange={handleChange}
                            name="planPrice"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            required
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
                        }}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
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

            {/* Add phase dialog */}
            <Dialog fullScreen open={phaseOpen} onClose={closePhase} TransitionComponent={Transition}

            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closePhase} aria-label="Close">
                            <CloseIcon />
                        </IconButton>

                        <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>Cancel</H6>

                        <Button color="inherit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Toolbar>
                </AppBar>
                <SimpleCard>
                    <TableContainer sx={{ maxHeight: 780 }}>
                        <StyledTable1 stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '200px' }}>

                                    </TableCell>
                                    {newPlan?.phases.map((_, index) =>
                                        <TableCell align="center" sx={{ width: '300px' }} key={index}>
                                            Phase{index + 1}
                                        </TableCell>)}
                                    <TableCell
                                        align="center"
                                        sx={{
                                            marginLeft: '0px',
                                            width: '140px',
                                            right: 0,
                                            opacity: 0.8,
                                            // backgroundColor: '#9C9C9C'
                                            boxShadow: '-4px 0px 20px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <IconButton
                                            onClick={removeLatestPhase}
                                            sx={{ backgroundColor: '#9C9C9C', }}
                                        >

                                            <RemoveCircleIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                        <IconButton

                                            onClick={increasPhase}
                                            sx={{ backgroundColor: '#9C9C9C', marginLeft: 1 }}

                                        >
                                            <AddCircleIcon sx={{ fontSize: 30 }} />

                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Phase Name*</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField

                                                autoFocus
                                                type="text"
                                                margin="dense"

                                                value={phase.phaseName || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="phaseName"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required

                                            />
                                        </ValidatorForm>
                                    </TableCell>)}

                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Funded Phase</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={phase.fundedPhase}
                                                    name="fundedPhase"
                                                    onChange={(event) => handleDetailChange(event, index)}
                                                />
                                            }

                                        />
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>

                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Initial Balance*</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.initialBalance || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="initialBalance"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Initial Leverage*</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.initialLeverage || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="initialLeverage"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Trading Period</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.tradingPeriod || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="tradingPeriod"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Minimum Trading Days</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="text"
                                                margin="dense"

                                                value={phase.minTradingDays || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="minTradingDays"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max daily Loss(%)*</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm>
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.maxDailyLoss || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="maxDailyLoss"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max Daily Loss Type*</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <FormControl style={{ width: '100%', marginTop: '15px' }} sx={{
                                            '& .MuiInputBase-root': {
                                                height: 38,  // Set height for the input base
                                                padding: '2px 4px',  // Adjust padding
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '100%',  // Match the height of the input element
                                                boxSizing: 'border-box',  // Ensure box model is correct
                                            },
                                        }}>
                                            <Select
                                                fullWidth
                                                labelId="Plans"
                                                value={phase.maxDailyLossType || ''}
                                                onChange={(event) => handleDetailChange(event, index)}

                                                name="maxDailyLossType"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                            >

                                                <MenuItem value="staticDrawdown">
                                                    Static Drawdown
                                                </MenuItem>
                                                <MenuItem value={"trailingDrawdown"}>
                                                    Trailing Drawdown
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max Loss*</TableCell>

                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm>
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.maxLoss || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="maxLoss"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}

                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Profit Target*</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.profitTarget || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="profitTarget"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm >
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Profit Split</TableCell>
                                    {newPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.profitSplitBroker || ''}
                                                onChange={(event) => handleDetailChange(event, index)}
                                                name="profitSplitBroker"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                            </TableBody>
                        </StyledTable1>
                    </TableContainer>
                </SimpleCard>
            </Dialog>



            {/* Edit phase dialog */}
            <Dialog fullScreen open={editPhaseOpen} onClose={closeEditPhase} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeEditPhase} aria-label="Close">
                            <CloseIcon />
                        </IconButton>

                        <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>Cancel</H6>

                        <Button color="inherit" onClick={handleSubmitEdit}>
                            Submit
                        </Button>
                    </Toolbar>
                </AppBar>
                <SimpleCard>
                    <TableContainer sx={{ maxHeight: 780 }}>
                        <StyledTable1 stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '200px' }}>

                                    </TableCell>
                                    {selectedPlan?.phases.map((_, index) =>
                                        <TableCell align="center" sx={{ width: '300px' }} key={index}>
                                            Phase{index + 1}
                                        </TableCell>)}
                                    <TableCell
                                        align="center"
                                        sx={{
                                            marginLeft: '0px',
                                            width: '140px',
                                            right: 0,
                                            opacity: 0.8,
                                            // backgroundColor: '#9C9C9C'
                                            boxShadow: '-4px 0px 20px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <IconButton
                                            onClick={removeLatestPhaseEdit}
                                            sx={{ backgroundColor: '#9C9C9C', }}
                                        >

                                            <RemoveCircleIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                        <IconButton

                                            onClick={increasPhaseEdit}
                                            sx={{ backgroundColor: '#9C9C9C', marginLeft: 1 }}

                                        >
                                            <AddCircleIcon sx={{ fontSize: 30 }} />

                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Phase Name*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField

                                                autoFocus
                                                type="text"
                                                margin="dense"

                                                value={phase.phaseName || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="phaseName"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required

                                            />
                                        </ValidatorForm>
                                    </TableCell>)}

                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Funded Phase</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={phase.fundedPhase}
                                                    name="fundedPhase"
                                                    onChange={(event) => handleDetailChangeEdit(event, index)}
                                                />
                                            }

                                        />
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>

                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Initial Balance*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.initialBalance || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="initialBalance"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Initial Leverage*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.initialLeverage || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="initialLeverage"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Trading Period</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.tradingPeriod || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="tradingPeriod"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Minimum Trading Days</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="text"
                                                margin="dense"

                                                value={phase.minTradingDays || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="minTradingDays"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max daily Loss(%)*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm>
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.maxDailyLoss || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="maxDailyLoss"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max Daily Loss Type*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <FormControl style={{ width: '100%', marginTop: '15px' }} sx={{
                                            '& .MuiInputBase-root': {
                                                height: 38,  // Set height for the input base
                                                padding: '2px 4px',  // Adjust padding
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '100%',  // Match the height of the input element
                                                boxSizing: 'border-box',  // Ensure box model is correct
                                            },
                                        }}>
                                            <Select
                                                fullWidth
                                                labelId="Plans"
                                                value={phase.maxDailyLossType || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}

                                                name="maxDailyLossType"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                            >

                                                <MenuItem value="staticDrawdown">
                                                    Static Drawdown
                                                </MenuItem>
                                                <MenuItem value={"trailingDrawdown"}>
                                                    Trailing Drawdown
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max Loss*</TableCell>

                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm>
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.maxLoss || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="maxLoss"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}

                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Profit Target*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.profitTarget || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="profitTarget"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm >
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Profit Split</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.profitSplitBroker || ''}
                                                onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="profitSplitBroker"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                            </TableBody>
                        </StyledTable1>
                    </TableContainer>
                </SimpleCard>
            </Dialog>

            {/* View phase dialog */}
            <Dialog fullScreen open={openView} onClose={closeViewPhase} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeViewPhase} aria-label="Close">
                            <CloseIcon />
                        </IconButton>

                        <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>Cancel</H6>
                        {/* 
                        <Button color="inherit" onClick={handleSubmitEdit}>
                            Submit
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <SimpleCard>
                    <TableContainer sx={{ maxHeight: 780 }}>
                        <StyledTable1 stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '200px' }}>

                                    </TableCell>
                                    {selectedPlan?.phases.map((_, index) =>
                                        <TableCell align="center" sx={{ width: '300px' }} key={index}>
                                            Phase{index + 1}
                                        </TableCell>)}
                                    <TableCell
                                        align="center"
                                        sx={{
                                            marginLeft: '0px',
                                            width: '140px',
                                            right: 0,
                                            opacity: 0.8,
                                            // backgroundColor: '#9C9C9C'
                                            boxShadow: '-4px 0px 20px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        {/* <IconButton
                                            onClick={removeLatestPhaseEdit}
                                            sx={{ backgroundColor: '#9C9C9C', }}
                                        >

                                            <RemoveCircleIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                        <IconButton

                                            onClick={increasPhaseEdit}
                                            sx={{ backgroundColor: '#9C9C9C', marginLeft: 1 }}

                                        >
                                            <AddCircleIcon sx={{ fontSize: 30 }} />

                                        </IconButton> */}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Phase Name*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField

                                                autoFocus
                                                type="text"
                                                margin="dense"

                                                value={phase.phaseName || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="phaseName"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required

                                            />
                                        </ValidatorForm>
                                    </TableCell>)}

                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Funded Phase</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={phase.fundedPhase}
                                                    name="fundedPhase"
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                />
                                            }

                                        />
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>

                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Initial Balance*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.initialBalance || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="initialBalance"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Initial Leverage*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.initialLeverage || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="initialLeverage"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Trading Period</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.tradingPeriod || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="tradingPeriod"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Minimum Trading Days</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="text"
                                                margin="dense"

                                                value={phase.minTradingDays || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="minTradingDays"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max daily Loss(%)*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm>
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.maxDailyLoss || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="maxDailyLoss"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max Daily Loss Type*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <FormControl style={{ width: '100%', marginTop: '15px' }} sx={{
                                            '& .MuiInputBase-root': {
                                                height: 38,  // Set height for the input base
                                                padding: '2px 4px',  // Adjust padding
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '100%',  // Match the height of the input element
                                                boxSizing: 'border-box',  // Ensure box model is correct
                                            },
                                        }}>
                                            <Select
                                                fullWidth
                                                labelId="Plans"
                                                value={phase.maxDailyLossType || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}

                                                name="maxDailyLossType"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                            >

                                                <MenuItem value="staticDrawdown">
                                                    Static Drawdown
                                                </MenuItem>
                                                <MenuItem value={"trailingDrawdown"}>
                                                    Trailing Drawdown
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Max Loss*</TableCell>

                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm>
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.maxLoss || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="maxLoss"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}

                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Profit Target*</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.profitTarget || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="profitTarget"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                required
                                            />
                                        </ValidatorForm >
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <TableCell align="center">Profit Split</TableCell>
                                    {selectedPlan?.phases.map((phase, index) => <TableCell align="center" key={index}>
                                        <ValidatorForm >
                                            <TextField
                                                autoFocus
                                                type="number"
                                                margin="dense"

                                                value={phase.profitSplitBroker || ''}
                                                // onChange={(event) => handleDetailChangeEdit(event, index)}
                                                name="profitSplitBroker"
                                                validators={[]}
                                                errorMessages={[]}
                                                required
                                            />
                                        </ValidatorForm>
                                    </TableCell>)}
                                    <TableCell align="center"></TableCell>
                                </TableRow>

                            </TableBody>
                        </StyledTable1>
                    </TableContainer>
                </SimpleCard>
            </Dialog>
        </Paper>
    );
}

import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Tooltip, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface Column {
    id: 'id' | 'name' | 'email';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 50, align: "right" },
    { id: 'email', label: 'Email', minWidth: 50, align: "right" },
];

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const paginationStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = paginationStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const userTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 500,
            maxWidth: 700,
            marginTop: 50,
            marginBottom: theme.spacing(2),
        },
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        toolBarRoot: {
            minHeight: 0,
            minWidth: 0,
            backgroundColor: "#FFCCE5",
            paddingLeft: 0,
            paddingRight: 0,
            width: "100%",

            '& #toolbar-wrap': {
                width: "100%",
                height: "100%",
            }
        },
        topBar: {
            backgroundColor: "#FFBCD5",

            '& #toolbar-title': {
                fontSize: "small",
                paddingLeft: theme.spacing(1),
            }
        },
        toolBar: {
            height: 60,
            clear: "both",

            '& div': {
                display: "inline-block",
            },

            '& #toolbar-textfields': {
                height: 60,

                '& .MuiFormControl-root': {
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: theme.spacing(1),
                },

                '& input': {
                    width: "unset",
                },
            },

            '& #toolbar-buttons': {
                padding: 6,
                float: "right",
                position: "relative",
            },
        },
        error: {
            color: "red",
        },
    })
);

interface Row {
    id: string,
    name: string,
    email: string,
}

export default function UserTable(props: any) {
    const { users, addUser, updateUser, deleteUser, } = props.pass;
    const rows: Row[] = users.sort((a: any, b: any) => { return a.id < b.id ? 1 : a.id > b.id ? -1 : 0 });
    const classes = userTableStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState<Row | null>(null);
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [currentError, setError] = React.useState<any>(null);


    const resetError = () => {
        setError(null);
    }

    const onError = ({ graphQLErrors, networkError }: any) => {
        if (graphQLErrors && graphQLErrors[0]) {
            setError(graphQLErrors[0]);
        } else if (networkError) {
            if (networkError.result.errors) {
                console.log(networkError.result.errors);
                setError(networkError.result.errors[0])
            } else {
                setError(networkError);
            }
        }
    };

    const closeRow = (event: any = null) => {
        resetError();
        setSelected(null);
        setEmail("");
        setName("");
    }

    const handleChangePage = (event: any, newPage: number) => {
        closeRow();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = (event: any, row: Row) => {
        resetError();
        if (selected && selected.id === row.id) {
            closeRow();
        } else {
            setSelected(row);
            setEmail(row.email);
            setName(row.name);
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        resetError();
        setName(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        resetError();
        setEmail(event.target.value);
    };

    const isSelected = (row: Row) => selected ? selected.id === row.id : false;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const currentPageRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    interface Input {
        email: string,
        name: string,
    }

    const setInput = () => {
        let input = {} as Input;
        if (email) { input.email = email }
        if (name) { input.name = name }
        return input;
    };

    //TODO: selectes wrong row, lul
    const onAdd = () => {
        //setSelected(currentPageRows[0]);
    }

    const addRow = async (event: any = null) => {
        resetError();
        addUser({ variables: { input: setInput() } }).catch(onError);
        onAdd();
    }

    const updateRow = (event: any = null) => {
        resetError();
        if (selected) {
            updateUser({ variables: { id: selected.id, input: setInput() } }).catch(onError);
        }
    }

    const deleteRow = (event: any = null) => {
        resetError();
        if (selected) {
            deleteUser({ variables: { id: selected.id } }).catch(onError);
            closeRow();
        }
    }

    let text;
    if (currentError) {
        text = (
            <span className={classes.error}>
                {currentError.message}
            </span>
        )
    } else if (selected) {
        text = (
            <React.Fragment>
                {selected.id}
            </React.Fragment>
        )
    } else {
        text = (
            <React.Fragment>
                What's up?
            </React.Fragment>
        )
    }

    return (
        <div className={classes.alignItemsAndJustifyContent}>
            <TableContainer className={classes.table} component={Paper}>
                <Toolbar className={classes.toolBarRoot}>
                    <div id="toolbar-wrap" >
                        <div className={classes.topBar}>
                            <Typography id="toolbar-title" color="inherit" variant="subtitle1" component="div" >
                                {text}
                            </Typography>
                        </div>
                        <div className={classes.toolBar}>
                            <div id="toolbar-textfields">
                                <TextField value={name} onChange={handleChangeName} label="Name" variant="outlined" />
                                <TextField value={email} onChange={handleChangeEmail} label="Email" variant="outlined" />
                            </div>
                            <div id="toolbar-buttons" >
                                <Tooltip title="Add" key="Add">
                                    <span>
                                        <IconButton onClick={addRow} aria-label="add">
                                            <AddCircleIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Edit" key="Edit">
                                    <span>
                                        <IconButton disabled={!selected} onClick={updateRow} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Delete" key="Delete">
                                    <span>
                                        <IconButton disabled={!selected} onClick={deleteRow} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Close" key="Close">
                                    <span>
                                        <IconButton disabled={!selected} onClick={closeRow} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </Toolbar>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPageRows.map((row) => {
                            const isItemSelected = isSelected(row);
                            return (
                                <TableRow
                                    hover
                                    onClick={(event: any) => handleClick(event, row)}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                    key={row.id}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

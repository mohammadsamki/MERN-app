import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {addUsers, deleteUser, fetchUsers} from '../back/api'; // Add your API update/delete methods here

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const roles = ['Admin', 'User'];
const randomRole = () => {
  return ' User';
};

var initialRows = [
  {
    id: 1,
    username: 'Marvin Farmer',
    phone: 25,

    role: randomRole(),
  },
  {
    id: 2,
    username: 'Marvin Farmer',
    phone: 36,

    role: randomRole(),
  },
  {
    id: 3,
    username: 'Marvin Farmer',
    phone: 19,

    role: randomRole(),
  },
  {
    id: 5,
    username: 'Marvin Farmer',
    phone: 28,

    role: randomRole(),
  },
  {
    id: 4,
    username: 'Marvin Farmer',
    phone: 23,

    role: randomRole(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = initialRows.length+1;
    setRows((oldRows) => [
      ...oldRows,
      { id, username: 'username', phone: '12343', role: 'user', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },

    }

));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [confermDelete, setConfermDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (confermDelete) =>  {
    if (confermDelete && deleteId){
      setRows(rows.filter((row) => row.id !== deleteId));
    await  deleteUser(deleteId)
    }

    setConfermDelete(confermDelete)
    setOpen(false);
  };

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  React.useEffect(()=>{
    fetchUsers().then((res)=>{
        const formattedUsers = res.data.map((user) => ({
          id: user._id,
          username: user.username,
          phone: user.phone,
          role: user.roul || 'N/A',
        }))
        setRows(formattedUsers)
        initialRows=formattedUsers

    })
  },[])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) =>async () => {
    console.log(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const editedRow = rows.find((row) => row.id === id);
    console.log(editedRow.username)
    // if (editedRow.isNew){
    //   const user ={
    //     username:"ali",
    //     phone:123456789,
    //     role:'user',
    //     password:'123456'
    //   }
    //   if (editedRow.isNew){
    //     await addUsers(user)
    //     .then((res)=>{
    //       console.log(res)
    //     })feditf
    //   }
    // }


  };

  const handleDeleteClick = (id) =>async () => {
    setDeleteId(id)
    handleClickOpen()
    // console.log(confermDelete)
    // if(confermDelete){
    //   setRows(rows.filter((row) => row.id !== id));

    // }
    // return

    // await deleteUser(id)
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate =async (newRow) => {
  // alert('row updated')
    console.log(newRow.username)
    if (newRow.isNew){
      // post method here
            const user ={
        username:newRow.username,
        phone:newRow.phone,
        role:newRow.role,
        password:'123456'
      }
              await addUsers(user)
        .then((res)=>{
          console.log(res)
        })

    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log(updatedRow.username)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'username', headerusername: 'username', width: 180, editable: true },
    {
      field: 'phone',
      headerphone: 'phone',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },

    {
      field: 'role',
      headerusername: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Admin', 'User'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerusername: 'Actions',
      width: 100,
      cellClassusername: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
       {/* <React.Fragment> */}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete User data?"}
          {/* {false} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{handleClose(false)}}>
            Disagree
          </Button>
          <Button onClick={()=>{handleClose(true)}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    {/* </React.Fragment> */}
    </Box>
  );
}

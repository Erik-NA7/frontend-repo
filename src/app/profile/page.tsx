"use client";

import styles from "../page.module.css";
import {
  Box,
  FormLabel,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import {  } from "@mui/material";
import { useState } from "react";
import { getUserData, updateUserData } from "@/controller/userController";
import { navigate } from "./action";
import { logout } from "@/controller/userController";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRequest, updateUserFailure, updateUserSuccess } from "@/store/actions";
import type { AppDispatch, RootState } from '@/store/store';
import ReduxProvider from "./Provider";

function Profile() {

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  // const dispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);
  const success = useSelector((state: RootState) => state.success);
  const error = useSelector((state: RootState) => state.error);

  const getData = async() => {
    const res = await getUserData();
    if (res.error) {
      if (res.error == 'Token expired') {
        await logout();
        handleOpen();
      }
    } else if (res.user) {
      setEmail(res.user.email);
      setUsername(res.user.username);
    }
  }

  const updateData = async() => {
    dispatch(updateUserRequest());
    const res = await updateUserData({email, username});
    if (res.error) {
      dispatch(updateUserFailure('Unauthorized'));
      if (res.error == 'Token expired') {
        await logout();
        handleOpen();
      }
    }    
    setEmail(res.user.email);
    setUsername(res.user.username);
    dispatch(updateUserSuccess());
  }

  return (
    <div className={styles.page}>
      <main className={styles.main} style={{ position: 'relative'}}>
        <Button
          onClick={() => getData()}
          variant="contained"
        >Get Data
        </Button>
        { email &&
          <Box
            className={styles.login}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              margin: 'auto',
            }}
          >
           <FormLabel>Email</FormLabel>
            <TextField
              autoFocus
              className={styles.loginInput}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              type="email"
              aria-label="email"
              // helperText={error && 'Please enter a valid email.'}
            />
            <FormLabel>Username</FormLabel>
            <TextField
              className={styles.loginInput}
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              type="text"
              aria-label="username"
              // helperText={error && 'Password is required.'}
            />
            <Button
              onClick={() => updateData()}
              variant="contained"
            >Update Data
            </Button>
            <div style={{ height: '10px' }}>
              <Typography>{ loading ? 'Updating...' : '' }</Typography>
              <Typography color="success.main">{ success && 'Updated' }</Typography>
              <Typography color="error">{ error && 'Update failed' }</Typography>
            </div>
          </Box>
        }
      </main>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Not Authorized</DialogTitle>
        <DialogContent>
          You have to login again
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() =>navigate()} color="primary" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ReduxProvider>
      <Profile />
    </ReduxProvider>
  );
}
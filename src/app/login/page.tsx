"use client";

import styles from "../page.module.css";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormLabel,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { firebaseLogin } from "@/controller/userController";
import Cookies from "js-cookie";
import { User } from "@/entities/user";
import { navigate } from "@/app/components/navigate";


export default function Login() {
  
  const [email, setEmail] = useState<string>('testuser@testmail.com');
  const [password, setPassword] = useState<string>('testusersecret');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required.');
    } else {
      setError('');
      const loginUser = await firebaseLogin(email, password) as unknown as User;
      Cookies.set('accessToken', loginUser.accessToken);
      navigate("/");
    }
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <Box
            className={styles.login}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              margin: 'auto',
              padding: 2,
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
              error={!!error}
              helperText={error && 'Please enter a valid email.'}
            />
            <FormLabel>Password</FormLabel>
            <TextField
              className={styles.loginInput}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              type="password"
              error={!!error}
              helperText={error && 'Password is required.'}
            />

            {error && (
              <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </div>
      </main>
    </div>
  );
}

import { Button } from "@mui/material";
import { auth, provider } from "../firebase/auth";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 Cek user hasil login
      console.log("Google User:", user);

      // 👉 Kamu bisa arahkan ke halaman home
      // navigate("/"); ← kalau pakai useNavigate dari react-router-dom
      navigate('/home');
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth
      onClick={handleGoogleLogin}
      sx={{ mt: 2 }}
    >
      <GoogleIcon sx={{ mr: 1 }} />
      Sign in with Google
    </Button>
  );
};

export default AuthForm;

// import { Button, TextField, Typography, Link as MuiLink } from "@mui/material";
// import { Link } from "react-router-dom";

// const AuthForm = ({
//   inputs,
//   onSubmit,
//   authSubmitText,
//   authBottomText,
//   authBottomLinkText,
//   authBottomLinkTo
// }) => {
//   return (
//     <form onSubmit={onSubmit}>
//       {inputs.map((input) => (
//         <TextField
//           key={input.name}
//           name={input.name}
//           label={input.label}
//           type={input.type}
//           fullWidth
//           required
//           margin="normal"
//         />
//       ))}

//       <Button
//         variant="contained"
//         color="primary"
//         type="submit"
//         fullWidth
//         sx={{ mt: 2 }}
//       >
//         {authSubmitText}
//       </Button>

//       <Typography
//         variant="body2"
//         color="textSecondary"
//         sx={{ mt: 2 }}
//       >
//         {authBottomText}{' '}
//         <MuiLink component={Link} to={authBottomLinkTo} underline="hover">
//           {authBottomLinkText}
//         </MuiLink>
//       </Typography>
//     </form>
//   ); 
// };

// export default AuthForm;

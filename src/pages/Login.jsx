// import { Button } from "@mui/material";
// import { auth, provider } from "../firebase/auth";
// import { signInWithPopup } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

      // 🔥 Cek user hasil login
      // console.log("Google User:", user);

      // 👉 Kamu bisa arahkan ke halaman home
      // navigate("/"); ← kalau pakai useNavigate dari react-router-dom

    // } catch (error) {
    //   console.error("Google Login Error:", error);
    // }
  // };

  return (
    <>
      <AuthHeader
        textAuthTitle={`Welcome Traveler, \nEnjoy The Moment with Us!`}
        textAuthSubtitle="Login to continue your journey"
      />
      <AuthForm />
    </>
    // <Button
    //   variant="outlined"
    //   color="primary"
    //   fullWidth
    //   onClick={handleGoogleLogin}
    //   sx={{ mt: 2 }}
    // >
    //   Sign in with Google
    // </Button>
  );
};

export default Login;



// import AuthForm from "../components/AuthForm";
// import AuthHeader from "../components/AuthHeader";
// import AuthLayout from "../layouts/AuthLayout";

// const Login = () => {
//   const inputs = [
//     { name: 'email', label: "Email", type: "email" },
//     { name: 'password', label: "Password", type: "password" },
//   ];

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const payload = {
//       email: data.get("email"),
//       password: data.get("password"),
//     };
//     console.log("Login Data:", payload);
//   };

//   return (
//     <>
//       <AuthLayout>
//         <AuthHeader
//           textAuthTitle={`Welcome Back Traveler, \nEnjoy The Moment with Us!`}
//           textAuthSubtitle="Login to continue your journey"
//         />
//         <AuthForm
//           inputs={inputs}
//           onSubmit={handleLogin}
//           authSubmitText="Login"
//           authBottomText="Don't have an account?"
//           authBottomLinkText="Register"
//           authBottomLinkTo="/register"
//         />
//       </AuthLayout>
//     </>
//   );
// };

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "../../App.css";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const user = {
      email: data.email,
      name: data.email.split("@")[0],
    };

    localStorage.setItem("authUser", JSON.stringify(user));

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/" className="auth-logo">
          PortfolioAI
        </Link>

        <div className="auth-heading">
          <h1>Welcome back</h1>
          <p>
            Sign in to continue building your portfolio.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label>Email</label>

            <div className="input-wrapper">
              <FiMail />

              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <span className="auth-error">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <div className="password-label">
              <label>Password</label>
              <a href="#">Forgot password?</a>
            </div>

            <div className="input-wrapper">
              <FiLock />

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>

            {errors.password && (
              <span className="auth-error">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary auth-button"
          >
            Sign In
            <FiArrowRight />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "../../App.css";

const schema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must contain at least 2 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters"),
});

function Register() {
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
      name: data.name,
      email: data.email,
    };

    localStorage.setItem(
      "authUser",
      JSON.stringify(user)
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/" className="auth-logo">
          PortfolioAI
        </Link>

        <div className="auth-heading">
          <h1>Create your account</h1>
          <p>
            Start building your professional portfolio today.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label>Full Name</label>

            <div className="input-wrapper">
              <FiUser />

              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
              />
            </div>

            {errors.name && (
              <span className="auth-error">
                {errors.name.message}
              </span>
            )}
          </div>

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
            <label>Password</label>

            <div className="input-wrapper">
              <FiLock />

              <input
                type="password"
                placeholder="Minimum 6 characters"
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
            Create Account
            <FiArrowRight />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
import React, { useDispatch, useEffect } from "components";
import { actionTheme, utilityAction } from "reduxStore";
import { withRouter } from "react-router-dom";
import FormLogin from "./form";
import "./login.css"; // Import the external CSS file

const Login = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionTheme.handleSetPageSidebar(false));
    dispatch(actionTheme.handleSetFooter(false));
    dispatch(actionTheme.handleSetPageHeader(false));
    return () => {
      dispatch(actionTheme.handleSetPageHeader(true));
      dispatch(actionTheme.handleSetPageSidebar(true));
      dispatch(actionTheme.handleSetFooter(true));
      dispatch(actionTheme.handleSetPageHeader(true));
    };
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(utilityAction.setProgres());
    dispatch(
      utilityAction.setLoading({
        content: true,
        button: true,
      })
    );
    setTimeout(() => {
      dispatch(utilityAction.stopLoading());
      props.history.push("/form-control");
    }, 4000);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        
          <div className="card-header text-center">
            <div className="h1">
              <b>LOGIN</b>
            </div>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Login ke akun pegawai</p>
            <FormLogin onSubmit={(data) => handleSubmit(data)} />
          </div>
        
      </div>
    </div>
  );
};

export default withRouter(Login);

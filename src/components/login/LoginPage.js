import React from "react";
import { connect } from "react-redux";
import { doGoogleLoginAction, logoutAction } from "../../redux/userDuck";
import styles from "./login.module.css";

function LoginPage({ fetching, loggedIn, doGoogleLoginAction, logoutAction }) {
  // handlers
  const doLogin = () => doGoogleLoginAction();
  const doLogout = () => logoutAction();

  if (fetching) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className={styles.container}>
      {loggedIn ? (
        <>
          <h1>Cierra tu sesión</h1>
          <button onClick={doLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <h1>Inicia Sesión con Google</h1>
          <button onClick={doLogin}>Iniciar</button>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ user: { fetching, loggedIn } }) => {
  return {
    fetching,
    loggedIn,
  };
};

export default connect(mapStateToProps, { doGoogleLoginAction, logoutAction })(
  LoginPage
);

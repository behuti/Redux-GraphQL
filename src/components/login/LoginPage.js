import React from "react";
import { connect } from "react-redux";
import { doGoogleLoginAction } from "../../redux/userDuck";
import styles from "./login.module.css";

function LoginPage({ user, doGoogleLoginAction }) {
  // handlers
  const doLogin = () => doGoogleLoginAction();

	if (user.fetching) {
		return (<h2>Cargando...</h2>)
	}

  return (
    <div className={styles.container}>
      <h1>Inicia Sesión con Google</h1>
      <h1>Cierra tu sesión</h1>
      <button onClick={doLogin}>Iniciar</button>
      <button>Cerrar Sesión</button>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps, { doGoogleLoginAction })(LoginPage);

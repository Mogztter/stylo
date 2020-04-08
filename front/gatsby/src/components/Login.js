import React from "react"
import { navigate} from "gatsby"
import { connect } from "react-redux"

import env from '../helpers/env'
import styles from './login.module.scss'

const mapStateToProps = (state) => {
    const { logedIn, activeUser } = state
    return { logedIn, activeUser }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch({ type: 'LOGIN', login: data }),
        logout: () => dispatch({ type: 'LOGOUT' })
    }
}

const ConnectedLogin = ({logedIn}) => {
    const isBrowser = typeof window !== 'undefined';

    if(isBrowser && logedIn){
        navigate('/articles')
    }

    return (<>
        <section className={styles.disclaimer}>
          <p>Looking for technical and editing support?<br/>Join the <a href="https://ecrituresnumeriques.ca/en/2019/10/25/Stylo-technical-and-editing-support" target="_blank">weekly session</a> for Stylo users.</p>
        </section>

        <section className={styles.box}>
            <h1>Login</h1>
            <p>
                <a className={styles.humanNumCreateAccountBtn} href={env.HUMAN_ID_REGISTER_ENDPOINT}>Create a Human-Num account</a>
            </p>

            <p>
                <a className={styles.humanNumConnectBtn} href={env.BACKEND_ENDPOINT + '/login'}>Connect with Human-Num</a>
            </p>
        </section>
    </>)
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedLogin)

export default Login
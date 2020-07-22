import React, { useCallback } from 'react'
import styles from './styles.module.css'
import { useState } from 'react'

type SetComponentState = (values: any) => void

interface LoginUiProps {
  renderHeaderComponents?: (
    setComponentState: SetComponentState
  ) => React.ReactNode
  logoUrl?: string
  footer?: React.ReactNode
  onSubmit: (values: any) => void
  btnSubmitStyle?: object
  loginCardStyle?: object
  logoStyle?: object
  renderFooterComponents?: (
    setComponentState: SetComponentState
  ) => React.ReactNode
}

const LoginUi: React.FC<LoginUiProps> = (props) => {
  const {
    renderHeaderComponents,
    renderFooterComponents,
    logoUrl,
    footer,
    logoStyle,
    btnSubmitStyle,
    loginCardStyle
  } = props

  const [errorUsername, setErrorUsername] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [values, setValues] = useState({
    username: '',
    password: '',
    remember: false
  })

  const renderLogo = useCallback(() => {
    const logoToShow = logoUrl || ''
    return (
      <div className={styles.logoContainer}>
        <img
          src={logoToShow}
          alt={''}
          style={logoStyle}
          className={styles.logo}
        />
      </div>
    )
  }, [logoUrl])

  const handleChange = useCallback(
    ({ name, value }) => {
      setValues((old) => {
        return {
          ...old,
          [name]: value
        }
      })
    },
    [values]
  )

  const onSubmit = useCallback(() => {
    const setErrorMessage = (
      valueToCheck: string,
      errorMessage: string,
      setErrorFunction: Function
    ) => {
      if (valueToCheck === '') {
        setErrorFunction(errorMessage)
      } else {
        setErrorFunction('')
      }
    }

    setErrorMessage(values.username, 'Username required', setErrorUsername)
    setErrorMessage(values.password, 'Password required', setErrorPassword)

    if (values.username !== '' && values.password !== '') {
      props.onSubmit(values)
    }
  }, [values])

  return (
    <div style={{ background: '#fafafa' }}>
      <div className={styles.container}>
        {renderLogo()}
        <div className={styles.loginCard} style={loginCardStyle}>
          {renderHeaderComponents && renderHeaderComponents(setValues)}
          <div className={styles.controlContainer}>
            <input
              name={'username'}
              type={'text'}
              onChange={(e) => {
                handleChange({ name: e.target.name, value: e.target.value })
              }}
              className={styles.customInput}
              placeholder={'Username'}
            />
            <div className={styles.errorText}>{errorUsername}</div>
          </div>

          <div className={styles.controlContainer}>
            <input
              name={'password'}
              type={'password'}
              onChange={(e) => {
                handleChange({ name: e.target.name, value: e.target.value })
              }}
              className={styles.customInput}
              placeholder={'Password'}
            />
            <span className={styles.errorText}>{errorPassword}</span>
          </div>

          {renderFooterComponents && renderFooterComponents(setValues)}

          <div className={styles.rememberContainer}>
            <input
              name={'remember'}
              type={'checkbox'}
              id={'remember'}
              onChange={(e) => {
                handleChange({ name: e.target.name, value: e.target.checked })
              }}
            />
            <label htmlFor={'remember'} className={styles.rememberlabel}>
              Remember me
            </label>
          </div>

          <button
            className={styles.btnSubmit}
            style={btnSubmitStyle}
            onClick={() => {
              onSubmit()
            }}
          >
            Login
          </button>
        </div>

        {footer}
      </div>
    </div>
  )
}

export default LoginUi

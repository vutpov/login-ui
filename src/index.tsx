import React, { useCallback } from 'react'
import styles from './styles.module.css'
import { useState } from 'react'

interface LoginUiProps {
  title?: React.ReactNode
  submitButton?: (onSubmit: Function) => React.ReactNode
  logoUrl?: string
  footer?: React.ReactNode
}

const LoginUi: React.FC<LoginUiProps> = (props) => {
  const { title, submitButton, logoUrl, footer } = props

  const [errorUsername] = useState('Username required')
  const [errorPassword] = useState('')

  const onSubmit = useCallback(() => {}, [])

  const renderSubmit = useCallback(() => {
    if (submitButton) {
      return submitButton(onSubmit)
    }

    return (
      <button className={styles.btnSubmit} onClick={() => onSubmit()}>
        Login
      </button>
    )
  }, [submitButton, onSubmit])

  const renderLogo = useCallback(() => {
    const logoToShow = logoUrl || ''
    return (
      <div className={styles.logoContainer}>
        <img src={logoToShow} alt={""}/>
      </div>
    )
  }, [logoUrl])

  return (
    <div className={styles.container}>
      {renderLogo()}
      <div className={styles.loginCard}>
        {title}

        <div className={styles.controlContainer}>
          <input
            name={'username'}
            type={'text'}
            className={styles.customInput}
            placeholder={'Username'}
          />
          <div className={styles.errorText}>{errorUsername}</div>
        </div>

        <div className={styles.controlContainer}>
          <input
            name={'password'}
            type={'password'}
            className={styles.customInput}
            placeholder={'Password'}
          />
          <span className={styles.errorText}>{errorPassword}</span>
        </div>

        <div className={styles.rememberContainer}>
          <input name={'remember'} type={'checkbox'} id={'remember'} />
          <label htmlFor={'remember'} className={styles.rememberlabel}>
            Remember me
          </label>
        </div>
        {renderSubmit()}
      </div>

      {footer}
    </div>
  )
}

export default LoginUi

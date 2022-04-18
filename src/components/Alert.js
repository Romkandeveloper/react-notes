import React, {useContext, useEffect} from 'react';
import {AlertContext} from '../context/alert/alertContext';
import {CSSTransition} from 'react-transition-group'

export const Alert = () => {

    const {alert, hide} = useContext(AlertContext)

    useEffect(() => {
       setTimeout(hide, 5000)
    }, [alert]);

    if(!alert.visible) {
        return null;
    }

    return (

            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
              <strong>Attention!</strong> {alert.text}
              <button onClick={hide} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

    )
}
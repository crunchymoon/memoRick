import React from 'react';
import styles from '../styles/Skeleton.module.scss'

const Skeleton = ({type})=>{ 
    const classes = `${styles[type]} ${styles.skeleton}`
    return (
        <div className={classes}>
        </div>
    )
}

export default Skeleton;
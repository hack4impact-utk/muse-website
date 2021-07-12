import React from 'react'
import style from './CartLoader.module.scss'

const CartLoader: React.FC = () => {
    return(
        <div className={style.loadingParent}>
            <img className={style.rocket} src="/rocket.png"></img>
            <div className={style.loadingText}>Loading...</div>
        </div>
    )
}
export default CartLoader;
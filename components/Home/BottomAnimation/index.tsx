import React from 'react';
import style from './BottomAnimation.module.scss';

const BottomAnimation: React.FC = () =>{
    return(
        <div className={style.parent}>
            <div className={style.wrapper}>
                <img src="/robot.png" alt="" className={style.robot}/>
                <img src="/muse-kid.png" alt="" className={style.museKid}/>
            </div>
        </div>
    )
}
export default BottomAnimation;
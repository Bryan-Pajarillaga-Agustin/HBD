import style from './buttonsStyle.module.css'


function Button({styleButton, desc, handleEvent, styles}){

    return (<button className={`${style.button} ${styles}`} onClick={(e)=>handleEvent(e)}>{desc}</button>)
}

export default Button
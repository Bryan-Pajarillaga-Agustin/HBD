import { useEffect, useState } from 'react'
import S from './Navigation.module.css'

function Navigation({verify, page, setPage, texts, mingle}){
    const [sWidth, setSWidth] = useState(window.innerWidth)
    const navigation = {

    }
    const liFlex = {
        backgroundColor: 'transparent',
        color: 'white'
    }
    const liDrop = {
        backgroundColor: "white",
        color: "#542bb4"
    }

    const ulDrop = {
        display: 'flex',
        flexDirection: 'column', 
    }
    const ulFlex = {
        display: 'flex',
    }
    const optionBar = {

    }
    window.onresize = () => {
        setSWidth(window.innerWidth)
    }

    if(page >= 1) return (
        <>
            <nav className={page >= 1 ? S.nav : S.hideNav}>
                <div className={S.left}> <img src="Title.png" width={100 + '%'} height={50+"%"} className={S.img} /> <h1 className={S.title}>{texts.GPageNavT}</h1></div>
                <div className={sWidth <= 400 ? S.optionBar : S.hideOptionBar}> <p>☰</p> </div>
                <div className={S.right}>
                    <ul>
                        <li className={page === 1 && sWidth >= 400 ? S.highlighted : S.notHighLighted} onClick={()=>{setPage(1), mingle.pause()}}> Home <span className={S.highlighter}></span></li>
                        <li className={page === 2 && sWidth >= 400 ? S.highlighted : S.notHighLighted} onClick={()=>{setPage(2), mingle.pause()}}> Greetings <span className={S.highlighter}></span></li>
                        <li className={page === 3 && sWidth >= 400 ? S.highlighted : S.notHighLighted} onClick={()=>{setPage(3), mingle.pause()}}> Message <span className={S.highlighter}></span></li>
                        <li className={page === 4 && sWidth >= 400 ? S.highlighted : S.notHighLighted} onClick={()=>{setPage(4), mingle.pause()}}> Developer <span className={S.highlighter}></span></li>
                        
                    </ul> 
                </div>

            </nav>
        </>
    )

}   

export default Navigation
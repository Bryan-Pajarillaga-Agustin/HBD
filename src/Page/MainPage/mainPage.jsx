import S from './mainPage.module.css'
import Navigation from '../../NavBar/navigation'
import {useState } from 'react'
import Button from '../../components/Buttons/button'
function MainPage({verify, page, setPage, texts}) {
    const [width, setWidth] = useState(window.innerWidth)
    window.onresize = () => {
        setWidth(window.innerWidth)
    }
    return (
        <> 
            <div className={page === 1 ? S.mainPage : S.hide}>
                
                <div className={S.left}>
                    <h1>{texts.GPageh1}</h1>
                    <p>{texts.GPageP}</p>
                    <Button className={S.greetButt} desc={"Greetings"} handleEvent={()=>setPage(2)} styles={S.button}></Button>
                </div>
                <div className={S.right}>
                    <img src="Sarah.png" width={"auto"} height={width >= 400 ? 90+"%" : 90+"%"} className={S.Sarah}/>
                </div>
               
                <div className={S.backGround}></div>
            </div>
        </>
    )
}   

export default MainPage
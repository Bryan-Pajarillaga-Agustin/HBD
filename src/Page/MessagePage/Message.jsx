import S from './Message.module.css'
import Button from '../../components/Buttons/button'
import { useRef, useState } from 'react'
export default function Message({page}){
    const [showMessage, setshowMessage] = useState(false)
    const messageRef = useRef()
    const message = "Hi Maam Sarah ^_^ \n  I hope you are enjoying your Birthday. Malakas lang ako mangupal kung minsan at madalas, but I appreciate all the good things that I have learned and you thaught to us 😁 but, minsan may mga bagay din kaming natutunan sayo na kakupalan. Thank you Ma'am Sarah and Happiest Birthday to you neighbor! 🥳"
    let index = 0
    const displayMessage = () => {
        setTimeout(() => {
            if(messageRef.current != null) messageRef.current.textContent += message[index]
            index++
            if(index != message.length) displayMessage() 
        }, 100);
    }

    return (
        <>
            <div className={page == 3 ? S.messagePage : S.hideMessagePage}>
                <Button styles={!showMessage && page === 3 ? S.button : S.hide} desc={"Click To See My Message"} handleEvent={()=>{displayMessage(), setshowMessage(true), messageRef.current.textContent = ""}}></Button>

                <span className={showMessage && page === 3 ? S.showMessage : S.hideMessage}> 
                    <span ref={messageRef} className={S.mess}></span>
                    <span className={S.cursor}></span>
                </span>
            </div>
        </>
    )
}
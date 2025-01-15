import { useState, useRef } from "react"
import VerifyPage from "./Page/VerifyPage/verifyPage"
import MainPage from "./Page/MainPage/mainPage"
import Navigation from "./NavBar/navigation"
import GreetingsPage from "./Page/GreetingsPage/greetingsPage"
import Message from "./Page/MessagePage/Message"
import Developer from "./Page/DevelopersPage/Developer"
function App() {
    const [verify, setVerify] = useState()
    const [texts, setTexts] = useState()
    const [page, setPage] = useState(0)
    const refText = useRef() 
    let mingle = new Audio("../../../public/sounds/Mingle.mp3")
    function proceed(){
        if(verify == 'HBD-Pinaka-Maganda-Sa-Lahat'){
            setTexts({
                GPageh1: "Happy Birthday Sarah Ko!",
                GPageP: "Greetings from your 'The Most Handsome Bryan'",
                GPageNavT: "Happy_Birthday"
            })
            setPage(1)
        } else if(verify == "HBD"){
            setTexts({
                GPageh1: "Happy Birthday Maam Sarah!",
                GPageP: "Greetings from your kupal student 'The Handsome Bryan ❤'",
                GPageNavT: "Happy_Birthday"
            })
            setPage(1)
        } else if(verify == null){
            alert("Please fill up the Code Text!")
        } else {
            alert("Invalid Code")
            refText.current.value = ""
            updateVerify()
        }
    }

    function updateVerify(){
        if(refText.current){
            setVerify(refText.current.value)
        }
    }

    if (page == 0) return <VerifyPage verify={verify} page={page} setPage={(e)=>setPage(e)} proceed={()=>proceed()} updateVerify={()=>updateVerify()} refText={refText}/>

    if (page >= 1) return (
        <>
            <Navigation verify={verify} page={page} setPage={(e)=>setPage(e)} texts={texts} mingle={mingle}/>
            <MainPage verify={verify} page={page} texts={texts} setPage={(e)=>setPage(e)}/>
            {page == 2 ? <GreetingsPage verify={verify} page={page} mingle={mingle} setPage={(e)=>setPage(e)}/> : ''}
            <Message page={page}></Message>
        </>
    )

}

export default App
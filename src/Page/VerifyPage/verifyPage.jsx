import { useEffect, useRef, useState } from "react"
import verifyStyles from "./verifyStyles.module.css"
import Button from "../../components/Buttons/button"

function VerifyPage({verify, page, setPage, proceed, updateVerify, refText}) {
    const [keyPressCount, setKeyPressCount] = useState(0);
    const maxKeyPresses = 10;

    useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && keyPressCount == 0) {
        console.log("Key pressed:", event.key);
        proceed()
        setKeyPressCount(keyPressCount + 1);
      }
      console.log(event, keyPressCount)
    };
    document.addEventListener('keydown', handleKeyDown);
    // Cleanup function: remove the listener when the component unmounts.
  }, [keyPressCount]);
    function checkVerification(){
        if(verify == "SarahKo"){

        } else if(verify == "Maam Sarah"){

        }
    }
    return (
        <>
            <div className={page === 0 ? verifyStyles.verifyPage : verifyStyles.hideVerifyPage}>

                <div className={verifyStyles.box}>
                    <h1>Who are you? Type the CODE from the paper.</h1>
                    <input className={verifyStyles.text} onChange={()=>updateVerify()} type="text" ref={refText} placeholder="..."/>
                </div>

                <Button desc={"Proceed"} handleEvent={()=>proceed()} styles={verifyStyles.button}></Button>

                <div className={verifyStyles.cat}>
                    <div className={verifyStyles.body}>
                        <div className={verifyStyles.head}>
                            <div className={verifyStyles.ears}>
                                <div className={verifyStyles.pinkEars}></div>
                            </div>
                            <div className={verifyStyles.ears}>
                                <div className={verifyStyles.pinkEars}></div>
                            </div>

                            <div className={verifyStyles.eyes}>
                                <div className={verifyStyles.eyeBalls}></div>
                            </div>
                            <div className={verifyStyles.eyes}>
                                <div className={verifyStyles.eyeBalls}></div>
                            </div>

                            <div className={verifyStyles.mouth}>
                                <div className={verifyStyles.left}></div>
                                <div className={verifyStyles.right}></div>
                            </div>
                        </div>
                        
                    </div>
                
                    
                </div>
            </div> 

            
        </>
    )
}   

export default VerifyPage
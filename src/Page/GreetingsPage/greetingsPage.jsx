import { useRef, useEffect, useState } from 'react';
import S from './greetings.module.css'
import './greetings.module.css'
import Button from '../../components/Buttons/button'
function GreetingsPage({verify, page, setPage, mingle }) {
    const refCanvas = useRef();
    const happy = useRef()
    const birthDay = useRef()
    const to = useRef()
    const you = useRef()
    const Maam = useRef()
    const Sarah = useRef()
    const textArr = [happy, birthDay, to, you, Maam, Sarah]

    const [width, setWidth] = useState(window.innerWidth - 20)
    const [height, setHeight] = useState(window.innerHeight - window.innerHeight/10)
    const [conAnimate, setConAnimate] = useState(false)
    const [animationCounter, setAnimationCounter] = useState(0)
    let continueAnimation = false
    let counter = 0
    let ctx
    let animateBool = false
    const numExParticles = 200
    const numFireParticles = 2
    let fireWork = []
    let fireWorkParticle = []
    let explosionParticles = []

    class FireWork {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.speedY = 3
            this.size = {w: 9, l: 20} 
            this.particle = []
            this.color = Math.random * 360
            this.maximumY = Math.random()*(height - height/2)
            this.counter = 0
        }

        update(){
            this.y -= this.speedY 
            for(let i = 0; i<2; i++){
                this.particle.push(new FireWorkParticles(
                    this.x + 2.5,
                    this.y + 20,
                    Math.cos(Math.random() * Math.PI),
                    7
                ))
            }

            if(this.y <= this.maximumY){
                for(let i=0; i<numExParticles; i++){
                    explosionParticles.push(new ExplosionParticles(
                        this.x,
                        this.y,
                        Math.cos(Math.PI*2/numExParticles * i) * Math.random() * 20,
                        Math.sin(Math.PI*2/numExParticles * i) * Math.random() * 13,
                    ))
                }

                spawnFireWork()
                
                if(textArr[counter].current != null)textArr[counter].current.classList.add(`${S.show}`)
                if(counter < textArr.length - 1) {counter+=1}
            }
        }
        draw(){
            ctx.beginPath()
            ctx.fillStyle = `pink`
            ctx.strokeStyle = "#2e2647df"
            ctx.rect(this.x, this.y, 15, 35)
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
            for(let i=0; i<this.particle.length; i++){
                this.particle[i].update()
                this.particle[i].draw()
                if(this.particle[i].radius <= 0.1){
                    this.particle.splice(i, 1)
                    i--
                }
            }

        }
    }

    class FireWorkParticles {
        constructor(x, y, speedX, speedY) {
            this.x = x+5
            this.y = y
            this.speedX = speedX
            this.speedY = speedY
            this.radius = 4
            this.color = Math.random() * 360
        }

        update(){
            this.x += this.speedX
            this.y += this.speedY
            this.radius -= 0.1
        }
        draw(){
            ctx.beginPath()
            ctx.fillStyle = `blackpink`
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
            ctx.fill()
            ctx.closePath()
        }
    }

    class ExplosionParticles {
        constructor(x, y, speedX, speedY) {
            this.x = x
            this.y = y
            this.speedX = speedX
            this.speedY = speedY
            this.radius = 7 
            this.gravity = 4
            this.friction = .99
            this.color = Math.random() * 360
            this.alpha = 1
        }

        update(){
            this.speedX *= this.friction
            this.speedY *= this.friction
            this.y += this.gravity
            this.x += this.speedX
            this.y += this.speedY
            this.alpha -= 0.01

        }
        draw(){
            ctx.beginPath()
            ctx.save()
            ctx.globalAlpha = this.alpha
            ctx.fillStyle = `#94535e`
            ctx.strokeStyle = '#2e2647df'
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            ctx.restore()
            ctx.closePath()
        }
    }

    const explosionParticle = () => {
        for(let i=0; i<explosionParticles.length; i++){
            explosionParticles[i].update()
            explosionParticles[i].draw()
            if(explosionParticles[i].alpha <= 0.01){
                explosionParticles.splice(i, 1)
                i--
            }
        }
    }

    const spawnFireWork = () => {
        fireWork.push(new FireWork(
            (Math.random()*(width-20)) + 20,
            height
        ))
    }

    const explodeOnClick = (e) => {
            for(let i=0; i<numExParticles; i++){
                explosionParticles.push(new ExplosionParticles(
                    e.clientX,
                    e.clientY - 100,
                    Math.cos(Math.PI*2/numExParticles * i) * Math.random() * 20,
                        Math.sin(Math.PI*2/numExParticles * i) * Math.random() * 13,
                ))
            }
            console.log(explosionParticles)
    }

    const animateFireWork = () => {
        for(let i=0; i<fireWork.length; i++){
            fireWork[i].update()
            fireWork[i].draw()
            if(fireWork[i].y <= fireWork[i].maximumY){
                fireWork.splice(i, 1)
                i--
            }
        }
    }

    const animate = () => {
        if(page === 2 && ctx){
            ctx.clearRect(0, 0, width + width, height + height)
            animateFireWork()
            explosionParticle()
            requestAnimationFrame(animate)
        }
    }

    const getCanvas = (c)=>{
        if(page == 2){
            ctx = c
            spawnFireWork()
            animate()
        }
    }

    // Styles
    const canvasStyleSheet = {
        backgroundColor: 'transparent',
        border: '5px solid pink'
    }

    const redo = () => {
        setAnimationCounter(-1)
        setConAnimate(false)
        setPage(3)
        counter = 0
        mingle.pause()
        textArr.forEach((e)=>{
            console.log(e.current.classList.value)
        })

        setTimeout(() => {
            setPage(2)
        }, 50);
    }

    useEffect(()=>{
        if(refCanvas.current != null){
            const height = window.innerHeight
            const canvas = refCanvas.current
            const ctx = canvas.getContext('2d')
            canvas.width = window.innerWidth - 20
            canvas.height = height
            if(conAnimate){
                mingle.play()
                getCanvas(ctx) 
                if(!animateBool) {animate(); animateBool = true}
            }
        }

        
    },[conAnimate, page])

    window.onresize = ()=>{
        setWidth(window.innerWidth - 20)
        setHeight(window.innerHeight - (window.innerHeight/5.5))
        const canvas = refCanvas.current
        canvas.width = width
        canvas.height = height
    }

    useEffect(()=>{
        const canvas = refCanvas.current
        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
    }, [width, height])
    
    return (
        <>    

            <div className={conAnimate === false ? S.dialogBox : S.hideDialog}>
                    <h1>Tap the button and press F11 to full screen</h1>
                    <Button styles={S.button} desc={"Tap to Start"} handleEvent={()=>setConAnimate(true)}></Button>
            </div>

            <div className={ conAnimate ? S.greetingsBox : S.hideGreetingsBox} onClick={(e)=>{explodeOnClick(e)}}>
                <h1>
                    <span className={S.hideTexts} ref={happy}> Happy </span>
                    <span className={S.hideTexts} ref={birthDay}> Birdthday </span>
                    <span className={S.hideTexts} ref={to}> To </span>
                    <span className={S.hideTexts} ref={you}> You </span>
                    <span className={S.hideTexts} ref={Maam}> Ma'am </span>
                    <span className={S.hideTexts} ref={Sarah}> Sarah! 🎊🎁🎇 </span>
                    <Button desc={"Play Again"} handleEvent={()=>{redo(), setConAnimate(false)}}></Button>
                </h1>
            </div>
            <div className={page == 2 ? S.greetings : S.hide}>
                
                <canvas id="myCanvas" onClick={(e)=>{explodeOnClick(e)}} style={{...canvasStyleSheet}} ref={refCanvas}>

                </canvas>
            </div>
        </>
    )
}

export default GreetingsPage
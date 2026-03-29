import './Left_Body.css'

const LeftBody = () => {
    return (

                <div className='Left-content'>
                    <div className='Hello'>
                        <div className='i-circle'><i className="fa-regular fa-hand-spock fa-sm" style={{color: "#020024", "--fa-rotate-angle": "30deg"}} rotation = {140}></i></div>
                    
                    <p>HELLO I'M</p>
                </div>
                <div className='Intro-div'>
                    <h1 className='first-name'>ASHUTOSH</h1>
                    <div className="Intro-Name"> 
                        <h2 className='second-name'>AGNIHOTRI</h2>
                        <p>WEB DEVELOPER</p>
                    </div>
                    
                    <p className='Intro-Content'>Frontend Developer with a problem-solving mindset, creating responsive and intuitive applications that combine clean design, usability, and performance. Proficient in React.js, JavaScript, HTML, CSS, and Node.js, with a strong focus on building scalable interfaces and reusable components. Passionate about turning concepts into functional digital products through clean and efficient code. </p>
                    <button className="Hire_Me-Button" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Hire Me Now</button>
                    <button className="LinkedIn-Button"><i className="fa-brands fa-linkedin" style={{color: "#0b0843"}}></i>Linkedin</button>

                </div>
                </div>
                
    )
}

export default LeftBody;
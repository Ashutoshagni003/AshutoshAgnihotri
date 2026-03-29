import "./About.css"
import { useState } from "react";
import SnowballCursor from "./SnowBall";

   const aboutData = [
  {
    id: 'schooling',
    title: 'Schooling',
    role: 'Student',
    company: 'High School',
    date: '2019 - 2021',
    points: [
      'Completed 10th grade with an excellent academic record.',
      'Completed 12th grade with a strong focus on science and mathematics.',
      'Actively participated in logic and problem-solving competitions.'
    ]
  },
  {
    id: 'college',
    title: 'College',
    role: 'Undergraduate',
    company: 'University',
    date: '2021 - 2025',
    points: [
      'Maintained a consistently high CGPA through dedicated studies.',
      'Built numerous college projects focusing on modern web stacks (React, Node.js).',
      'Completed a valuable internship that improved my team collaboration and Agile workflows.'
    ]
  },
  {
    id: 'experience',
    title: 'Experience',
    role: 'Software Engineer',
    company: 'HighRadius',
    date: 'July 2025 - Present',
    points: [
      'Spearheading frontend development to construct highly scalable applications.',
      'Collaborating actively with UI/UX and backend engineers to ensure seamless digital experiences.',
      'Implementing advanced state management and animated interfaces utilizing React and Framer Motion.'
    ]
  }
];

const mySkills = [
    {
        id : "1",
        skill : "REACT"
    },
    {
         id : "2",
        skill : "HTML"
    },
    {

        id : "3",
        skill : "CSS"
    },
    {

        id : "4",
        skill : "JavaScript"
    },
    {

        id : "5",
        skill : "Java"
    }
];





const About = () =>{

    const [activeState , setActiveState] = useState("Scooling");


    return(
        <div id = "about" className="About-container">
            <SnowballCursor/>
            <div className="about-upper">
                {mySkills.map((skills) => (
                    <>
                    <p>#</p>
                    <p>{skills.skill}</p>
                    </>
                ))}
            </div>
            <div className="about-middle">
                <div className="lower-circle">

                </div>
            </div>
            <div className="About-Main-Container">
                <div className="About-Header">
                    <h1>About Me.</h1>
                </div>
                <div className="About-Body">
                    <p>
                        I am a Computer Science graduate currently working as an R2R Consultant at HighRadius, where I contribute to enterprise-level financial process automation and business solution design for large-scale organizational processes. My role involves understanding business requirements, analyzing process gaps, and helping design efficient technology-driven solutions that improve operational accuracy and productivity. Alongside my consulting experience, I have developed a strong interest in full-stack development, particularly using the MERN stack, where I enjoy creating applications that combine clean design, responsive user experience, and practical functionality. I am especially interested in building interfaces that are intuitive, scalable, and performance-focused while ensuring that the underlying logic remains efficient and maintainable. Beyond technical implementation, I am passionate about solving real-world problems through technology, continuously strengthening both analytical thinking and development skills, and exploring better ways to connect business needs with effective digital solutions.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;
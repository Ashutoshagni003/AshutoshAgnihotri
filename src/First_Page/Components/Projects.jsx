import '/Users/ashutoshagnihotri/Coding/Portfolio/src/First_Page/Components/Projects.css'
import ProjectBlocks from './ProjectBlocks';

 
const skillCover = [
    {
        id : "1",
        Header : "Frontend",
        tag : <i
  className="fa-brands fa-react fa-spin fa-2xl"
  style={{ color: "#1b46c2" }}
></i>,
color : "#1b46c2",
        Content : "Building responsive and visually engaging user interfaces using React, modern CSS, and component-based architecture. Focused on creating smooth interactions, clean layouts, and user-friendly experiences that balance aesthetics with functionality across devices.",
        Skills : [
            {
                id: "1",
                skill : "React"
            },
            {
                id: "2",
                skill : "JavaScript"
            },
            {
                id: "3",
                skill : "CSS"
            }
        ]
    },
    {
        id : "2",
        Header : "Backend",
        tag : <i
  className="fa-solid fa-database fa-fade fa-2xl"
  style={{ color: "Green" }}
></i>,
color : "Green",

        Content : "Developing scalable backend solutions using Node.js, Express, and database technologies to manage APIs, business logic, and secure data flow. Emphasis on writing structured, maintainable code that supports reliable application performance.",
        Skills : [
            {
                id: "1",
                skill : "Node.js"
            },
            {
                id: "2",
                skill : "Mongo"
            },
            {
                id: "3",
                skill : "MySQL"
            }
        ]
    },
    {
        id : "3",
        Header : "Consulting",
        tag : <i
  className="fa-solid fa-building fa-fade fa-2xl"
  style={{ color: "#eccd62" }}
></i>,
color : "#eccd62",

        Content : "Combining technical understanding with business process knowledge to design practical solutions for operational challenges. Experienced in process automation, solution thinking, and aligning technology with business requirements.",
        Skills : [
            {
                id: "1",
                skill : "R2R Process Automation"
            },
            {
                id: "2",
                skill : "Business Solution Design"
            }
        ]
    }
]


const Projects = () =>{
    
    return(
        <>
        <div id="projects" className="projects-section">
            <ProjectBlocks/>
            <div className='projects-wrapper'>
                <div className='projects-header'>
                    <h1>Skills & Capabilities</h1>
                    <p>
                        Technology and Business domain I work with
                    </p>
                </div>
                <div className='projects-content'>
                    <div className='skills-wrapper'>
                        {skillCover.map((skill , index) => (
                            
                            <div className='skill-box'>
                                <div className='skill-box-Border' style={{ borderTop :`4px Solid ${skill.color}`, marginTop : "1px"}}>
                                <div className='skill-logo'>
                                    {skill.tag}
                                </div>
                                <div className='skill-content'>
                                    <div className='skill-content-header'> 
                                        <h4>
                                            {skill.Header}
                                        </h4>
                                    </div>
                                    <div className='skill-content-content'>
                                        <p>
                                            {skill.Content}
                                        </p>
                                    </div>
                                    <div className='skill-div-wrapper'>
                                        {skill.Skills.map((points , index) => (
                                            <div className='skill-div' style={{ border :`2px Solid ${skill.color}`, marginTop : "1px"}}>
                                            {points.skill}

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default Projects;
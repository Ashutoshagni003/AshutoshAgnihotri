import './Home.css';
import LeftBody from './Home_Components/Left_Body';
import HomeNav from './Home_Components/Home_Nav';
import PhysicsCanvas from './Home_Components/PhysicsCanvas';
const Home = () => {
    return (
        <div className="HomeScreen">
            <HomeNav />
            <div className='Body-container'>
                <div className='Left-Body'>
                    <LeftBody/>
                </div>
                <div className='right-body'>
                    <PhysicsCanvas/>
                </div>
            </div>
            <div className='Bottom-div'>
                <div className='upper-circle'>
                </div>
            </div>
            {/* <HomeBody /> */}
        </div>
    )
}

export default Home;
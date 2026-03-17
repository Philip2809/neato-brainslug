import { Link } from 'react-router-dom';
import './home.scss';

function Home() {

    return (
        <div className="card home">
            <p className="success">Neato Brainslug</p>
            <p>
                Neato Brainslug allows local control of your Neato robot, <strong>with</strong> or <strong>without</strong>, Home Assistant.<br /><br />
                
                To make the proccess of installing the Brainslug easier, tools found here will help you along the way, for now only tools 
                for&nbsp;<Link to="/robot">managing your robot</Link> are available, but an ESP32 flasher will be available soon as well.<br /><br />

                For furthur information about the project, check out the&nbsp;<a href="https://github.com/philip2809/neato-brainslug" target="_blank" rel="noopener noreferrer">GitHub repository</a> where 
                you can find full install guides!
            </p>
        </div>
    )
}

export default Home

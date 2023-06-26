import './notFound.css'
import lifter from '../../../public/videos/lifter.mp4'
import { Link } from 'react-router-dom'


function NotFound() {
    return(
    <main>
            <div className='overlay'></div>
            <div className='main'>
                <video src={lifter} autoPlay loop muted/>
            </div>
        <div className='content'>
            <h2 className='border'>404 Not Found</h2>
            <h2 className='wave'>404 Not Found</h2>
            <h3 className='sentadillas'>¡Hey 20 sentadillas más!</h3>
            <p className='texto'>Puedes regresar al inicio y disfrutar de nuestro contenido, o puedes quedarte aqui mirando este video!</p>
            <Link to={"/"} className='regreso'> <p className='volver'>Pincha aquí para volver</p> </Link>
        </div>
    </main>
    )
}

export default NotFound
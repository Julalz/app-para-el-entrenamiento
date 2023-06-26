

import  { useState, useEffect } from 'react';
import humo from '../../../public/videos/humo.mp4'
import './profile.css'

function Profile() {
    const [carouselImages, setCarouselImages] = useState([]);
    useEffect(() => {
        // Lógica para cargar las imágenes desde el backend y actualizar el estado 'carouselImages'
      
        // Ejemplo:
        fetch('/api/images') // Reemplaza '/api/images' con la ruta correcta para obtener las imágenes desde el backend
          .then(response => response.json())
          .then(data => setCarouselImages(data.images));
      }, []);
    return(
        <>
        <div className='overlay'></div>
            <div className='main'>
                <video src={humo} autoPlay loop muted/>
            </div>
        <div className='principal-profile'>
            <section className="avatar">
                <img src="../../../public/images/iconos/pesa.png" alt="imagen de avatar" className='my-photo'/>
                <h1 className='name'>mi nombre</h1>
            </section>
            <section className="description">
                <p className='frase-777'>Aquí encontrarás todos los ejercicios que te han interesado.</p>
                <p className='porTodas'>¡A POR TODAS!</p>
                {/* aquí iría el contenido del carrusel de fotos de favoritos */}
                <div className="carousel">
                {carouselImages.map((image, index) => (
                <img key={index} src={image.url} alt={image.alt} className="carousel-image" />
                ))}
                </div>
            </section>
        </div>
        </>
    )
}

export default Profile
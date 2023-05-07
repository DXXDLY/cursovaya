import React from 'react'
import style from './Module/Artist.module.css'
import { useNavigate } from 'react-router-dom'
const ArtistRelated = ({ images, name, id }) => {
    const navigate = useNavigate()

    const toRelatedArtist = () => {
        navigate(`/artist/${id}`)
    }
    return (
        <div className={style.relatedArtists}>
            <div className={style.relatedArtists_img} onClick={toRelatedArtist}>
                <img src={images[1].url} alt="related" />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default ArtistRelated
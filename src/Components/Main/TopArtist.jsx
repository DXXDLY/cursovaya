import React, { useContext } from 'react'
import { LoaderContext } from './Main.tsx';
import { TokenContext } from '../../Context/AllContext';
import { getTopArtist } from '../../services/getQuery';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { LoaderTopArtist } from './LoaderTopArtist/LoaderTopArtist';

import Img from './ImgTopArtists';

const TopArtist = () => {
    const { accessToken } = useContext(TokenContext);
    const { setLoading } = useContext(LoaderContext)
    const { data: artist, isLoading, error } = useQuery({
        queryKey: ['artist', accessToken],
        queryFn: () => getTopArtist(accessToken)
    })

    setLoading(false)

    return (
        <div className="main__content-top-artist">
            <div className="main__content-top-artist-title">
                <p>Top Artist</p>
                <span><Link to="/artist">See all</Link></span>
            </div>
            <div className="main__content-top-artist-track">
                {error && <h5>{error.message}</h5>}
                {isLoading ? <div className=''><LoaderTopArtist /></div> : artist?.length ? (
                    <div className="main__content-top-artist-track-title">
                        {Object.values(artist).slice(0, 3).map((item, index) => (
                            <Img {...item} key={index} />
                        ))}
                    </div>
                ) : (
                    <h3>Ничего не найдено :/</h3>
                )

                }
            </div>
        </div>
    )
}

export default TopArtist
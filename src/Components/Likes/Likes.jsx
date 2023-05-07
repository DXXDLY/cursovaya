import React, { useContext } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext'
import { Loading } from '../Loader/Loading'
import { useQuery } from '@tanstack/react-query';

import PlayerSearch from '../Search/PlayerSearch'
import LikedTrack from './LikedTrack'
import style from '../../UsedFrequently/Main.module.css'
import { getLikes } from '../../services/getQuery';

const Likes = () => {
  const { accessToken } = useContext(TokenContext)
  const { urlForAudioTrack } = useContext(AudioUrl)

  const audioElem = React.useRef()

  const { data: like, isLoading } = useQuery({
    queryKey: ['likes', accessToken],
    queryFn: () => getLikes(accessToken)
  })

  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play()
    }
    else {
      audioElem?.current?.pause()
    }
  }, [isPlaying]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={style.main}>
          <div className="main__content-title_liked">
            <div className="liked__title2">
              <h1>Любимые треки</h1>
            </div>
          </div>
          <div className="parent">
            <div className="popular_track">
              <div className="main__content-trending-artist-title">
                {like.items.map((item, index) => {
                  return (
                    <LikedTrack
                      {...item}
                      key={index}
                      index={index}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {
        !urlForAudioTrack.length ? (<div></div>) : <PlayerSearch
          name={urlForAudioTrack}
          audioElem={audioElem}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      }
    </>

  )
}

export default Likes
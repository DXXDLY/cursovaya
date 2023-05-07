import React, { useContext } from 'react'
import { AudioUrl, TokenContext } from '../../Context/AllContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import SpotifyWebApi from 'spotify-web-api-node';
import SearchResult from './SearchResult';
import PlayerSearch from './PlayerSearch'

import style from '../../UsedFrequently/Main.module.css'

import { generateRandomColor } from '../../utils/randomColor'
import { getGenre } from '../../services/getQuery';
import { Loading } from '../Loader/Loading';

const spotifyApi = new SpotifyWebApi({
  clientId: 'ffbc598a32f044ab935465bbf1cb48c5',
})

const TheSearchTrack = () => {

  const [value, setValue] = React.useState('');

  const [isPlaying, setIsPlaying] = React.useState(false)

  const { urlForAudioTrack } = useContext(AudioUrl)
  const { accessToken } = useContext(TokenContext);
  const [searchResult, setSearchResult] = React.useState([]);

  const audioElem = React.useRef()

  const { data: genre, isLoading } = useQuery({
    queryKey: ['genre', accessToken],
    queryFn: () => getGenre(accessToken)
  })

  React.useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play()
    }
    else {
      audioElem?.current?.pause()
    }
  }, [isPlaying]);

  React.useEffect(() => {
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken]);

  React.useEffect(() => {
    spotifyApi.searchTracks(value).then(res => {
      setSearchResult(res.body.tracks.items)
    })
  }, [value, accessToken])

  return (
    <>
      <div className={style.main}>
        <h2 className={style.artist_Title}>Поиск Треков</h2>
        <div className={style.main__content_title}>
          <div className={style.main__content_search}>
            <input
              type="search"
              id="search"
              className="search"
              placeholder="Search"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <div className="btn__search"></div>
          </div>
        </div>
        <div className="parent">
          {isLoading ? (
            <Loading />
          ) : (searchResult.length !== 0 ? (
            <>
              {
                searchResult.map((item, index) => {
                  return (
                    <SearchResult
                      {...item}
                      index={index}
                      key={index}
                    />
                  )
                })
              }
            </>
          ) : (
            <>
              {genre.categories.items.map((e, index) => (
                <>
                  <div className='searchResult_two' >
                    <Link
                      key={index}
                      style={{ backgroundColor: generateRandomColor() }}
                      className="card__type--category"
                      to={'/genre/' + e.id}
                    >
                      <img className="card__img" src={e.icons[0].url} alt="1" />
                      <div className="card__title" >
                        <span>{e.name}</span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </>
          ))}
        </div>
      </div>
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

export default TheSearchTrack
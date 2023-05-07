import React from 'react'
import BgSlider from './BgSilder.tsx'
import TopArtist from './TopArtist'

const MainContentBg = React.memo(() => {
    return (
        <div className="main__content-bcg">
            <BgSlider/>
            <TopArtist/>
        </div>
    )
})

export default MainContentBg 
import axios from "axios"

export const getTopArtist = (accessToken) => {
    return axios.get('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(data => data.data.albums?.items)
}

export const getGenre = (accessToken) => {
    return axios.get('https://api.spotify.com/v1/browse/categories?country=BR&limit=50', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(data => data.data)
}

export const getLikes = (accessToken) => {
    return axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(data => data.data)
}

export const getTrack = (accessToken, id) => {
    return axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(data => data.data)
}


export const getInfo = (accessToken, id) => {
    return axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(data => data.data)
}

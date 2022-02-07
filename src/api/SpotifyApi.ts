import axios from "axios";
import SearchForItemParameterObject = SpotifyApi.SearchForItemParameterObject;
import AlbumSearchResponse = SpotifyApi.AlbumSearchResponse;
import {AlbumSearch} from "../models/AlbumSearch";
import AlbumTracksResponse = SpotifyApi.AlbumTracksResponse;
import {Track} from "../models/Track";

const tokenStorageKey = 'spotifyToken';

const spotifyInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem(tokenStorageKey)
    }
});

export async function authenticate() {
    const client_id = 'c8dc40c2295a4e40accf71adb171fbff';
    const client_secret = 'CHANGEME';


    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials')

    let response = await axios.post<any>('https://accounts.spotify.com/api/token', data, {
        headers: {
            Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });

    sessionStorage.setItem(tokenStorageKey, response.data.access_token);
}

export async function fetchAlbums(search: string): Promise<AlbumSearch[]> {
    const queryParams: SearchForItemParameterObject = {
        q: search,
        type: 'album',
        market: 'fr'
    }
    const response = await spotifyInstance.get<AlbumSearchResponse>('search', {
        params: queryParams
    })

    return response.data.albums.items.map(album => {
        return {
            id: album.id,
            artist: album.artists.map(a => a.name).join(','),
            name: album.name,
            coverUrl: album.images[2].url
        }
    });
}

export async function fetchAlbumTracks(albumId: string): Promise<Track[]> {
    const req = await spotifyInstance.get<AlbumTracksResponse>('https://api.spotify.com/v1/albums/' + albumId + '/tracks',)
    return req.data.items.map(track => {
        return {
            id: track.id, name: track.name, trackNumber: track.track_number
        }
    })
}

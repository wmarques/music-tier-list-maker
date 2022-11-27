import axios, {type AxiosInstance} from "axios";
import type {AlbumSearch} from "@/models/AlbumSearch";
import type {Track} from "@/models/Track";
import pkceChallenge from "pkce-challenge";

const tokenStorageKey = 'spotifyToken';
const refreshTokenStorageKey = 'refreshToken';
const challengeStorageKey = 'challenge';
const client_id = 'c8dc40c2295a4e40accf71adb171fbff';

let spotifyInstance: AxiosInstance;
spotifyInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/'
});
spotifyInstance.interceptors.request.use(async (config) => {
    config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + localStorage.getItem(tokenStorageKey)
    }
    return config;
})

export function login() {
    const challenge = pkceChallenge();
    localStorage.setItem(challengeStorageKey, challenge.code_verifier);
    window.location.href = axios.getUri({
        url: 'https://accounts.spotify.com/authorize', params: {
            client_id,
            response_type: 'code',
            redirect_uri: 'http://localhost:3000',
            code_challenge_method: "S256",
            code_challenge: challenge.code_challenge
        },
    });
}

export async function refreshToken() {
    const data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', localStorage.getItem(refreshTokenStorageKey) as string);
    data.append('client_id', client_id,);
    let response = await axios.post<any>('https://accounts.spotify.com/api/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    localStorage.setItem(tokenStorageKey, response.data.access_token);
}

export async function getToken(code: string) {
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code')
    data.append('code', code)
    data.append('redirect_uri', 'http://localhost:3000');
    data.append('client_id', client_id,);
    data.append('code_verifier', localStorage.getItem(challengeStorageKey) as string);

    let response = await axios.post<any>('https://accounts.spotify.com/api/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    localStorage.setItem(refreshTokenStorageKey, response.data.refresh_token);
    localStorage.setItem(tokenStorageKey, response.data.access_token);
}


export async function fetchAlbums(search: string): Promise<AlbumSearch[]> {
    const queryParams: SpotifyApi.SearchForItemParameterObject = {
        q: search,
        type: 'album',
        market: 'fr'
    }
    const response = await spotifyInstance.get<SpotifyApi.AlbumSearchResponse>('search', {
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
    const req = await spotifyInstance.get<SpotifyApi.AlbumTracksResponse>('albums/' + albumId + '/tracks',)
    return req.data.items.map(track => {
        return {
            id: track.id, name: track.name, trackNumber: track.track_number
        }
    })
}

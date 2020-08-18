import RNFetchBlob from 'rn-fetch-blob';


const MEDIA_DIR = `/MediaLibrary`
const getDocumentDir = () => RNFetchBlob.fs.dirs.DocumentDir;

const getTracksFromLibrary = async () => {
    let id = 0
    let tracks = [];
    let trackFilenames = await RNFetchBlob.fs.ls(`${getDocumentDir()}${MEDIA_DIR}`)
    // files will an array contains filenames

    trackFilenames.forEach(trackFilename => {
        if(!trackFilename.startsWith(".")) {
            tracks.push({
                id: id++,
                name: trackFilename,
                path: `${getDocumentDir()}${MEDIA_DIR}/${trackFilename}`
            })
        }

    })
    return tracks
}


export default {
    getTracksFromLibrary,
}

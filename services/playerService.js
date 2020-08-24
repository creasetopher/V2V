import RNFetchBlob from 'rn-fetch-blob';


const MEDIA_DIR = `/MediaLibrary`
const IMAGES_DIR = `${MEDIA_DIR}/Images`

const getDocumentDir = () => RNFetchBlob.fs.dirs.DocumentDir;

const getTracksFromLibrary = async () => {
    let id = 0
    let tracks = [];
    let trackFilenames = await RNFetchBlob.fs.ls(`${getDocumentDir()}${MEDIA_DIR}`)

    for(let index in trackFilenames) {
        let itemIsDir = await RNFetchBlob.fs.isDir(`${getDocumentDir()}${MEDIA_DIR}/${trackFilenames[index]}`);

        if (!itemIsDir) {

            if (!trackFilenames[index].startsWith(".")) {

                let imageFileName = trackFilenames[index].substring((trackFilenames[index]).indexOf("_Track"), (trackFilenames[index]).indexOf(".mp3")) + '.jpg';

                tracks.push({
                    id: id++,
                    name: trackFilenames[index],
                    path: `${getDocumentDir()}${MEDIA_DIR}/${trackFilenames[index]}`,
                    image: `${getDocumentDir()}${IMAGES_DIR}/${imageFileName}`
                })
            }
        }
        // files will an array contains filenames
        //
        // trackFilenames.forEach(trackFilename => {
        //     if(!trackFilename.startsWith(".")) {
        //         tracks.push({
        //             id: id++,
        //             name: trackFilename,
        //             path: `${getDocumentDir()}${MEDIA_DIR}/${trackFilename}`
        //         })
        //     }
        //
        // })
    }
    return tracks
}


export default {
    getTracksFromLibrary,
}

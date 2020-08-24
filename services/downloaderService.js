import RNFetchBlob from 'rn-fetch-blob'
import {VALIDATE_ENDPOINT, DOWNLOAD_ENDPOINT, API_URL} from '../common/constants';
import {queryString, sanitizeFilename} from '../common/utils';
import ios from 'rn-fetch-blob/ios';


// const iosRN = RNFetchBlob.ios
const MEDIA_DIR = `/MediaLibrary`
const IMAGES_DIR = `${MEDIA_DIR}/Images`


// Document directory path changes after each access
// so we must fetch instead of a static reference
const getDocumentDir = () => RNFetchBlob.fs.dirs.DocumentDir;


const createLibraryFolders = () => {
    RNFetchBlob.fs.mkdir(`${getDocumentDir()}${MEDIA_DIR}`)
                    .then(() => console.log(`Library directory created`))
                    .catch(() => console.log(`Library directory already exists!!`))

    RNFetchBlob.fs.mkdir(`${getDocumentDir()}${IMAGES_DIR}`)
        .then(() => console.log(`Library/Images directory created`))
        .catch(() => console.log(`Library/Images directory already exists!!`))
}

// const moveFileToLibrary = async (fromPath) => {
//
//
//     var filename = fromPath.split('/').pop();
//
//     await RNFetchBlob.fs.mv(fromPath, `${libraryDir}/${filename}`)
//
//
//     console.log("Track moved to Library! @ " + `${libraryDir}/${filename}`)
//
//     return `${getDocumentDir()}${MEDIA_DIR}`;
//
// }

const getInfo = async (url, onFail) => {

    return await fetch(url)
        .then(res => res.json())
        .catch(err => onFail());

}


const saveImage = async (url, filename, onFail) => {
    let filenameNoWhitespace = filename.replace(/\s/g, "") + ".jpg"
    let filepath = `${getDocumentDir()}${IMAGES_DIR}/${filenameNoWhitespace}`;

    try {

        await RNFetchBlob
            .config({
                path: filepath
            })
            .fetch('GET',
                url,
                {})
    } catch (err) {
        console.log("The ERROR!")

        console.log(err)
        onFail()
    }

}


const getNewTrackIdString = async () => {
    let librarySize = await getLibrarySize();

    return `_TrackID${librarySize.toString()}`

}

// download mp3
// TODO: set timeout!
const download = async (url, filename, onFail, downloadProgressCallBack) => {

    // let libraryCount = getLibrarySize();

    let trackIdString = await getNewTrackIdString()

    filename = filename.replace(/\//g, "-");

    filename = sanitizeFilename(filename)

    // let filenameNoWhitespace = filename.replace(/\s/g, "") + ".mp3";

    let filenameNoWhitespace = `${filename.replace(/\s/g, "")}${trackIdString}.mp3`;


    let filepath = `${getDocumentDir()}${MEDIA_DIR}/${filenameNoWhitespace}`;

    try {

        await RNFetchBlob
            .config({
                path: filepath
            })
            .fetch('GET',
                `${API_URL}${DOWNLOAD_ENDPOINT}${queryString('url', url)}`,

                {
                    //some headers ..
                }).progress({ interval : 50 }, (received, total) => {
                    if(downloadProgressCallBack != null) {
                        downloadProgressCallBack(received, total)
                    }
            })
                    //     .then( (res) =>

        filepath = `${getDocumentDir()}${MEDIA_DIR}/${filenameNoWhitespace}`
        return filepath;

    }


    catch(err)  {

        console.log(err)
        onFail()
    }
}

const getTracksFromLibrary = async () => {
    let tracks = [];
    let trackFilenames = await RNFetchBlob.fs.ls(`${getDocumentDir()}${MEDIA_DIR}`)
    // files will an array contains filenames

    trackFilenames.forEach(trackFilename => {
        if(!trackFilename.startsWith(".")) {
            tracks.push({
                id: trackFilename,
                name: trackFilename,
                path: `${getDocumentDir()}${MEDIA_DIR}/${trackFilename}`
            })
        }

    })
    return tracks
}

const getLibrarySize = async () => {
    let count = 0
    let libraryContents = await RNFetchBlob.fs.ls(`${getDocumentDir()}${MEDIA_DIR}`);
    for(let item in libraryContents) {
        let itemIsDir = await RNFetchBlob.fs.isDir(`${getDocumentDir()}${MEDIA_DIR}/${libraryContents[item]}`);
        if(!itemIsDir && !libraryContents[item].startsWith(".")) {
           count++;
        }
    }
    return count
}


export default {
    download,
    getInfo,
    createLibraryFolders,
    saveImage,
    getTracksFromLibrary,
    getNewTrackIdString
    // getDownloadProgress
    // moveFileToLibrary
}

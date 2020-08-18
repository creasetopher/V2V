import RNFetchBlob from 'rn-fetch-blob'
import {VALIDATE_ENDPOINT, DOWNLOAD_ENDPOINT, API_URL} from '../common/constants';
import {queryString} from '../common/utils';
import ios from 'rn-fetch-blob/ios';


// const iosRN = RNFetchBlob.ios
const MEDIA_DIR = `/MediaLibrary`


// Document directory path changes after each access
// so we must fetch instead of a static reference
const getDocumentDir = () => RNFetchBlob.fs.dirs.DocumentDir;


const createLibraryFolder = () => {
    RNFetchBlob.fs.mkdir(`${getDocumentDir()}${MEDIA_DIR}`)
                    .then(() => console.log(`Library directory created`))
                    .catch(() => console.log(`Library directory already exists!!`))
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

const download = async (url, filename, onFail, downloadProgressCallBack) => {

    filename = filename.replace(/\//g, "-")

    console.log("file" + filename)
    let filenameNoWhitespace = filename.replace(/\s/g, "") + ".mp3"

    let filepath = `${getDocumentDir()}${MEDIA_DIR}/${filenameNoWhitespace}`;
    try {

        await RNFetchBlob
            .config({
                // fileCache: true,
                // appendExt: 'mp3',
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


        // return filepath;
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


export default {
    download,
    getInfo,
    createLibraryFolder,
    getTracksFromLibrary,
    // getDownloadProgress
    // moveFileToLibrary
}

import RNFetchBlob from 'rn-fetch-blob'
import {VALIDATE_ENDPOINT, DOWNLOAD_ENDPOINT, API_URL} from '../common/constants';
import {queryString} from '../common/utils';
import ios from 'rn-fetch-blob/ios';

// let path = RNFetchBlob.fs.dirs.DocumentDir

const iosRN = RNFetchBlob.ios
const iosFP = RNFetchBlob.fs.dirs.DocumentDir
const libraryDir = `${iosFP}/MediaLibrary`


const getPath = () => console.log(iosFP);


const createLibraryFolder = () => {
    RNFetchBlob.fs.mkdir(libraryDir)
                    .then(() => console.log(`Library directory created @ ${libraryDir}!`))
                    .catch(() => console.log(`Library directory already exists! @ ${libraryDir}!`))
}

const moveFileToLibrary = async (fromPath) => {
    var filename = fromPath.split('/').pop();

    await RNFetchBlob.fs.mv(fromPath, `${libraryDir}/${filename}`)


    console.log("Track moved to Library! @ " + `${libraryDir}/${filename}`)

    return `${libraryDir}/${filename}`;

}

const getInfo = async (url, onFail) => {


    return await fetch(url)
        .then(res => res.json())
        .catch(err => onFail());

}



const download = async (url, filename, onFail) => {

    try {

        let dlpath = await RNFetchBlob
            .config({
                fileCache: true,
                appendExt: 'mp3',
                // path: `${iosFP}/${filename}.mp3`
            })
            .fetch('GET',
                `${API_URL}${DOWNLOAD_ENDPOINT}${queryString('url', url)}`,

                {
                    //some headers ..
                })

        // let libraryPath = await moveFileToLibrary(dlpath.path())
        //
        // console.log("path is " + libraryPath);
        //
        // return libraryPath;



        return dlpath.path();
    }


    catch(err)  {

        console.log(err)
        onFail()
    }
}

getPath()

export default {
    download,
    getInfo,
    getPath,
    createLibraryFolder,
    moveFileToLibrary
}

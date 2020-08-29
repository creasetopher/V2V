import sanitize from 'sanitize-filename';

export const queryString = (param, value) => {
    return '?'.concat(param, '=', value)
}


const getWatchParam = (url) => {
    let newUrl = null;

    if (url.startsWith("https://youtube.com")
        || url.startsWith("https://m.youtube.com")) {

        if (url.indexOf("watch?") != -1) {

            newUrl = url;

            if (url.indexOf("&") != -1) {

                newUrl = url.substring(
                    0,
                    url.indexOf("&")
                )
            }
        }
    }

    return newUrl;
}

export const getValidYoutubeVideo = (url) => {
    return getWatchParam(url);

}

export const sanitizeFilename = (filename) => {
    filename = filename.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    return sanitize(filename)
}

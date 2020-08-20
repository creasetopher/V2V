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

export default class Track {

    title = null
    description = null
    author = null
    views = null
    length = null
    rating = null
    thumbnailUrl = null
    filename = null;

    constructor(trackObj) {
        this.title = trackObj.track.title
        this.description = trackObj.track.description
        this.author = trackObj.track.author
        this.views = trackObj.track.views
        this.length = trackObj.track.length
        this.rating = trackObj.track.rating
        this.thumbnailUrl = trackObj.track.thumbnail
    }

}

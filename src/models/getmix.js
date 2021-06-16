const scdl = require('soundcloud-downloader').default
const fs = require('fs')

const SOUNDCLOUD_URL = 'https://soundcloud.com/askdjfhaklshf'
const CLIENT_ID = 'asdhkalshdkhsf'

scdl.download(SOUNDCLOUD_URL).then(stream => stream.pipe(fs.createWriteStream('audio.mp3')))
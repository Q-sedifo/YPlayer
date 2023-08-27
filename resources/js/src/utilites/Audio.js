
// Helping functions for audio
export const getMP3Duration = (mp3File) => {
    return new Promise((resolve, reject) => {
        const audio = new Audio()
        audio.addEventListener('loadedmetadata', function () {
            const duration = audio.duration
            resolve(duration)
        })
        audio.addEventListener('error', function () {
            reject('Помилка завантаження аудіофайлу.')
        })
        audio.src = URL.createObjectURL(mp3File)
    })
}
module.exports = {
    formatDuration: (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) return `${hours} heures, ${minutes % 60} minutes`;
        if (minutes > 0) return `${minutes} minutes, ${seconds % 60} secondes`;
        return `${seconds} secondes`;
    }
};
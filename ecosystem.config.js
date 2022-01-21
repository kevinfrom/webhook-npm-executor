module.exports = {
    apps: [{
        name: 'npm-exec.kevinfrom.dk',
        script: 'npm',
        args: 'start',
        env: {
            NODE_ENV: 'production'
        },
	watch: true
    }]
}

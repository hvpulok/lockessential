pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('NPM') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run start:prod'
            }
        }
    }
}
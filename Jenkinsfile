pipeline {
    agent any
    stages {
        stage('NPM') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run build'
            }
        }
    }
}
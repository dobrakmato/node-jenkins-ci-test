#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Prepare build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run flow'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {

            def gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
            def shortCommit = gitCommit.take(6)

            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                echo "Deploying to directory /var/deplyoments/${shortCommit}/"
                sh './deploy.sh'
            }
        }
    }
}
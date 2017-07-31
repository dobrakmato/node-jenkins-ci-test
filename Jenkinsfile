#!/usr/bin/env groovy
pipeline {
    agent any

    stages {
        stage('Populate variables') {
            steps {
                script {
                    env.GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    env.GIT_COMMIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    env.GIT_COMMIT_AUTHOR = sh(returnStdout: true, script: 'git log --format="%aN" HEAD -n 1').trim()
                    env.GIT_COMMIT_AUTHOR_EMAIL = sh(returnStdout: true, script: 'git log --format="%aE" HEAD -n 1').trim()
                    env.GIT_COMMIT_AUTHOR_EMAIL_COMBINED = sh(returnStdout: true, script: 'git log --format="%aN <%aE>" HEAD -n 1').trim()
                    env.GIT_COMMIT_SUBJECT = sh(returnStdout: true, script: 'git log --format="%s" HEAD -n 1').trim()
                }
            }
        }
        stage('Prepare build') {
            steps {
                nodejs(nodeJSInstallationName: 'v8.1.4', configId: null) {
                    sh '''node --version
                    npm --version'''
                    echo "Building changeset ${env.GIT_COMMIT} (${env.GIT_COMMIT_SUBJECT}) " +
                            "by ${env.GIT_COMMIT_AUTHOR_EMAIL_COMBINED} as build ${currentBuild.displayName}..."
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'v8.1.4', configId: null) {
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'v8.1.4', configId: null) {
                    sh 'npm test'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'deploying...'
            }
        }
    }
    post {
        always {
            // report to slack
            echo "Notifying ${env.GIT_COMMIT_AUTHOR_EMAIL_COMBINED} of ${currentBuild.result} of build " +
                    "${currentBuild.displayName} of changeset ${env.GIT_COMMIT} (${env.GIT_COMMIT_SUBJECT})"
        }

        success {
            echo "Deploying changeset ${env.GIT_COMMIT}/${currentBuild.displayName} (${env.GIT_COMMIT_SUBJECT}) " +
                    "by ${env.GIT_COMMIT_AUTHOR_EMAIL_COMBINED} to folder " +
                    "/var/deployments/mh3-api/${env.GIT_COMMIT_SHORT}"
        }
    }
}
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

                    echo "Branch: ${env.BRANCH_NAME}"

                    if (env.BRANCH_NAME.equals('master')) {
                        env.DEPLOY_ENVIRONMENT = 'production'
                    } else if (env.BRANCH_NAME.equals('develop')) {
                        env.DEPLOY_ENVIRONMENT = 'staging'
                    } else {
                        env.DEPLOY_ENVIRONMENT = 'n/a'
                    }

                    /* Configure these appropriately */
                    env.DEPLOY_NAME = "mh3"
                }
            }
        }
        stage('Install dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'v8.1.4', configId: null) {
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
                    sh 'npm run test-jenkins'
                }
            }
        }
        stage('Deploy files') {
            when {
                expression { BRANCH_NAME ==~ /(master|develop)/ }
            }
            steps {
                // Deploy files to specified directory and install production node modules.
                nodejs(nodeJSInstallationName: 'v8.1.4', configId: null) {
                    sh "/var/deployments/deploy_app_pre.sh ${env.DEPLOY_NAME} ${env.GIT_COMMIT_SHORT} ${env.WORKSPACE}"
                }
            }
        }
        stage('Deploy configuration') {
            when {
                expression { BRANCH_NAME ==~ /(master|develop)/ }
            }
            steps {
                echo 'create deployment descriptor file in deployment dir'
                echo 'copy configuration to deployment dir'
            }
        }
        stage('Deploy to production') {
            when {
                expression { BRANCH_NAME ==~ /(master|develop)/ }
            }
            steps {
                // Stop running server process.
                sh "/var/deployments/deploy_app_stop.sh ${env.DEPLOY_NAME} ${env.DEPLOY_ENVIRONMENT}"

                // Update symlink of deployed app.
                sh "/var/deployments/deploy_app_post.sh ${env.DEPLOY_NAME} ${env.GIT_COMMIT_SHORT} ${env.DEPLOY_ENVIRONMENT}"

                // Start server process.
                nodejs(nodeJSInstallationName: 'v8.1.4', configId: null) {
                    sh "/var/deployments/deploy_app_start.sh ${env.DEPLOY_NAME} ${env.DEPLOY_ENVIRONMENT} node dist/app.js"
                }
            }
        }
    }
    post {
        always {
            // Archive the artifacts
            archive 'dist/**/*.*'
            archive 'artifacts/**/*.*'

            // xunit tests
            junit 'artifacts/test/*.xml'

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
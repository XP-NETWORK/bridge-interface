pipeline {
  agent {
    docker {
     image 'node:6-alpine'
     args '-p 3000:3000'
    }
  }
  environment {
    CI = 'true'
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test and Build') {
      parallel {
        stage('Run Tests') {
          steps {
            sh 'npm run test'
          }
        }
        stage('Create Build Artifacts') {
          steps {
            sh 'npm run build'
          }
        }
      }
    }

    stage('Production') {
       steps {
          withAWS(region:'us-east', credentials:'7c7202fd-9de5-46ce-a20f-991c6eaabf8e') {
              s3Delete(bucket: 'test-bucket-replica', path:'**/*')
              s3Upload(bucket: 'test-bucket-replica', workingDir:'build', includePathPattern:'**/*');
          }
       }
    }
  }
}
pipeline {
  agent {
    docker {
     image 'node:14-buster'
    }
  }
  environment {
    CI = 'false'
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Install Packages') {
      steps {
            sh 'rm -rf package-lock.json'
            sh  'npm install'
      }
    }
    stage('Test and Build') {

        steps {
            sh 'npm run build'
        }


    }

    stage('Production') {
       steps {
          withAWS(region:"us-east-1", credentials: "7c7202fd-9de5-46ce-a20f-991c6eaabf8e") {
              s3Delete(bucket: 'test-bucket-replica', path:'**/*')
              s3Upload(bucket: 'test-bucket-replica', workingDir:'build', includePathPattern:'**/*');
          }
       }
    }
  }
}
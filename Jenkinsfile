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
    stage('Setup') {
      steps {      
            sh 'rm -rf package-lock.json'
            sh  'npm install'
      }
    }
    stage('Build') {
        steps {
                sh 'npm run build'
        }
    }
    
    
    stage('Deploy'){
    
    	 parallel {
	    stage('Staging-Deploy') {
	       when {
			branch 'development'
	       }	
	       steps {
		      echo 'development' 
		      withAWS(region:"us-east-1", credentials: "7c7202fd-9de5-46ce-a20f-991c6eaabf8e") {
			      
			  s3Delete(bucket: 'development-bridge.xp.network', path:'**/*')
		          s3Upload(bucket: 'development-bridge.xp.network', workingDir:'build', includePathPattern:'**/*');
			      
		          s3Delete(bucket: 'testing.bridge.xp.network', path:'**/*')
		          s3Upload(bucket: 'testing.bridge.xp.network', workingDir:'build', includePathPattern:'**/*');
			      
			  cfInvalidate(distribution:'E2TRABW1D761CA', paths:['/*'], waitForCompletion: true);
			  cfInvalidate(distribution:'E2VH18EBXVH69V', paths:['/*'], waitForCompletion: true);
		      }
	       }
	    }

	    stage('Main-Deploy') {
	       when {
			branch 'temporary'
	       }
	       steps {
		      echo 'temporary'
		      withAWS(region:"us-east-1", credentials: "7c7202fd-9de5-46ce-a20f-991c6eaabf8e") {
			      
		          s3Delete(bucket: 'temporary.bridge.xp.network', path:'**/*')
		          s3Upload(bucket: 'temporary.bridge.xp.network', workingDir:'build', includePathPattern:'**/*');
			      
			  cfInvalidate(distribution:'E327TLGEF3Q2LI', paths:['/*'], waitForCompletion: true)
		      }
	       }
	    }
	}	    
    }
  }
}


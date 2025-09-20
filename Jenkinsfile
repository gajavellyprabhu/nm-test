pipeline {
    agent { label 'dev-server' }
    environment {
        PORT = '10400'
        NODE_ENV = 'production'
        SITECORE_API_HOST = 'http://10.150.18.83'
        SITECORE_API_KEY = credentials('sitecore-api-key')
        JSS_APP_NAME = 'murabba-site'
        // PUBLIC_URL = 'http://newmurabbasc.dev.local/'
        PUBLIC_URL = 'http://10.150.17.141:10400/  '
        GRAPH_QL_ENDPOINT = 'http://10.150.18.83/api/items'
        // FETCH_WITH = 'GraphQL'
        JSS_EDITING_SECRET = credentials('jss-editing-secret')
        DEBUG = 'sitecore-jss:*'
        FETCH_WITH='REST'
        LAYOUT_SERVICE_CONFIGURATION_NAME='sxa-jss'
        // NEW_RELIC_LICENSE_KEY = credentials('new-relic-key')
        // NEW_RELIC_APP_NAME = 'newrelic-murabba'
        // NEW_RELIC_LOG_LEVEL = 'info'
    }
    stages {
        stage('Build & Deploy') {
            steps {
                sh '''
                docker build \
                  -t new-murabba:dev \
                  --build-arg NODE_ENV=${NODE_ENV} \
                  --build-arg PORT=${PORT} \
                  --build-arg SITECORE_API_HOST=${SITECORE_API_HOST} \
                  --build-arg JSS_APP_NAME=${JSS_APP_NAME} \
                  --build-arg PUBLIC_URL=${PUBLIC_URL} \
                  --build-arg GRAPH_QL_ENDPOINT=${GRAPH_QL_ENDPOINT} \
                  --build-arg FETCH_WITH=${FETCH_WITH} \
                  --build-arg DEBUG=${DEBUG} \
                  --build-arg LAYOUT_SERVICE_CONFIGURATION_NAME=${LAYOUT_SERVICE_CONFIGURATION_NAME} \
                   .
                '''
            }
        }
        stage('Start Container') {
            steps {
                sh '''
                docker stop new-murabba-dev || true
                docker rm new-murabba-dev || true

                docker run -d \
                    -p ${PORT}:${PORT} \
                    -e NODE_ENV="${NODE_ENV}" \
                    -e PORT="${PORT}" \
                    -e SITECORE_API_HOST="${SITECORE_API_HOST}" \
                    -e SITECORE_API_KEY="${SITECORE_API_KEY}" \
                    -e JSS_APP_NAME="${JSS_APP_NAME}" \
                    -e PUBLIC_URL="${PUBLIC_URL}" \
                    -e GRAPH_QL_ENDPOINT="${GRAPH_QL_ENDPOINT}" \
                    -e FETCH_WITH="${FETCH_WITH}" \
                    -e JSS_EDITING_SECRET="${JSS_EDITING_SECRET}" \
                    -e DEBUG="${DEBUG}" \
                    -e LAYOUT_SERVICE_CONFIGURATION_NAME="${LAYOUT_SERVICE_CONFIGURATION_NAME}" \
                    -e NEW_RELIC_LICENSE_KEY="${NEW_RELIC_LICENSE_KEY}" \
                    -e NEW_RELIC_APP_NAME="${NEW_RELIC_APP_NAME}" \
                    -e NEW_RELIC_NO_CONFIG_FILE=false \
                    -e NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
                    -e NEW_RELIC_LOG=stdout \
                    -e NEW_RELIC_LOG_LEVEL="${NEW_RELIC_LOG_LEVEL}" \
                    --name new-murabba-dev \
                    new-murabba:dev
                '''
            }
        }
    }
}

# Build stage
FROM node:18.17.0-alpine AS builder

# Install Python for node-gyp
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install
#RUN npm ci 

# Copy application files
COPY . .

# Build arguments
ARG NODE_ENV=production
ARG PORT=10400
ARG SITECORE_API_HOST
ARG JSS_APP_NAME
ARG PUBLIC_URL
ARG GRAPH_QL_ENDPOINT
ARG FETCH_WITH
ARG DEBUG
ARG FETCH_WITH
ARG LAYOUT_SERVICE_CONFIGURATION_NAME

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV NEXT_TELEMETRY_DISABLED=1
ENV SITECORE_API_HOST=$SITECORE_API_HOST
ENV JSS_APP_NAME=$JSS_APP_NAME
ENV PUBLIC_URL=$PUBLIC_URL
ENV GRAPH_QL_ENDPOINT=$GRAPH_QL_ENDPOINT
ENV FETCH_WITH=$FETCH_WITH
ENV DEBUG=$DEBUG
ENV FETCH_WITH=$FETCH_WITH
ENV LAYOUT_SERVICE_CONFIGURATION_NAME=$LAYOUT_SERVICE_CONFIGURATION_NAME
ENV NEW_RELIC_NO_CONFIG_FILE=false
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout
ENV USE_STANDALONE=true


# Build application
RUN npm run build

# Production stage
FROM node:18.17.0-alpine AS runner

# Install PM2 globally
RUN npm install -g pm2

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/pm2.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/newrelic.js ./

# Environment variables
ENV NODE_ENV=production
ENV PORT=10400

USER nextjs

EXPOSE 10400 10410 10420 10430 10440

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:${PORT}/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Start with PM2
CMD ["pm2-runtime", "start", "pm2.config.js", "--env", "${NODE_ENV}"]
#CMD ["node", "server.js"] working
#CMD ["sh", "-c", "NODE_OPTIONS='-r newrelic' node server.js"]
#CMD ["npm", "run", "next:start"]
#CMD ["sh", "-c", "npm run start"]
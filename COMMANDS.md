# Gutenberg Block Development Commands

## Docker
```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose restart wordpress  # Restart WordPress
```

## React Block Development
```bash
# Install dependencies
docker exec gutenburg-testing-node-1 sh -c "cd /app/zacks-react-suite && npm install"

# Development (watch mode with hot reload)
docker exec gutenburg-testing-node-1 sh -c "cd /app/zacks-react-suite && npm start"

# Production build
docker exec gutenburg-testing-node-1 sh -c "cd /app/zacks-react-suite && npm run build"
```

## Create New React Block
```bash
docker exec gutenburg-testing-node-1 sh -c "cd /app && npx @wordpress/create-block@latest block-name"
```

## Access
- WordPress: http://localhost:8080
- Admin: http://localhost:8080/wp-admin

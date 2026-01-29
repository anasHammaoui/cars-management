# DevOps - Gestion de Concession Automobile

## 🐳 Docker

### Build et Run
```bash
# Build l'image Docker
npm run docker:build

# Run le container
npm run docker:run

# Développement avec Docker Compose
npm run docker:dev

# Production avec Docker Compose
npm run docker:prod
```

### Commandes Docker manuelles
```bash
# Build
docker build -t gestion-concession .

# Run avec JSON Server
docker-compose up

# Run en production
docker-compose up app json-server
```

## 🚀 CI/CD Pipeline

### GitHub Actions
Le pipeline CI/CD s'exécute automatiquement sur :
- **Push** vers `main` ou `develop`
- **Pull Request** vers `main`

### Étapes du Pipeline
1. **Tests unitaires** (Jasmine/Karma)
2. **Tests E2E** (Cypress)
3. **Build** de l'application
4. **Build** de l'image Docker
5. **Push** vers Docker Hub
6. **Déploiement** automatique

### Variables d'environnement requises
```bash
# Dans GitHub Secrets
DOCKER_USERNAME=your-docker-username
DOCKER_PASSWORD=your-docker-password
```

## 🌐 Déploiement

### Environnements
- **Development** : `develop` branch → Staging
- **Production** : `main` branch → Production

### URLs
- **Application** : http://localhost (Docker)
- **API JSON Server** : http://localhost:3000
- **Development** : http://localhost:4200

## 📊 Monitoring

### Health Checks
```bash
# Vérifier l'application
curl http://localhost/

# Vérifier l'API
curl http://localhost:3000/cars
```

### Logs
```bash
# Logs Docker
docker logs <container-id>

# Logs Docker Compose
docker-compose logs app
docker-compose logs json-server
```
cd express-typeorm-docker-starter
docker-compose -f staging.yml stop
git pull origin develop
docker-compose -f staging.yml build
docker-compose -f staging.yml up -d
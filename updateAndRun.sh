git pull;
#command for cleaning up old images
#docker images | grep "2 months" | awk '{print $3}' | xargs docker rmi -f
docker build .;
docker-compose up;
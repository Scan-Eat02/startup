To make images of all the services on your local environment, compose file is needed to be run :
 - docker-compose -f docker-compose-backend.yaml up
 - docker-compose -f docker-compose-service.yaml up
 - docker exec -it cockroach11 cockroach init --insecure
 - cockroach sql --insecure --host=127.0.0.1:26257
 - CREATE DATABASE evt_manager;

To make changes in a service and test it on your local image, first make the service down : 
- docker {image-name} down

To make image of your own modified service, up that service on your local docker :
- docker build -t yashd26/scan_eat:{image-name} {docker file path (.)}

After verifying the changes to make the image update on docker hub : 
- docker push yashd26/scan_eat:{image-name}

To make new migration file : 
- npx sequelize-cli migration:generate --name add_fk_event_to_store
# ExtraNet.Identity
This project simplifies the configuration and communication to Keycloak

## Deploying
### Install helmchart
Install your application (run this commands into ```eng\chart\extranet-identity```)
``` 
helm upgrade --install extranet-identity . -n extranet-identity --create-namespace --wait
```
Expose 8083 port
```
kubectl port-forward svc/extranet-identity-api -n extranet-identity 8083:80
```
Your application will run on: \
http://localhost:8083/swagger/index.html

## APIs
### Add User
Note: \
Username must be unique \
Email must be a valid email 
```
[POST] /simpleuser 
```

__Request Body__:
```json
{
  "username": "your_username",
  "firstName": "your_name",
  "lastName": "your_surname",
  "email": "your@email",
  "temporaryPassword": "your_password",
  "enabled": true,
  "groups": [
    "your_group"
  ]
}
```
---
### Add User using Keycloak API body
Note: \
Username must be unique \
Email must be a valid email 
```
[POST] /completeuser 
```
 
__Request Body__: \
[UserRepresentation](https://www.keycloak.org/docs-api/latest/rest-api/index.html#UserRepresentation) (Keycloak REST API Documentation)

## Job
Run job to import realm from file  ```src\ExtraNet.Identity.Job\realm-export.json```

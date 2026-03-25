# ExtraNet.ApiGateway

# TODO: Add README.md

__Install helmchart:__\
Run this command in path "ExtraNet.ApiGateway\eng\chart\extranet-apigateway" \
`helm upgrade --install extranet-apigateway . -n extranet-apigateway --create-namespace --wait`

__Port Forwarding:__\
`kubectl port-forward svc/extranet-apigateway -n extranet-apigateway 8081:80`

---
__Test link:__ \
Your application is now running on: \
http://localhost:8081/swagger/index.html


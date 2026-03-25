# ExtraNet.Recruitments
---

## Docker Commands

### Build Docker
```
docker build -t my-image . -f ./src/ExtraNet.Recruitments.API/Dockerfile
```

### Run Docker
```
docker run -p 8089:8080 my-image
```

## Migration Commands

### Create Migration
```
add-migration Initial -Project "ExtraNet.Recruitments.Persistence.Migrations" -StartupProject "ExtraNet.Recruitments.Job" -Context RecruitmentsDbContext -o MigrationsScripts
```

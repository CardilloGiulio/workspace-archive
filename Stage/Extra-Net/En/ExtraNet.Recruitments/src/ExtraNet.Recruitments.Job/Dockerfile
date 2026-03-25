FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

ENV ASPNETCORE_URLS http://+:8080
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG PAT=localhost
ARG WORKDIR=/s
WORKDIR ${WORKDIR}
ENV DOTNET_CLI_HOME=${WORKDIR}/dotnet-cli-home/
COPY . .
RUN dotnet restore ./ExtraNet.Recruitments.slnx
RUN dotnet build --no-restore -c Release ./ExtraNet.Recruitments.slnx

FROM build AS publish
RUN dotnet publish ./src/ExtraNet.Recruitments.Job/ --no-restore --no-build -c Release -o /app/publish

FROM base AS final
ENV USERNAME=1000
ENV HOME=/home/${USERNAME}
RUN mkdir -p ${HOME}
ENV APP_HOME=${HOME}/app
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}
COPY --from=publish /app/publish ${APP_HOME}
USER ${USERNAME}
ENTRYPOINT ["dotnet", "ExtraNet.Recruitments.Job.dll"]
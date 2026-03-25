{{- define "extranet-recruitments.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "extranet-recruitments.image" -}}
{{- $registryName := .imageRoot.registry -}}
{{- $repositoryName := .imageRoot.repository -}}
{{- $tag := .imageRoot.tag | default .scope.Chart.AppVersion | toString -}}
{{- if .global }}
    {{- if .global.imageRegistry }}
     {{- $registryName = .global.imageRegistry -}}
    {{- end -}}
{{- end -}}
{{- if $registryName }}
{{- printf "%s/%s:%s" $registryName $repositoryName $tag -}}
{{- else -}}
{{- printf "%s:%s" $repositoryName $tag -}}
{{- end -}}
{{- end -}}

{{- define "extranet-recruitments.postgres.connectionString" -}}
{{- printf "Host=%s.%s.svc.cluster.local;Port=%d;Database=%s;Username=%s;Password=%s" .Values.postgresql.hostname .Values.postgresql.namespace (.Values.postgresql.port | int) .Values.postgresql.auth.username .Values.postgresql.auth.password .Values.postgresql.auth.database -}}
{{- end -}}

{{- define "extranet-recruitments.imageRegistry" -}}
{{- printf "{\"auths\":{\"%s\":{\"username\":\"%s\",\"password\":\"%s\",\"auth\":\"%s\"}}}" .Values.secrets.imageRegistry.address .Values.secrets.imageRegistry.username .Values.secrets.imageRegistry.password (printf "%s:%s" .Values.secrets.imageRegistry.username .Values.secrets.imageRegistry.password | b64enc) -}}
{{- end -}}
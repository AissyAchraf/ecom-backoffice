FROM quay.io/keycloak/keycloak:22.0.1

ENV KC_DB=dev-file
ENV KC_HTTP_RELATIVE_PATH=/

EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]

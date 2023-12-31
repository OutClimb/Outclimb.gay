FROM node:lts

ARG BRANCH_NAME
ENV LOOKASIDE ${BRANCH_NAME}

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build

CMD rm -rf /lookaside/${BRANCH_NAME} && cp -r /app/dist /lookaside/${BRANCH_NAME}

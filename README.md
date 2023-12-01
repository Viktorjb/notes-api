<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# End-points

GET, POST
- https://bha24ra5yb.execute-api.eu-north-1.amazonaws.com/notes

```json
{
    "title": "Example Title",
    "text": "Example Note Content"
}
```

POST
- https://bha24ra5yb.execute-api.eu-north-1.amazonaws.com/auth/signup

```json
{
    "username": "exampleuser",
    "password": "examplepassword"
}
```

POST
- https://bha24ra5yb.execute-api.eu-north-1.amazonaws.com/auth/login

```json
{
    "username": "exampleuser",
    "password": "examplepassword"
}
```

PUT
- https://bha24ra5yb.execute-api.eu-north-1.amazonaws.com/notes/{noteId}

```json
{
    "text": "New text for note"
}
```

DELETE
- https://bha24ra5yb.execute-api.eu-north-1.amazonaws.com/notes/{noteId}





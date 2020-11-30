# Linting as a Service

# Installation

###   Pull the Docker Container
#### `docker pull ghcr.io/tanishshinde/linting-as-a-service:latest`

###  Start the Docker Container
#### `docker run -d -p 3000:3000 ghcr.io/tanishshinde/linting-as-a-service:latest`


# Documentation

### Request Structure
```json
{
  "script": "script content",
  "type": "sh | bash | dash | ksh"
}
```
### Response Structure
```json
{
  "status": "fail | success",
  "message": "Error message",
  "shellCheckResults": [lintResults]
}
```

## Server Usage

### No lint issues request
```shell script
    curl \
        -X POST \
        -d '{ "type": "sh" , "script": "echo 123" }' \
        -H "Content-Type: application/json" \
        127.0.0.1:3000/check
```

### No lint issues response

```json
{
  "status":"success",
  "shellCheckResults":[]
}
```

### Lint issues request
```shell script
  curl \
    -X POST \
    -d '{ "type": "sh" , "script": "if [ '1' = '2' ] ; then \n echo 2 \n fi" }' \
    -H "Content-Type: application/json" \
    127.0.0.1:3000/check
```

### Lint issues response

```json
{
  "status":"success",
  "shellCheckResults":[
      {
        "file":"tmpFiles/1946.sh",
        "line":1,
        "endLine":1,
        "column":8,
        "endColumn":9,
        "level":"warning",
        "code":2050,
        "message":"This expression is constant. Did you forget the $ on a variable?",
        "fix":null
      }
  ]
}
```

<!--
title: Serverless Framework - Events
menuText: Events
menuOrder: 2
description: Configuring function events in the Serverless Framework
layout: Doc
-->

<!-- DOCS-SITE-LINK:START automatically generated  -->

### [Read this on the main serverless docs site](https://www.serverless.com/framework/docs/guides/events)

<!-- DOCS-SITE-LINK:END -->

# Events

Simply put, events are the things that trigger your functions to run.

All `events` in the service are anything in your service provider (e.g. S3, API Gateway, etc) that can trigger the Function, like a blob update, an SNS topic message, cron schedule, etc.

Upon deployment, the framework will deploy any infrastructure required for an event and configure your `function` to listen to it.

## Supported events

Each provider (e.g. AWS, Azure, Tencent) support different types of events. Each provider's events can be found here:

- [AWS Lambda Events](/framework/docs/providers/aws/events/)
- [Alibaba Cloud Function Events](/framework/docs/providers/aliyun/events/)
- [Azure Function Events](/framework/docs/providers/azure/events/)
- [Cloudflare Worker Events](/framework/docs/providers/cloudflrare/events/)
- [Fn Events](/framework/docs/providers/fn/events/)
- [Google Function Events](/framework/docs/providers/google/events/)
- [Knative Events](/framework/docs/providers/knative/events/)
- [Apache OpenWhisk Events](/framework/docs/providers/openwhisk/events/)
- [Spotinst Function Events](/framework/docs/providers/spotist/events/)
- [Tencent SCF Events](/framework/docs/providers/tencent/events/)

## Configuration

Events belong to each Function and can be found in the `events` property in `serverless.yml`.

```yml
# 'functions' in serverless.yml
functions:
  createUser: # Function name
    handler: handler.createUser # Reference to file handler.js & exported function 'createUser'
    events: # All events associated with this function
      - http:
          path: users/create
          method: post
```

Events are objects, which can contain event-specific information.

The `events` property is an array, because it's possible for functions to be triggered by multiple events, as shown.

You can set multiple Events per Function, as long as that is supported by the providers.

```yml
# 'functions' in serverless.yml
functions:
  createUser: # Function name
    handler: handler.users # Reference to file handler.js & exported function 'users'
    events: # All events associated with this function
      - http:
          path: users/create
          method: post
      - http:
          path: users/update
          method: put
      - http:
          path: users/delete
          method: delete
```

## Types

The Serverless Framework supports all of events from all the providers. Refer to the [Supported Events](#supported-events) section for a list of all supported event types for each provider.

## Deploying

To deploy or update your Functions, Events and Infrastructure, run `serverless deploy`.

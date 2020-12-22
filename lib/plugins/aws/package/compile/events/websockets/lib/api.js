'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

module.exports = {
  compileApi() {
    const apiGateway = this.serverless.service.provider.apiGateway || {};

    // immediately return if we're using an external websocket API id
    if (apiGateway.websocketApiId) {
      return BbPromise.resolve();
    }

    this.websocketsApiLogicalId = this.provider.naming.getWebsocketsApiLogicalId();

    const RouteSelectionExpression =
      this.serverless.service.provider.websocketsApiRouteSelectionExpression ||
      '$request.body.action';

    _.merge(this.serverless.service.provider.compiledCloudFormationTemplate.Resources, {
      [this.websocketsApiLogicalId]: {
        Type: 'AWS::ApiGatewayV2::Api',
        Properties: {
          Name: this.provider.naming.getWebsocketsApiName(),
          RouteSelectionExpression,
          Description:
            this.serverless.service.provider.websocketsDescription || 'Serverless Websockets',
          ProtocolType: 'WEBSOCKET',
        },
      },
    });

    this.serverless.service.getAllFunctions().forEach(functionName => {
      const functionObj = this.serverless.service.getFunction(functionName);
      functionObj.events.forEach(event => {
        if (event.websocket) {
          // insert policy that allows functions to postToConnection
          const websocketsPolicy = {
            Effect: 'Allow',
            Action: ['execute-api:ManageConnections'],
            Resource: [{ 'Fn::Sub': 'arn:${AWS::Partition}:execute-api:*:*:*/@connections/*' }],
          };

          functionObj.iamConfig.policyStatements.push(websocketsPolicy);
        }
      });
    });

    return BbPromise.resolve();
  },
};

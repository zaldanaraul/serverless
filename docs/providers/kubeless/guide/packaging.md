<!--
title: Serverless Framework - Kubeless Guide - Packaging
menuText: Packaging
menuOrder: 10
description: How the Serverless Framework packages your Kubeless functions and other available options
layout: Doc
-->

<!-- DOCS-SITE-LINK:START automatically generated  -->

### [Read this on the main serverless docs site](https://www.serverless.com/framework/docs/providers/kubeless/guide/packaging)

<!-- DOCS-SITE-LINK:END -->

# Kubeless - Packaging

## Package CLI Command

Using the Serverless CLI tool, you can package your project without deploying with Kubeless. This is best used with CI / CD workflows to ensure consistent deployable artifacts.

Learn more in the [Packaging Guide](/framework/docs/guide/packaging/).

## Package Maximum Size

Kubeless uses [Kubernetes ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) to store functions configuration and code. These ConfigMaps have a limitation in size of one MB since they are stored as a single entry in a `etcd` database. Due to this limitation, the maximum possible size for a Kubeless function package is no more than one MB. Note that only code and configuration files should be included in this package, dependencies will be installed during the build process. If your function package size is over one MB please [exclude some directories](#exclude-include) or create a [custom image](./functions#custom-images-alpha-feature) with your function. By default, files under the `node_modules` folder will be excluded.

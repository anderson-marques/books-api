export type RequestContext = {
  accountId: string,
  apiId: string,
  domainName: string,
  domainPrefix: string,
  http: {
    method: string,
    path: string,
    protocol: string,
    sourceIp: string,
    userAgent: string,
  },
}

export type HttpRequestEvent = {
  version: string,
  routeKey: string,
  rawPath: string
  rawQueryString: string,
  headers?: Record<string, string>,
  queryStringParameters?: Record<string, string>,
  pathParameters?: Record<string, string>,
  multiValueHeaders?: Record<string, string>,
  requestContext?: RequestContext,
  isBase64Encoded: boolean,
  body:string,
}

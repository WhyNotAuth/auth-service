# auth-service

The actual auth service for getting tokens. 

# User Login Flow

1. Check if the client can authorize with the service
2. It'll either start with a data service call or redirect to a federated provider ala openid or SAML.
3. Send through the global pipelines
4. Send through the client level pipelines
5. Build the tokens, cacheing the claims for both in user session.

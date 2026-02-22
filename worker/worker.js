// Simple worker for static site deployment
// This file is only used to satisfy the deployment process

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // For static site deployment, we just return a simple response
  // The actual static files are served by the hosting provider
  return new Response(
    '<html><body><h1>Static Random Pic API</h1><p>Deployment successful!</p></body></html>',
    {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    }
  );
}

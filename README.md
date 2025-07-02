# Web3D

This project uses environment variables to configure where some links lead.

## Changing URLs

1. Edit the `.env` file in the project root and update any of the following values:
   - `AYON_URL`
   - `ZULIP_URL`
   - `SPACE_URL`
   - `TASKS_URL`
2. Run the build process:

```bash
npm run build
```

During `npm run build` the script `scripts/replaceUrls.js` will run automatically and update the references in the `src/main.js` and `src/main2.js` files using the values from `.env`.

After the build completes, the application will use the updated URLs.

## Kubernetes Deployment

Kubernetes manifests are located in the `k8s/` directory. Apply them in order to deploy the application along with a service and ingress:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

The ingress routes requests for `web3d.local` to the `web3d` service. Update the host name as needed for your cluster.

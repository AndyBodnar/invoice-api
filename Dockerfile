# ✅ Use Puppeteer-friendly base image
FROM ghcr.io/render-examples/puppeteer:latest

# Set working directory
WORKDIR /app

# Copy everything in
COPY . .

# Install dependencies
RUN npm install

# Expose your app port (Render binds this automatically)
EXPOSE 10000

# Launch your app
CMD ["npm", "start"]

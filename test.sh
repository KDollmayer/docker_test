LOAD_BALANCER_URL="http://localhost:8080/health" # Replace with your load balancer URL
NUM_REQUESTS=100 # Total number of requests

echo "Stress testing load balancer at $LOAD_BALANCER_URL with $NUM_REQUESTS concurrent requests..."

# Generate a large list of numbers to represent requests
seq $NUM_REQUESTS | xargs -P 1000 -I {} curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "$LOAD_BALANCER_URL"
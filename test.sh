LOAD_BALANCER_URL="http://localhost:8080/health" 
NUM_REQUESTS=100 

echo "Stress testing load balancer at $LOAD_BALANCER_URL with $NUM_REQUESTS concurrent requests..."

seq $NUM_REQUESTS | xargs -P 1000 -I {} curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "$LOAD_BALANCER_URL"
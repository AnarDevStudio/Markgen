require "net/http"
require "json"

url = URI("https://jsonplaceholder.typicode.com/todos/1")

response = Net::HTTP.get(url)

puts response
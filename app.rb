require "pry"
require "json"
require "sinatra"

get "/home" do 
  erb :homepage
end

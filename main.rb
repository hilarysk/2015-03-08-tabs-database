require "pry"
require "json"
require "sinatra"
require "sqlite3"

require_relative "database/database_setup.rb"
require_relative "models/product_class.rb"

get "/home" do 
  erb :homepage
end
require "pry"
require "json"
require "sinatra"
require "sqlite3"

require_relative "database/database_setup.rb"
require_relative "models/product_class.rb"

get "/home" do 
  @all_products = Product.all
  erb :homepage
end

post "/create" do 
  new_product = Product.new({"general_info"=>"#{params["general_info"]}", 
                            "technical_specs"=>"#{params["technical_specs"]}"},
                            "where_to_buy"=>"#{params["where_to_buy"]}")
                            
  if new_product.has_errors? == true
    @message = new_product.errors # will need to format at some point
  else
    @message = "Congratulations! Your new product was successfully added."
    new_product.insert
    np_hash = new_product.to_hash
    np_hash[:worked] = "yes" 
    np_hash.to_json
  end
end
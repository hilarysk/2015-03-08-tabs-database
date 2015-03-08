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
                            "technical_specs"=>"#{params["technical_specs"]}",
                            "where_to_buy"=>"#{params["where_to_buy"]}"})
                            binding.pry
                            
  if new_product.has_errors? == true
    np_hash = (new_product.errors).to_json # will need to format at some point
    return np_hash
  else
    new_product.insert
    np_hash = new_product.to_hash
    np_hash[:worked] = "yes" 
    return np_hash.to_json
  end  
end
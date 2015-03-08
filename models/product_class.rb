# Class: Product
#
# Creates different products for tab interface program
#
# Attributes:
# @general_info    - String: General information about product
# @technical_specs - String: Technical specs for product
# @where_to_buy    - String: Where to buy product
# @id              - Integer: Primary key
#
# attr_reader :id
# attr_accessor :general_info, :where_to_buy, :technical_specs
#
# Public Methods:
# #insert
# #save
# #self.find
# 
# Private Methods:
# #initialize

class Product
  
  attr_reader :id, :errors
  attr_accessor :general_info, :where_to_buy, :technical_specs


  # Private: initialize
  # Instantiates a new Slide object
  #
  # Parameters:
  # options - Hash
  #           - @general_info    - String: General information about product
  #           - @technical_specs - String: Technical specs for product
  #           - @where_to_buy    - String: Where to buy product
  #           - @id              - Integer: Primary key
  #           - @errors          - Hash: Error messages
  #          
  # Returns:
  # The object
  #
  # State Changes:
  # Sets instance variables @where_to_buy, @id, @general_info, @technical_specs, @errors
                               
  def initialize(options)
    @id = options["id"].to_i
    @general_info = options["general_info"]
    @where_to_buy = options["where_to_buy"]
    @technical_specs = options["technical_specs"]
    @errors = {"general_info"=>[], "where_to_buy"=>[], "technical_specs"=>[]} #key would be "general_info", value would be array of error messages depending on specific error
    
  end
  
  
  # Public: has_errors?
  #
  # Sees if there are errors
  #
  # Parameters:
  # None
  #
  # Returns:
  # True or false
  #
  # State Changes:
  # None
  
  def has_errors?
    @errors.keep_if do |key, value|
      value != []
    end

    if @errors.length == 0
        return false
    else
        return true
    end
  end
      
  # Public: insert
  # Inserts the information collected in initialize into the proper table
  #
  # Parameters:
  # None
  #
  # Returns:
  # The object's id number
  #
  # State Changes:
  # Sets @id instance variable  
  
  def insert
                    
    DATABASE.execute("INSERT INTO products (general_info, where_to_buy, technical_specs) VALUES   
                     (?, ?, ?)", @general_info, @where_to_buy, @technical_specs)
                    
    @id = DATABASE.last_insert_row_id
  end
  # Public: save
  #
  # Inserts changes into the table record
  #
  # Parameters:
  # None
  #
  # Returns:
  # Empty array
  #
  # State Changes:
  # None
  
  def save      
    attributes = []
                                                                                 
    instance_variables.each do |i|                                               
      attributes << i.to_s.delete("@")                                           
    end     
                                                                         
                                                                                 
    query_hash = {}                                                 
                                                                                 
    attributes.each do |a|        #each with object                                               
      value = self.send(a)
      query_hash[a] = value                                                       
    end                                                                

    query_hash.each do |key, value|
      DATABASE.execute("UPDATE slides SET #{key} = ? WHERE id = #{@id}", value)
    end                                                                          
  end
  
  # Public: self.find
  # 
  # Grabs a specific record based on ID
  #
  # Parameters:
  # s_id - the record's ID
  #
  # Returns:
  # An object
  #
  # State Changes:
  # None  
  
  def self.find(s_id)
    result = DATABASE.execute("SELECT * FROM products WHERE id = #{s_id}")[0]
    
    self.new(result)
  end
  
  # Public: to_hash
  # 
  # Returns a hash of the object
  #
  # Parameters:
  # None
  #
  # Returns:
  # A hash
  #
  # State Changes:
  # None  
  
  def to_hash
    {
      id: id,
      general_info: general_info,
      where_to_buy: where_to_buy,
      technical_specs: technical_specs      
    }
  end
  
  # Public: self.all
  # 
  # Returns an array of hashes of all the records
  #
  # Parameters:
  # None
  #
  # Returns:
  # Array of hashes of all the records
  #
  # State Changes:
  # None  
  
  def self.all
    result = DATABASE.execute("SELECT * FROM products")
  end
  
  # Public: delete
  # 
  # Deletes a record based on id
  #
  # Parameters:
  # s_id - ID of record delete 
  #
  # Returns:
  # Empty array
  #
  # State Changes:
  # None  
  
  def delete(s_id)
    DATABASE.execute("DELETE FROM products WHERE id = #{s_id}")
  end
  
end
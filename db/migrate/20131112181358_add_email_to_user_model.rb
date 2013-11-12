class AddEmailToUserModel < ActiveRecord::Migration
  def change
  	add_column :users, :email, :string, :default => ""
  end
end

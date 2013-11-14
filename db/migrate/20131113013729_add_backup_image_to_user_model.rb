class AddBackupImageToUserModel < ActiveRecord::Migration
  def change
  	add_column :users, :backup_image, :string, :default => ""
  end
end

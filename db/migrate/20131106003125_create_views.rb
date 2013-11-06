class CreateViews < ActiveRecord::Migration
  def change
    create_table :views do |t|
    	t.integer :user_id, :null => false
    	t.integer :question_id, :null => false

      t.timestamps
    end

    add_index :views, :user_id
    add_index :views, :question_id
  end
end

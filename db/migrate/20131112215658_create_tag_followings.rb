class CreateTagFollowings < ActiveRecord::Migration
  def change
    create_table :tag_followings do |t|
    	t.integer :user_id, :null => false
    	t.integer :tag_id, :null => false

      t.timestamps
    end
  end
end

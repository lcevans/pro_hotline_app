class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
    	t.integer :user_id, :null => false
    	t.integer :votable_id, :null => false
    	t.string :votable_type, :null => false
    	t.string :vote_type, :null => false

      t.timestamps
    end

    add_index :votes, :user_id
    add_index :votes, :votable_id
  end
end

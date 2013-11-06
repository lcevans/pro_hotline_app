class AddVotableTypeIndexToVoteModel < ActiveRecord::Migration
  def change
  	add_index :votes, :votable_type
  end
end

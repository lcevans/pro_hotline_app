class AddBestAnswerToQuestionModel < ActiveRecord::Migration
  def change
  	add_column :questions, :best_answer_id, :integer, :default => nil
  end
end

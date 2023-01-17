class CreateTwits < ActiveRecord::Migration[7.0]
  def change
    create_table :twits do |t|
      t.string :text
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

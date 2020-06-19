class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if messages.last.present?
      messages.last.content? ? messages.last.content : '画像が送信されています'
    else
      'まだメッセージはありません'
    end
  end
end

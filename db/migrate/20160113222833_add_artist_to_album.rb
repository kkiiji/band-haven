class AddArtistToAlbum < ActiveRecord::Migration
  def change
    remove_column :albums, :artist_id
    add_column :albums, :artist, :string
  end
end

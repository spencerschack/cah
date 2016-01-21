namespace :db do

  task truncate: :environment do
    DatabaseCleaner.clean_with :truncation
  end

end
